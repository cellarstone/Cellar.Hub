package main

import (
	"bufio"
	"errors"
	"fmt"
	"html/template"
	"math/rand"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/fluent/fluent-logger-golang/fluent"
	"github.com/gorilla/mux"
)

var LayoutDir string = "views/layout"
var index *template.Template
var contact *template.Template
var processes *template.Template
var actualDirectory *template.Template
var taillogs *template.Template
var runworkflow *template.Template

type CellarDTO struct {
	ID    string   `json:"ID"`
	Error string   `json:"Error"`
	Data  []string `json:"Data"`
}

// type CellarProcess struct {
// 	PID  int    `json:"PID"`
// 	Name string `json:"Name"`
// }

var fluentdUrl = "fluentd"
var logger *fluent.Fluent
var tag = "Cellar.Hub.Workflow.Manager"
var err error

//var runningProcesses []CellarProcess

func main() {
	//set logging
	logger, err = fluent.New(fluent.Config{FluentPort: 24224, FluentHost: fluentdUrl})
	if err != nil {
		//low-level exception logging
		fmt.Println(err)
	}
	defer logger.Close()

	//Set process name of current program
	//port := ":" + os.Args[1]

	//programName := os.Args[2]
	//gspt.SetProcTitle("cellarworkflowmanager")

	//--------------------------------------------------------
	//--------------------------------------------------------
	// Run Worfklows from DB
	//--------------------------------------------------------
	//--------------------------------------------------------

	collection := GetAllWorkflowEntity()

	//*************************
	//*************************
	//*************************
	//*************************

	for _, entity := range collection {

		cmdName := ""
		cmdArgs := []string{}

		cmdName = "./" + entity.Type
		cmdArgs = entity.Parameters

		// if entity.Type == "workflow1" {
		// 	cmdName = "./" + entity.Type
		// 	cmdArgs = entity.Parameters
		// } else if entity.Type == "workflow2" {
		// 	cmdName = "./cellarworkf2"
		// 	cmdArgs = entity.Parameters
		// } else if entity.Type == "savetoprometheus" {
		// 	cmdName = "./savetoprometheus"
		// 	cmdArgs = entity.Parameters
		// }

		//run
		cmd := exec.Command(cmdName, cmdArgs...)
		cmdReader, err := cmd.StdoutPipe()
		if err != nil {
			logme("Error", "runworkflowHandler", "can't run command > "+err.Error())
		}

		scanner := bufio.NewScanner(cmdReader)
		go func() {
			for scanner.Scan() {
				//low-level exception logging
				fmt.Printf("workflow process | %s\n", scanner.Text())
			}
		}()

		err = cmd.Start()
		if err != nil {
			logme("Error", "runworkflowHandler", "can't start command > "+err.Error())
		}

	}

	//--------------------------------------------------------
	//--------------------------------------------------------
	// WEB
	//--------------------------------------------------------
	//--------------------------------------------------------
	var err error
	files := append(layoutFiles(), "views/index.gohtml")
	index, err = template.ParseFiles(files...)
	if err != nil {
		//low-level exception logging
		fmt.Println(err)
	}
	files = append(layoutFiles(), "views/contact.gohtml")
	contact, err = template.ParseFiles(files...)
	if err != nil {
		//low-level exception logging
		fmt.Println(err)
	}
	files = append(layoutFiles(), "views/processes.gohtml")
	processes, err = template.ParseFiles(files...)
	if err != nil {
		//low-level exception logging
		fmt.Println(err)
	}
	files = append(layoutFiles(), "views/taillogs.gohtml")
	taillogs, err = template.ParseFiles(files...)
	if err != nil {
		//low-level exception logging
		fmt.Println(err)
	}
	files = append(layoutFiles(), "views/actualdirectory.gohtml")
	actualDirectory, err = template.ParseFiles(files...)
	if err != nil {
		//low-level exception logging
		fmt.Println(err)
	}
	files = append(layoutFiles(), "views/runworkflow.gohtml")
	runworkflow, err = template.ParseFiles(files...)
	if err != nil {
		//low-level exception logging
		fmt.Println(err)
	}

	r := mux.NewRouter()
	r.Handle("/", RecoverWrap(http.HandlerFunc(indexHandler)))
	r.Handle("/contact", RecoverWrap(http.HandlerFunc(contactHandler)))
	r.Handle("/processes", RecoverWrap(http.HandlerFunc(processesHandler)))
	r.Handle("/actualdirectory", RecoverWrap(http.HandlerFunc(actualdirectoryHandler)))
	r.Handle("/taillogs", RecoverWrap(http.HandlerFunc(taillogsHandler)))
	r.Handle("/runworkflow", RecoverWrap(http.HandlerFunc(runworkflowHandler)))
	r.Handle("/killprocess/{id}", RecoverWrap(http.HandlerFunc(killprocessHandler)))
	http.ListenAndServe(":5000", r)
}

