package main

import (
	"bufio"
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

var logger *fluent.Fluent
var tag string
var err error

type CellarProcess struct {
	PID  int    `json:"PID"`
	Name string `json:"Name"`
}

var runningProcesses []CellarProcess

func main() {
	//set logging
	logger, err = fluent.New(fluent.Config{FluentPort: 24224, FluentHost: "fluentd"})
	if err != nil {
		fmt.Println(err)
	}
	defer logger.Close()
	tag = "Cellar.Hub.Workflow.Manager"

	//Set process name of current program
	//port := ":" + os.Args[1]

	//programName := os.Args[2]
	//gspt.SetProcTitle("cellarworkflowmanager")

	//--------------------------------------------------------
	//--------------------------------------------------------
	// WEB
	//--------------------------------------------------------
	//--------------------------------------------------------
	var err error
	files := append(layoutFiles(), "views/index.gohtml")
	index, err = template.ParseFiles(files...)
	if err != nil {
		panic(err)
	}
	files = append(layoutFiles(), "views/contact.gohtml")
	contact, err = template.ParseFiles(files...)
	if err != nil {
		panic(err)
	}
	files = append(layoutFiles(), "views/processes.gohtml")
	processes, err = template.ParseFiles(files...)
	if err != nil {
		panic(err)
	}
	files = append(layoutFiles(), "views/taillogs.gohtml")
	taillogs, err = template.ParseFiles(files...)
	if err != nil {
		panic(err)
	}
	files = append(layoutFiles(), "views/actualdirectory.gohtml")
	actualDirectory, err = template.ParseFiles(files...)
	if err != nil {
		panic(err)
	}
	files = append(layoutFiles(), "views/runworkflow.gohtml")
	runworkflow, err = template.ParseFiles(files...)
	if err != nil {
		panic(err)
	}

	r := mux.NewRouter()
	r.HandleFunc("/", indexHandler)
	r.HandleFunc("/contact", contactHandler)
	r.HandleFunc("/processes", processesHandler)
	r.HandleFunc("/actualdirectory", actualdirectoryHandler)
	r.HandleFunc("/taillogs", taillogsHandler)
	r.HandleFunc("/runworkflow", runworkflowHandler)
	r.HandleFunc("/runworkflow2", runworkflow2Handler)
	r.HandleFunc("/killprocess/{id}", killprocessHandler)
	http.ListenAndServe(":5000", r)
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
	printError(err)
	data := printOutput(output) // => go version go1.3 darwin/amd64

	logInfo("processesHandler", data)

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
		panic(err)
	}

	logInfo("killprocessHandler", "PID ("+id+") - OK")
}
func actualdirectoryHandler(w http.ResponseWriter, r *http.Request) {

	var (
		cmdOut []byte
		err    error
	)
	cmd := "ls"
	args := []string{"-l"}
	if cmdOut, err = exec.Command(cmd, args...).Output(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	cmdOutText := string(cmdOut)

	logInfo("actualdirectoryhandler", cmdOutText)

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
	if cmdOut, err = exec.Command(cmd, args...).Output(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	cmdOutText := string(cmdOut)

	logInfo("taillogsHandler", cmdOutText)

	dataFormatted := strings.Split(cmdOutText, "\n")

	dto := CellarDTO{
		ID:    RandStringBytesMaskImprSrc(5),
		Error: "",
		Data:  dataFormatted,
	}

	taillogs.ExecuteTemplate(w, "layouttemplate", dto)
}

func runworkflow2Handler(w http.ResponseWriter, r *http.Request) {

	if r.Method == "GET" {
		randomWorkflowName := "cellarworkflow_" + RandStringBytesMaskImprSrc(5)

		runworkflow.ExecuteTemplate(w, "layouttemplate", randomWorkflowName)
	} else {
		r.ParseForm()

		workflowType := r.Form.Get("workflowType")
		workflowName := r.Form.Get("workflowName")
		topic := r.Form.Get("topic")

		cmdName := ""
		cmdArgs := []string{}

		if workflowType == "workflow1" {

			cmdName = "./cellarworkf1"
			cmdArgs = []string{workflowName}

		} else if workflowType == "workflow2" {
			cmdName = "./cellarworkf2"
			cmdArgs = []string{workflowName, topic}

		}

		cmd := exec.Command(cmdName, cmdArgs...)
		cmdReader, err := cmd.StdoutPipe()
		if err != nil {
			fmt.Fprintln(os.Stderr, "Error creating StdoutPipe for Cmd", err)
			os.Exit(1)
		}

		scanner := bufio.NewScanner(cmdReader)
		go func() {
			for scanner.Scan() {
				fmt.Printf("docker build out | %s\n", scanner.Text())
			}
		}()

		err = cmd.Start()
		if err != nil {
			fmt.Fprintln(os.Stderr, "Error starting Cmd", err)
			os.Exit(1)
		}

		// err = cmd.Wait()
		// if err != nil {
		// 	fmt.Fprintln(os.Stderr, "Error waiting for Cmd", err)
		// 	os.Exit(1)
		// }

		pid := strconv.Itoa(cmd.Process.Pid)

		process := CellarProcess{
			PID:  cmd.Process.Pid,
			Name: workflowName,
		}
		runningProcesses = append(runningProcesses, process)

		logInfo("runworkflowHandler", "PID ("+pid+") - NAME ("+workflowName+") OK")

	}

}

//--------------------------------
// API method
//--------------------------------
func runworkflowHandler(w http.ResponseWriter, r *http.Request) {

	// cmd = exec.Command("./cellarworkf1 " + randomWorkflowName)
	// cmd.Stdout = os.Stdout
	// err := cmd.Start()
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// pid := strconv.Itoa(cmd.Process.Pid)
	// runningProcesses = append(runningProcesses, pid)

	// log.Printf("Just ran subprocess %d, exiting\n", cmd.Process.Pid)

	// var (
	// 	cmdOut []byte
	// 	err    error
	// )
	// cmd := "./cellarworkf1"
	// args := []string{randomWorkflowName}
	// if cmdOut, err = exec.Command(cmd, args...).Run(); err != nil {
	// 	fmt.Fprintln(os.Stderr, err)
	// 	os.Exit(1)
	// }
	// pid := strconv.Itoa(cmd.Process.Pid)
	// runningProcesses = append(runningProcesses, pid)

	// log.Printf("Just ran subprocess %d, exiting\n", cmd.Process.Pid)

	//cmd.Wait()

	randomWorkflowName := "cellarworkflow1_" + RandStringBytesMaskImprSrc(5)

	cmdName := "./cellarworkf1"
	cmdArgs := []string{randomWorkflowName}

	cmd := exec.Command(cmdName, cmdArgs...)
	cmdReader, err := cmd.StdoutPipe()
	if err != nil {
		fmt.Fprintln(os.Stderr, "Error creating StdoutPipe for Cmd", err)
		os.Exit(1)
	}

	scanner := bufio.NewScanner(cmdReader)
	go func() {
		for scanner.Scan() {
			fmt.Printf("docker build out | %s\n", scanner.Text())
		}
	}()

	err = cmd.Start()
	if err != nil {
		fmt.Fprintln(os.Stderr, "Error starting Cmd", err)
		os.Exit(1)
	}

	// err = cmd.Wait()
	// if err != nil {
	// 	fmt.Fprintln(os.Stderr, "Error waiting for Cmd", err)
	// 	os.Exit(1)
	// }

	pid := strconv.Itoa(cmd.Process.Pid)

	process := CellarProcess{
		PID:  cmd.Process.Pid,
		Name: randomWorkflowName,
	}
	runningProcesses = append(runningProcesses, process)

	logInfo("runworkflowHandler", "PID ("+pid+") - NAME ("+randomWorkflowName+") OK")
}

//HELPER
func logInfo(method string, message string) {
	var data = map[string]string{
		"method":  method,
		"message": message,
	}
	error := logger.Post(tag, data)
	if error != nil {
		panic(error)
	}
}

//HELPER
func layoutFiles() []string {
	files, err := filepath.Glob(LayoutDir + "/*.gohtml")
	if err != nil {
		panic(err)
	}
	return files
}

func printError(err error) {
	if err != nil {
		os.Stderr.WriteString(fmt.Sprintf("==> Error: %s\n", err.Error()))
	}
}

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
