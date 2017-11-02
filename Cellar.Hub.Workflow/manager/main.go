package main

import (
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
	"syscall"
	"time"
)

var LayoutDir string = "views/layout"
var index *template.Template
var contact *template.Template
var processes *template.Template
var runningprocesses *template.Template

type CellarDTO struct {
	ID    string   `json:"ID"`
	Error string   `json:"Error"`
	Data  []string `json:"Data"`
}

var runningProcesses []string

func main() {

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
	files = append(layoutFiles(), "views/processes.gohtml")
	runningprocesses, err = template.ParseFiles(files...)
	if err != nil {
		panic(err)
	}

	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/contact", contactHandler)
	http.HandleFunc("/processes", processesHandler)
	http.HandleFunc("/runningprocesses", runningprocessesHandler)
	http.HandleFunc("/runworkflow", runworkflowHandler)
	http.ListenAndServe(":3000", nil)
}

//--------------------------------
// MVC methods
//--------------------------------
func indexHandler(w http.ResponseWriter, r *http.Request) {
	index.ExecuteTemplate(w, "layouttemplate", nil)
}

func contactHandler(w http.ResponseWriter, r *http.Request) {
	contact.ExecuteTemplate(w, "layouttemplate", nil)
}
func processesHandler(w http.ResponseWriter, r *http.Request) {

	// Create an *exec.Cmd
	cmd := exec.Command("ps", "-e")

	// Combine stdout and stderr
	output, err := cmd.CombinedOutput()
	printError(err)
	data := printOutput(output) // => go version go1.3 darwin/amd64

	fmt.Println(data)

	dataFormatted := strings.Split(data, "\n")

	dto := CellarDTO{
		ID:    RandStringBytesMaskImprSrc(5),
		Error: "",
		Data:  dataFormatted,
	}

	processes.ExecuteTemplate(w, "layouttemplate", dto)
}

func runningprocessesHandler(w http.ResponseWriter, r *http.Request) {

	dto := CellarDTO{
		ID:    RandStringBytesMaskImprSrc(5),
		Error: "",
		Data:  runningProcesses,
	}

	runningprocesses.ExecuteTemplate(w, "layouttemplate", dto)
}

//--------------------------------
// API method
//--------------------------------
func runworkflowHandler(w http.ResponseWriter, r *http.Request) {

	randomWorkflowName := "cellarworkflow" + RandStringBytesMaskImprSrc(5)

	cmd := exec.Command("./cellarworkf1 " + randomWorkflowName)
	cmd.Stdout = os.Stdout
	err := cmd.Start()
	if err != nil {
		log.Fatal(err)
	}
	pid := strconv.Itoa(cmd.Process.Pid)
	runningProcesses = append(runningProcesses, pid)

	log.Printf("Just ran subprocess %d, exiting\n", cmd.Process.Pid)
	cmd.Wait()
}

// check if the process is actually running
// However, on Unix systems, os.FindProcess always succeeds and returns
// a Process for the given pid...regardless of whether the process exists
// or not.
func getProcessRunningStatus(pid int) (*os.Process, error) {
	proc, err := os.FindProcess(pid)
	if err != nil {
		return nil, err
	}

	//double check if process is running and alive
	//by sending a signal 0
	//NOTE : syscall.Signal is not available in Windows

	err = proc.Signal(syscall.Signal(0))
	if err == nil {
		return proc, nil
	}

	if err == syscall.ESRCH {
		return nil, errors.New("process not running")
	}

	// default
	return nil, errors.New("process running but query operation not permitted")
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
