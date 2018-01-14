package main

import (
	"bufio"
	"encoding/json"
	"errors"
	"fmt"
	"html/template"
	"log"
	"math/rand"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"gopkg.in/mgo.v2/bson"

	"github.com/mitchellh/mapstructure"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/logging"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

var layoutDir = "views/layout"
var index *template.Template
var processes *template.Template
var actualDirectory *template.Template
var taillogs *template.Template
var runworkflow *template.Template
var workflowindb *template.Template
var err error

type cellarDTO struct {
	ExceptionText string      `json:"exceptionText"`
	Data          interface{} `json:"data"`
}

//Logging
var logger *logging.DLogger

func init() {
	//set logging
	logger, err = logging.NewDLogger("Cellar.Hub.Workflow.Manager")
	if err != nil {
		panic(err)
	}
}

func main() {

	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//V TEHLE METODE SE NIC NELOGUJE !!!!!!!!!!!!!!!!!
	// vysvetleni: asi jeste nestihne nabehnout Fluentd
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	logger.Information("TEST from Workflow manager")
	log.Println("AAA1")
	fmt.Println("AAA2")

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
	files = append(layoutFiles(), "views/processes.gohtml")
	processes, err = template.ParseFiles(files...)
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
	files = append(layoutFiles(), "views/workflowsindb.gohtml")
	workflowindb, err = template.ParseFiles(files...)
	if err != nil {
		//low-level exception logging
		fmt.Println(err)
	}

	r := mux.NewRouter()
	r.Handle("/", RecoverWrap(http.HandlerFunc(indexHandler)))
	r.Handle("/processes", RecoverWrap(http.HandlerFunc(processesHandler)))
	r.Handle("/actualdirectory", RecoverWrap(http.HandlerFunc(actualdirectoryHandler)))
	r.Handle("/runworkflow", RecoverWrap(http.HandlerFunc(runworkflowHandler)))
	r.Handle("/workflowsindb", RecoverWrap(http.HandlerFunc(workflowindbHandler)))
	r.Handle("/killprocess/{id}", RecoverWrap(http.HandlerFunc(killprocessHandler)))
	r.Handle("/deleteworkflow/{id}", RecoverWrap(http.HandlerFunc(deleteworkflowHandler)))
	r.Handle("/throwexception", RecoverWrap(http.HandlerFunc(throwExceptionHandler)))

	r.Handle("/api/processes", RecoverWrap(http.HandlerFunc(apiProcessesHandler)))
	r.Handle("/api/actualdirectory", RecoverWrap(http.HandlerFunc(apiActualDirectoryHandler)))

	r.Handle("/api/workflows", RecoverWrap(http.HandlerFunc(apiGetAllCellarWorkflowsHandler))).Methods("GET")
	r.Handle("/api/workflows/{senzorname}", RecoverWrap(http.HandlerFunc(apiGetCellarWorkflowsHandler))).Methods("GET")
	r.Handle("/api/workflow", RecoverWrap(http.HandlerFunc(apiAddCellarWorkflowHandler))).Methods("PUT")
	r.Handle("/api/workflow/{id}", RecoverWrap(http.HandlerFunc(apiGetOrRemoveOrUpdateCellarWorkflowHandler))).Methods("GET", "DELETE", "PATCH")

	r.Handle("/api/runallworkflows", RecoverWrap(http.HandlerFunc(apiRunAllWorkflowsHandler))).Methods("GET")
	r.Handle("/api/stopallworkflows", RecoverWrap(http.HandlerFunc(apiStopAllWorkflowsHandler))).Methods("GET")
	r.Handle("/api/runworkflow/{id}", RecoverWrap(http.HandlerFunc(apiRunWorkflowHandler))).Methods("GET")
	r.Handle("/api/stopworkflow/{id}", RecoverWrap(http.HandlerFunc(apiStopWorkflowHandler))).Methods("GET")
	r.Handle("/api/checkprocessworkflow/{pid}", RecoverWrap(http.HandlerFunc(apiCheckProcessWorkflowHandler))).Methods("GET")

	r.Handle("/test/checkprocessworkflow/{pid}", RecoverWrap(http.HandlerFunc(testCheckProcessWorkflowHandler))).Methods("GET")

	//midlewares
	// commonHandlers := alice.New(bodyParserHandler(cellarDTO{}))
	// r.Handle("/api/workflow", commonHandlers.Then(RecoverWrap(http.HandlerFunc(apiAddOrUpdateCellarWorkflowHandler)))).Methods("PUT", "PATCH")

	// r.Handle("/api/workflow", RecoverWrap(http.HandlerFunc(apiAddOrUpdateCellarWorkflowHandler))).Methods("PUT", "PATCH")

	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "Accept", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"})

	http.ListenAndServe(":44405", handlers.CORS(headersOk, originsOk, methodsOk)(r))
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

				logger.Fatal("[PANIC] - " + err.Error())

				http.Error(w, err.Error(), http.StatusInternalServerError)
			}
		}()
		h.ServeHTTP(w, r)
	})
}

