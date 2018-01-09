package main

import (
	"fmt"
	"os"
	"os/signal"

	"github.com/erikdubbelboer/gspt"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/logging"
)

//INPUT PARAMETERS -----------------
var workflowName string
var roomID string
var timePeriodBack string
var prometheusUrl = "http://prometheus/"
var apiUrl = "http://cellar.hub.api"

//----------------------------------

//IN-OUT CHANNELS ------------------
var workflowIn chan string
var workflowOut chan string

//----------------------------------

//Logging
var logger *logging.CLogger
var err error

func init() {
	//set logging
	logger, err = logging.NewCLogger("Cellar.Hub.Workflow.CancelMeeting")
	if err != nil {
		panic(err)
	}
}

func main() {
	defer recoverPanic()

	logger.Information("TEST from Workflow - CancelMeeting")

	// Set up channel on which to send signal notifications.
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, os.Kill)

	// environment := os.Getenv("APP_ENV")
	workflowName = os.Args[1]
	roomID = os.Args[2]
	timePeriodBack = os.Args[3]
	prometheusUrl = os.Args[4]
	apiUrl = os.Args[5]

	gspt.SetProcTitle(workflowName)

	workflowIn = make(chan string)
	workflowOut = make(chan string)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	RunWorkflow(workflowName)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	// each second send message

	RunTimeRepeaterTrigger(1)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	// read each message and print

	go func() {
		for value := range workflowOut {
			//ulozit vysledek workflow vcetne celeho contextu
			//neukladat hodnotu z kazdeho workflow zvlast !!!!!
			logger.Information("OUT > " + value)

		}
		close(workflowOut)
	}()

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	// Wait for receiving a signal.
	<-sigc
}

//-------------------------------------
//HELPERS
//-------------------------------------

//Error handling
func recoverPanic() {
	if rec := recover(); rec != nil {
		err := rec.(error)
		//low-level exception logging
		fmt.Println("Handle panic > " + err.Error())
		logger.Fatal("[PANIC] - " + err.Error())
		// fmt.Println("recoverPanic" + err.Error())
		// logger.Printf("Unhandled error: %v\n", err.Error())
		// fmt.Fprintf(os.Stderr, "Program quit unexpectedly; please check your logs\n")
		os.Exit(1)
	}
}