//Exception Handling - Panic handler
func RecoverWrap(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var err error
		defer func() {
			r := recover()
			if r != nil {
				switch t := r.(type) {
				case string:
					err = errors.New(t)
				case error:
					err = t
				default:
					err = errors.New("Unknown error")
				}

				//low-level exception logging
				fmt.Println("RecoverWrap > " + err.Error())

				http.Error(w, err.Error(), http.StatusInternalServerError)
			}
		}()
		h.ServeHTTP(w, r)
	})
}

//--------------------------------
// MVC methods
//--------------------------------
// func testHandler(res http.ResponseWriter, req *http.Request) {
// 	fmt.Println("TEST")
// }
func indexHandler(w http.ResponseWriter, r *http.Request) {
	index.ExecuteTemplate(w, "layouttemplate", nil)
}
func contactHandler(w http.ResponseWriter, r *http.Request) {
	contact.ExecuteTemplate(w, "layouttemplate", nil)
}
func processesHandler(w http.ResponseWriter, r *http.Request) {

	// Create an *exec.Cmd
	cmd := exec.Command("ps", "-ef")

	// Combine stdout and stderr
	output, err := cmd.CombinedOutput()
	if err != nil {
		logme("Error", "processesHandler", err.Error())
	}
	data := printOutput(output)

	dataFormatted := strings.Split(data, "\n")
	dto := CellarDTO{
		ID:    RandStringBytesMaskImprSrc(5),
		Error: "",
		Data:  dataFormatted,
	}

	processes.ExecuteTemplate(w, "layouttemplate", dto)
}
func killprocessHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	idnumber, _ := strconv.Atoi(id)

	proc, _ := os.FindProcess(idnumber)
	err := proc.Kill()
	if err != nil {
		logme("Error", "killprocessHandler", "process can't be killed > "+err.Error())
	}
}
func actualdirectoryHandler(w http.ResponseWriter, r *http.Request) {

	var (
		cmdOut []byte
		err    error
	)
	cmd := "ls"
	args := []string{"-l"}
	cmdOut, err = exec.Command(cmd, args...).Output()
	if err != nil {
		logme("Error", "actualdirectoryHandler", "can't run command > "+err.Error())
	}
	cmdOutText := string(cmdOut)
	dataFormatted := strings.Split(cmdOutText, "\n")

	dto := CellarDTO{
		ID:    RandStringBytesMaskImprSrc(5),
		Error: "",
		Data:  dataFormatted,
	}

	processes.ExecuteTemplate(w, "layouttemplate", dto)
}
func taillogsHandler(w http.ResponseWriter, r *http.Request) {

	var (
		cmdOut []byte
		err    error
	)
	cmd := "tail"
	args := []string{"-f", "/var/log/lastlog"}
	cmdOut, err = exec.Command(cmd, args...).Output()
	if err != nil {
		logme("Error", "taillogsHandler", "can't run command > "+err.Error())
	}
	cmdOutText := string(cmdOut)
	dataFormatted := strings.Split(cmdOutText, "\n")

	dto := CellarDTO{
		ID:    RandStringBytesMaskImprSrc(5),
		Error: "",
		Data:  dataFormatted,
	}

	taillogs.ExecuteTemplate(w, "layouttemplate", dto)
}
func runworkflowHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method == "GET" {
		randomWorkflowName := "cellarworkflow_" + RandStringBytesMaskImprSrc(5)

		runworkflow.ExecuteTemplate(w, "layouttemplate", randomWorkflowName)
	} else {
		r.ParseForm()

		// cmdName2 := "ls"
		// cmdArgs2 := []string{"-l"}
		// cmdOut2, err := exec.Command(cmdName2, cmdArgs2...).Output()
		// if err != nil {
		// 	log("Fatal", "runworkflow2Handler", "There was an error running git rev-parse command > "+err.Error())
		// 	os.Exit(1)
		// }
		// sha := string(cmdOut2)
		// log("Info", "runworkflow2Handler", sha)

		// formData := ""

		// for key, value := range r.Form {
		// 	var buffer bytes.Buffer
		// 	buffer.WriteString(key)
		// 	buffer.WriteString(" - ")
		// 	buffer.WriteString(value[0])
		// 	buffer.WriteString("\n")
		// 	formData += string(buffer.String())
		// }

		workflowType := r.Form.Get("workflowType")
		workflowName := r.Form.Get("workflowName")
		topic := r.Form.Get("topic")

		cmdName := ""
		cmdArgs := []string{}

		if workflowType == "workflow1" {
			cmdName = "./workflow1"
			cmdArgs = []string{workflowName}
		} else if workflowType == "workflow2" {
			cmdName = "./workflow2"
			cmdArgs = []string{workflowName, topic}
		} else if workflowType == "savetoprometheus" {
			cmdName = "./savetoprometheus"
			cmdArgs = []string{workflowName, topic}
		}

		//befor run, save it
		entity := WorkflowEntity{
			Type:       workflowType,
			Parameters: cmdArgs,
		}
		SaveWorkflowEntity(&entity)

		//run
		cmd := exec.Command(cmdName, cmdArgs...)
		cmdReader, err := cmd.StdoutPipe()
		if err != nil {
			logme("Error", "runworkflowHandler", "can't run command > "+err.Error())
		}

		scanner := bufio.NewScanner(cmdReader)
		go func() {
			for scanner.Scan() {
				//low-level exception logging
				fmt.Printf("workflow process | %s\n", scanner.Text())
			}
		}()

		err = cmd.Start()
		if err != nil {
			logme("Error", "runworkflowHandler", "can't start command > "+err.Error())
		}

		// err = cmd.Wait()
		// if err != nil {
		// 	fmt.Fprintln(os.Stderr, "Error waiting for Cmd", err)
		// 	os.Exit(1)
		// }

		// process := CellarProcess{
		// 	PID:  cmd.Process.Pid,
		// 	Name: workflowName,
		// }
		// runningProcesses = append(runningProcesses, process)

		// pid := strconv.Itoa(cmd.Process.Pid)
		// logme("Info", "runworkflowHandler", "PID ("+pid+") - NAME ("+workflowName+") OK")
	}

}