//--------------------------------
// MVC methods
//--------------------------------
func indexHandler(w http.ResponseWriter, r *http.Request) {
	//--------------------------------------------------------
	//--------------------------------------------------------
	// Run Worfklows from DB
	//--------------------------------------------------------
	//--------------------------------------------------------

	collection := GetAllCellarWorkflows()
	// fmt.Println(collection)
	// aa := ""
	// for _, entity := range collection {
	// 	aa += entity.Type
	// }
	// logger.Warning("main", aa)

	//*************************
	//*************************
	//*************************
	//*************************

	for _, entity := range collection {

		cmdName := ""
		cmdArgs := []string{}

		cmdName = "./" + entity.Type
		cmdArgs = entity.Parameters

		//run
		cmd := exec.Command(cmdName, cmdArgs...)
		cmdReader, err := cmd.StdoutPipe()
		if err != nil {
			logger.Error("can't run command > " + err.Error())
		}

		scanner := bufio.NewScanner(cmdReader)
		go func() {
			for scanner.Scan() {
				//low-level exception logging
				// fmt.Printf("workflow process | %s\n", scanner.Text())
				logger.Information("workflow process | " + scanner.Text())
			}
		}()

		err = cmd.Start()
		if err != nil {
			logger.Error("can't start command > " + err.Error())
		}

	}

	index.ExecuteTemplate(w, "layouttemplate", nil)
}
func processesHandler(w http.ResponseWriter, r *http.Request) {

	logger.Information("TEST from Workflow manager - processes")

	// Create an *exec.Cmd
	cmd := exec.Command("ps", "-ef")

	// Combine stdout and stderr
	output, err := cmd.CombinedOutput()
	if err != nil {
		logger.Error(err.Error())
	}
	data := printOutput(output)

	dataFormatted := strings.Split(data, "\n")
	dto := cellarDTO{
		ExceptionText: "",
		Data:          dataFormatted,
	}

	processes.ExecuteTemplate(w, "layouttemplate", dto)
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
		logger.Error("can't run command > " + err.Error())
	}
	cmdOutText := string(cmdOut)
	dataFormatted := strings.Split(cmdOutText, "\n")

	dto := cellarDTO{
		ExceptionText: "",
		Data:          dataFormatted,
	}

	processes.ExecuteTemplate(w, "layouttemplate", dto)
}
func runworkflowHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method == "GET" {
		randomWorkflowName := "cellarworkflow_" + randStringBytesMaskImprSrc(5)

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
		parameter1 := r.Form.Get("parameter1")
		parameter2 := r.Form.Get("parameter2")

		cmdName := ""
		cmdArgs := []string{}

		if workflowType == "workflow1" {
			cmdName = "./workflow1"
			cmdArgs = []string{workflowName}
		} else if workflowType == "workflow2" {
			cmdName = "./workflow2"
			cmdArgs = []string{workflowName, parameter1}
		} else if workflowType == "savetoprometheus" {
			cmdName = "./savetoprometheus"
			cmdArgs = []string{workflowName, parameter1}
		} else if workflowType == "savetofluentd" {
			cmdName = "./savetofluentd"
			cmdArgs = []string{workflowName, parameter1}
		} else if workflowType == "sendtowebsocket" {
			cmdName = "./sendtowebsocket"
			cmdArgs = []string{workflowName, parameter1, parameter2}
		} else if workflowType == "cancelmeeting" {
			cmdName = "./cancelmeeting"
			cmdArgs = []string{workflowName, parameter1, parameter2}
		}

		//befor run, save it
		entity := CellarWorkflow{
			PID:        workflowName,
			Type:       workflowType,
			Parameters: cmdArgs,
		}
		AddCellarWorkflow(&entity)

		//run
		cmd := exec.Command(cmdName, cmdArgs...)
		cmdReader, err := cmd.StdoutPipe()
		if err != nil {
			logger.Error("can't run command > " + err.Error())
		}

		scanner := bufio.NewScanner(cmdReader)
		go func() {
			for scanner.Scan() {
				//low-level exception logging
				logger.Information("workflow process | " + scanner.Text())
			}
		}()

		err = cmd.Start()
		if err != nil {
			logger.Error("can't start command > " + err.Error())
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
func workflowindbHandler(w http.ResponseWriter, r *http.Request) {

	data := GetAllCellarWorkflows()

	workflowindb.ExecuteTemplate(w, "layouttemplate", data)
}

func killprocessHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	idnumber, _ := strconv.Atoi(id)

	proc, _ := os.FindProcess(idnumber)
	err := proc.Kill()
	if err != nil {
		logger.Error("process can't be killed > " + err.Error())
	}
}

func deleteworkflowHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	err := RemoveCellarWorkflow(id)
	if err != nil {
		logger.Error("workflow can't be deleted > " + err.Error())
	}
}

