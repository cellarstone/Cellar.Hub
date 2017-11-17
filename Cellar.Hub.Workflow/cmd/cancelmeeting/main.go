package main

import (
	"log"
	"os"
	"os/signal"

	"github.com/erikdubbelboer/gspt"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/logging"
)

var workflowIn chan string
var workflowOut chan string

var logger *logging.Logger
var err error

//Prometheus url
var prometheusUrl = "http://prometheus/"

//Api url
var apiUrl = "http://cellar.hub.api"

//other parameters
var roomID string
var timePeriodBack string

func main() {
	// Set up channel on which to send signal notifications.
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, os.Kill)

	//set logging
	logger, err := logging.NewLogger("Cellar.Hub.Workflow.cmd.cancelmeeting")
	if err != nil {
		log.Fatal(err)
	}
	defer logger.FluentLogger.Close()

	// environment := os.Getenv("APP_ENV")
	workflowName := os.Args[1]
	gspt.SetProcTitle(workflowName)

	roomID = os.Args[2]
	timePeriodBack = os.Args[3]

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
			logger.Information("cancelMeeting", "OUT > "+value)
		}
		close(workflowOut)
	}()

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	// Wait for receiving a signal.
	<-sigc
}