//--------------------------------
// API method
//--------------------------------

//-------------------------------------
//HELPERS
//-------------------------------------
func logme(level string, method string, message string) {
	var data = map[string]string{
		"level":   level,
		"method":  method,
		"message": message,
	}
	error := logger.Post(tag, data)
	if error != nil {
		//low-level exception logging
		fmt.Println(error.Error())
	}
}

func layoutFiles() []string {
	files, err := filepath.Glob(LayoutDir + "/*.gohtml")
	if err != nil {
		//low-level exception logging
		fmt.Println(err.Error())
	}
	return files
}

// func printError(err error) {
// 	if err != nil {
// 		os.Stderr.WriteString(fmt.Sprintf("==> Error: %s\n", err.Error()))
// 	}
// }

func printOutput(outs []byte) string {
	result := ""
	if len(outs) > 0 {
		result += string(outs)
	}
	return result
}

//HELPER
func random(min, max int) int {
	rand.Seed(time.Now().Unix())
	return rand.Intn(max-min) + min
}

var src = rand.NewSource(time.Now().UnixNano())

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const (
	letterIdxBits = 6                    // 6 bits to represent a letter index
	letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
	letterIdxMax  = 63 / letterIdxBits   // # of letter indices fitting in 63 bits
)

func RandStringBytesMaskImprSrc(n int) string {
	b := make([]byte, n)
	// A src.Int63() generates 63 random bits, enough for letterIdxMax characters!
	for i, cache, remain := n-1, src.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = src.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
			b[i] = letterBytes[idx]
			i--
		}
		cache >>= letterIdxBits
		remain--
	}

	return string(b)
}