//--------------------------------
//--------------------------------
//--------------------------------
// API method
//--------------------------------
//--------------------------------
//--------------------------------

func apiGetAllCellarWorkflowsHandler(w http.ResponseWriter, r *http.Request) {

	data := GetAllCellarWorkflows()

	dto := cellarDTO{
		ExceptionText: "",
		Data:          data,
	}

	json.NewEncoder(w).Encode(dto)

}

func apiGetCellarWorkflowsHandler(w http.ResponseWriter, r *http.Request) {

	// Read from URL
	vars := mux.Vars(r)
	name := vars["senzorname"]

	data := GetCellarWorkflows(name)

	dto := cellarDTO{
		ExceptionText: "",
		Data:          data,
	}

	json.NewEncoder(w).Encode(dto)

}

func apiGetOrRemoveOrUpdateCellarWorkflowHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method == "GET" {
		apiGetCellarWorkflowHandler(w, r)
	}

	if r.Method == "DELETE" {
		apiRemoveCellarWorkflowHandler(w, r)
	}

	if r.Method == "PATCH" {
		apiUpdateCellarWorkflowHandler(w, r)
	}

}
func apiGetCellarWorkflowHandler(w http.ResponseWriter, r *http.Request) {

	// Read from BODY
	// body, err := ioutil.ReadAll(r.Body)
	// if err != nil {
	// 	http.Error(w, "Error reading request body",
	// 		http.StatusInternalServerError)
	// }
	// id := string(body)

	// Read from URL
	vars := mux.Vars(r)
	id := vars["id"]

	data := GetCellarWorkflow(id)

	dto := cellarDTO{
		ExceptionText: "",
		Data:          data,
	}

	json.NewEncoder(w).Encode(dto)

}
func apiRemoveCellarWorkflowHandler(w http.ResponseWriter, r *http.Request) {

	// Read from BODY
	// body, err := ioutil.ReadAll(r.Body)
	// if err != nil {
	// 	http.Error(w, "Error reading request body",
	// 		http.StatusInternalServerError)
	// }
	// id := string(body)

	// Read from URL
	vars := mux.Vars(r)
	id := vars["id"]

	err = RemoveCellarWorkflow(id)
	if err != nil {
		logger.Error("workflow can't be deleted > " + err.Error())
	}

	dto := cellarDTO{
		ExceptionText: "",
		Data:          "OK",
	}

	json.NewEncoder(w).Encode(dto)

}
func apiUpdateCellarWorkflowHandler(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	id := vars["id"]

	dtoIn := parseCellarDTO(r)

	// log.Println(dtoIn)

	var item CellarWorkflow
	mapstructure.Decode(dtoIn.Data, &item)
	// log.Println("DECODE")
	// log.Println(item)

	item.ID = bson.ObjectIdHex(id)

	// log.Println("DECODE 2")
	// log.Println(item)

	data := UpdateCellarWorkflow(&item)

	// log.Println(data)

	dtoOut := cellarDTO{
		ExceptionText: "",
		Data:          data,
	}

	json.NewEncoder(w).Encode(dtoOut)

}

