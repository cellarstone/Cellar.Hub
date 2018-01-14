package main

import (
	"fmt"
	"math/rand"
	"os"
	"os/signal"
	"time"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/logging"
	"github.com/erikdubbelboer/gspt"
)

//INPUT PARAMETERS -----------------
// ORDER MATTERS
var workflowName string
var senzorID string
var topic string
var MqttUrl = "cellar.hub.mqtt:1883"
var fluentdUrl = "fluentd"

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
	logger, err = logging.NewCLogger("Cellar.Hub.Workflow.SaveToFluentd")
	if err != nil {
		panic(err)
	}
}

func main() {
	defer recoverPanic()

	logger.Information("TEST from Workflow - SaveToFluentd")

	// Set up channel on which to send signal notifications.
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, os.Kill)

	// environment := os.Getenv("APP_ENV")
	// fmt.Println(environment)

	workflowName := os.Args[1]
	senzorID = os.Args[2]
	topic = os.Args[3]
	MqttUrl = os.Args[4]
	fluentdUrl = os.Args[5]

	gspt.SetProcTitle(workflowName)

	workflowIn = make(chan string)
	workflowOut = make(chan string)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	// read each message and print

	go func() {
		for value := range workflowOut {

			//DO NOTHING
			logger.Information("OUT > " + value)

		}
		close(workflowOut)
	}()

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	RunWorkflow(workflowName)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	RunMqttTrigger()

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	// Wait for receiving a signal.
	<-sigc
}

//-------------------------------------
//HELPERS
//-------------------------------------
func random(min, max int) int {
	rand.Seed(time.Now().Unix())
	return rand.Intn(max-min) + min
}

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
