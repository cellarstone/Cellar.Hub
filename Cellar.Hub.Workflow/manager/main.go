package main

import (
	"errors"
	"fmt"
	"html/template"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"syscall"

	"github.com/erikdubbelboer/gspt"
	ps "github.com/mitchellh/go-ps"
)

var LayoutDir string = "views/layout"
var index *template.Template
var contact *template.Template
var processes *template.Template

type CellarDTO struct {
	ID    string   `json:"ID"`
	Error string   `json:"Error"`
	Data  []string `json:"Data"`
}

var runningProcesses []string

func main() {

	//Set process name of current program
	port := ":" + os.Args[1]
	programName := os.Args[2]
	gspt.SetProcTitle(programName)

	// at this stage the Processes related functions found in Golang's OS package
	// is no longer sufficient, we will use Mitchell Hashimoto's https://github.com/mitchellh/go-ps
	// package to find the application/executable/binary name behind the process ID.

	p, err2 := ps.FindProcess(32744)

	if err2 != nil {
		fmt.Println("Error : ", err2)
		os.Exit(-1)
	}

	fmt.Println("Process ID : ", p.Pid())
	fmt.Println("Parent Process ID : ", p.PPid())
	fmt.Println("Process ID binary name : ", p.Executable())

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

	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/contact", contactHandler)
	http.HandleFunc("/processes", processesHandler)
	http.ListenAndServe(port, nil)
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

//--------------------------------
// API method
//--------------------------------
func processesHandler(w http.ResponseWriter, r *http.Request) {

	// Create an *exec.Cmd
	cmd := exec.Command("ps", "-e")

	// Combine stdout and stderr
	output, err := cmd.CombinedOutput()
	printError(err)
	data := printOutput(output) // => go version go1.3 darwin/amd64

	fmt.Println(data)

	// dataFormatted := strings.Split(data, "\n")
	// for _, val := range res {
	// 	fmt.Println(val)
	// }

	dataFormatted := strings.Split(data, "\n")

	dto := CellarDTO{
		ID:    "23479247lkjadflkjsdf",
		Error: "",
		Data:  dataFormatted,
	}

	// json.NewEncoder(w).Encode(dto)

	processes.ExecuteTemplate(w, "layouttemplate", dto)
}

func startWorkflow1(w http.ResponseWriter, r *http.Request) {

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