func apiAddCellarWorkflowHandler(w http.ResponseWriter, r *http.Request) {

	dtoIn := parseCellarDTO(r)

	// log.Println(dtoIn)

	var item CellarWorkflow
	mapstructure.Decode(dtoIn.Data, &item)

	data := AddCellarWorkflow(&item)

	dtoOut := cellarDTO{
		ExceptionText: "",
		Data:          data,
	}

	json.NewEncoder(w).Encode(dtoOut)

}

func apiRunWorkflowHandler(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	id := vars["id"]

	//GET WORKFLOW
	workflow := GetCellarWorkflow(id)

	workflowType := workflow.Type

	//RUN WORKFLOW
	var cmdArgs []string
	parCount := len(workflow.Parameters)
	for i := 0; i < parCount; i++ {
		cmdArgs = append(cmdArgs, workflow.Parameters[i])
	}

	cmdName := "./" + workflowType

	// parameter1 := workflow.Parameters[0]
	// parameter2 := workflow.Parameters[1]

	// cmdName := ""
	// if workflowType == "workflow1" {
	// 	cmdName = "./workflow1"
	// 	cmdArgs = []string{workflowName}
	// } else if workflowType == "workflow2" {
	// 	cmdName = "./workflow2"
	// 	cmdArgs = []string{workflowName, parameter1}
	// } else if workflowType == "savetoprometheus" {
	// 	cmdName = "./savetoprometheus"
	// 	cmdArgs = []string{workflowName, parameter1}
	// } else if workflowType == "savetofluentd" {
	// 	cmdName = "./savetofluentd"
	// 	cmdArgs = []string{workflowName, parameter1}
	// } else if workflowType == "sendtowebsocket" {
	// 	cmdName = "./sendtowebsocket"
	// 	cmdArgs = []string{workflowName, parameter1, parameter2}
	// } else if workflowType == "cancelmeeting" {
	// 	cmdName = "./cancelmeeting"
	// 	cmdArgs = []string{workflowName, parameter1, parameter2}
	// }

	//run
	cmd := exec.Command(cmdName, cmdArgs...)
	cmdReader, err := cmd.StdoutPipe()
	if err != nil {
		logger.Error("can't run command > " + err.Error())
	}

	scanner := bufio.NewScanner(cmdReader)
	go func() {
		for scanner.Scan() {
			//low-level exception logging
			logger.Information("workflow process | " + scanner.Text())
		}
	}()

	err = cmd.Start()
	if err != nil {
		logger.Error("can't start command > " + err.Error())
	}

	//RE-SAVE WORKFLOW
	asdf := cmd.Process.Pid

	logger.Information(strconv.Itoa(asdf))

	workflow.PID = strconv.Itoa(asdf)

	UpdateCellarWorkflow(&workflow)

	//SEND RESPONSE
	dtoOut := cellarDTO{
		ExceptionText: "",
		Data:          workflow,
	}

	json.NewEncoder(w).Encode(dtoOut)

}

func apiStopWorkflowHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	//GET WORKFLOW
	workflow := GetCellarWorkflow(id)

	workflowPID := workflow.PID

	idnumber, _ := strconv.Atoi(workflowPID)

	proc, _ := os.FindProcess(idnumber)
	err := proc.Kill()
	if err != nil {
		logger.Error("process can't be killed > " + err.Error())
	}

	//RE-SAVE WORKFLOW
	workflow.PID = ""
	UpdateCellarWorkflow(&workflow)

	//SEND RESPONSE
	dtoOut := cellarDTO{
		ExceptionText: "",
		Data:          workflow,
	}

	json.NewEncoder(w).Encode(dtoOut)

}

func apiCheckProcessWorkflowHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	pid := vars["pid"]

	// pidnumber, _ := strconv.Atoi(pid)

	// Process info -------------------------
	// Create an *exec.Cmd
	cmd := exec.Command("ps", "-p", pid, "-o", "pid,time,%cpu,%mem,rss")

	// Combine stdout and stderr
	output, err := cmd.CombinedOutput()
	if err != nil {
		logger.Error(err.Error())
	}
	data := printOutput(output)

	dataFormatted := strings.Split(data, ",")

	//Number of goroutines ------------------
	// numGoroutines := runtime.NumGoroutine()
	// fmt.Println("number goroutine = ", numGoroutines)

	//SEND RESPONSE
	dtoOut := cellarDTO{
		ExceptionText: "",
		Data:          dataFormatted,
	}

	json.NewEncoder(w).Encode(dtoOut)

}

func throwExceptionHandler(w http.ResponseWriter, r *http.Request) {

	logger.Information("TEST from Workflow manager - throwException method")

	panic("SOME TEST EXCEPTION")
}

//--------------------------------
//--------------------------------
//--------------------------------
// API - CLI method
//--------------------------------
//--------------------------------
//--------------------------------

func apiProcessesHandler(w http.ResponseWriter, r *http.Request) {

	// Create an *exec.Cmd
	cmd := exec.Command("ps", "-e", "-o", "pid,time,%cpu,%mem,rss,cmd")

	// Combine stdout and stderr
	output, err := cmd.CombinedOutput()
	if err != nil {
		logger.Error(err.Error())
	}
	data := printOutput(output)

	dataFormatted := strings.Split(data, "\n")
	dto := cellarDTO{
		ExceptionText: "",
		Data:          dataFormatted,
	}

	json.NewEncoder(w).Encode(dto)
}

func apiActualDirectoryHandler(w http.ResponseWriter, r *http.Request) {

	var (
		cmdOut []byte
		err    error
	)
	cmd := "ls"
	args := []string{"-l"}
	cmdOut, err = exec.Command(cmd, args...).Output()
	if err != nil {
		logger.Error("can't run command > " + err.Error())
	}
	cmdOutText := string(cmdOut)
	dataFormatted := strings.Split(cmdOutText, "\n")

	dto := cellarDTO{
		ExceptionText: "",
		Data:          dataFormatted,
	}

	json.NewEncoder(w).Encode(dto)
}

func apiRunAllWorkflowsHandler(w http.ResponseWriter, r *http.Request) {

	var resultText []string

	//GET ALL WORKFLOW
	allworkflows := GetAllCellarWorkflows()
	for _, workflow := range allworkflows {

		workflowPid := workflow.PID

		// 1. check if PID exists and running
		isExist := checkIfProcessRun(workflowPid)

		// YES -> return
		if isExist {
			resultText = append(resultText, "[ALREADY RUNNING] - "+workflow.Parameters[0]+" - "+workflowPid)
			continue
		}

		// NO -> run + update
		newPID := runWorkflow(&workflow)

		resultText = append(resultText, "[NEW] - "+workflow.Parameters[0]+" - "+newPID)
	}

	//SEND RESPONSE
	dtoOut := cellarDTO{
		ExceptionText: "",
		Data:          resultText,
	}

	json.NewEncoder(w).Encode(dtoOut)

}

func apiStopAllWorkflowsHandler(w http.ResponseWriter, r *http.Request) {

	var resultText []string

	//GET ALL WORKFLOW
	allworkflows := GetAllCellarWorkflows()
	for _, workflow := range allworkflows {

		workflowPid := workflow.PID

		// 1. check if PID exists and running
		isExist := checkIfProcessRun(workflowPid)

		// NO -> return
		if !isExist {
			//update workflow in db
			workflow.PID = ""
			UpdateCellarWorkflow(&workflow)

			resultText = append(resultText, "[ALREADY STOPPED] - "+workflow.Parameters[0])
			continue
		}

		// YES -> STOP
		stopWorkflow(&workflow)

		resultText = append(resultText, "[STOP] - "+workflow.Parameters[0])
	}

	//SEND RESPONSE
	dtoOut := cellarDTO{
		ExceptionText: "",
		Data:          resultText,
	}

	json.NewEncoder(w).Encode(dtoOut)

}

func testCheckProcessWorkflowHandler(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	pid := vars["pid"]

	// 1. check if PID exists and running
	isExist := checkIfProcessRun(pid)

	//SEND RESPONSE
	dtoOut := cellarDTO{
		ExceptionText: "",
		Data:          isExist,
	}

	json.NewEncoder(w).Encode(dtoOut)

}

//-------------------------------------
//-------------------------------------
//-------------------------------------
//-------------------------------------
// WORKFLOW HELPERS
//-------------------------------------
//-------------------------------------
//-------------------------------------
//-------------------------------------

func checkIfProcessRun(pid string) bool {
	// Process info -------------------------
	// Create an *exec.Cmd
	cmd := exec.Command("ps", "-p", pid, "-o", "rss")

	// Combine stdout and stderr
	output, err := cmd.CombinedOutput()
	if err != nil {
		logger.Error(err.Error())
	}
	data := printOutput(output)

	dataFormatted := strings.Split(data, "\n")

	//***********************************
	//***********************************
	// CONTROL
	//***********************************
	//***********************************

	if len(dataFormatted) <= 1 {
		return false
	}

	text := dataFormatted[1]
	processLine := strings.Replace(text, " ", "", -1)

	if processLine == "" {
		return false
	}

	if processLine == "0" {
		return false
	}

	//EVERYTHING SEEMS OK
	return true
}

func runWorkflow(workflow *CellarWorkflow) string {

	workflowType := workflow.Type

	//RUN WORKFLOW
	var cmdArgs []string
	parCount := len(workflow.Parameters)
	for i := 0; i < parCount; i++ {
		cmdArgs = append(cmdArgs, workflow.Parameters[i])
	}

	cmdName := "./" + workflowType

	//run
	cmd := exec.Command(cmdName, cmdArgs...)
	cmdReader, err := cmd.StdoutPipe()
	if err != nil {
		logger.Error("can't run command > " + err.Error())
	}

	scanner := bufio.NewScanner(cmdReader)
	go func() {
		for scanner.Scan() {
			//low-level exception logging
			logger.Information("workflow process | " + scanner.Text())
		}
	}()

	err = cmd.Start()
	if err != nil {
		logger.Error("can't start command > " + err.Error())
	}

	//RE-SAVE WORKFLOW
	asdf := cmd.Process.Pid

	//logger.Information(strconv.Itoa(asdf))

	workflow.PID = strconv.Itoa(asdf)

	UpdateCellarWorkflow(workflow)

	return workflow.PID
}

func stopWorkflow(workflow *CellarWorkflow) {

	workflowPID := workflow.PID

	idnumber, _ := strconv.Atoi(workflowPID)

	proc, _ := os.FindProcess(idnumber)
	err := proc.Kill()
	if err != nil {
		logger.Error("process can't be killed > " + err.Error())
	}

	//RE-SAVE WORKFLOW
	workflow.PID = ""
	UpdateCellarWorkflow(workflow)
}

//-------------------------------------
//HELPERS
//-------------------------------------

func layoutFiles() []string {
	files, err := filepath.Glob(layoutDir + "/*.gohtml")
	if err != nil {
		//low-level exception logging
		logger.Error(err.Error())
	}
	return files
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

func randStringBytesMaskImprSrc(n int) string {
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