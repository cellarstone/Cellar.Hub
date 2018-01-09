package main

import (
	"math/rand"
	"os"
	"os/signal"
	"time"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/logging"

	"github.com/erikdubbelboer/gspt"
)

//INPUT PARAMETERS -----------------
// ORDER MATTERS
var workflowName string
var senzorID string
var topic string
var MqttUrl = "cellar.hub.mqtt:1883"
var gatewayUrl = "http://pushgateway:9091/"

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
	logger, err = logging.NewCLogger("Cellar.Hub.Workflow.Workflow1")
	if err != nil {
		panic(err)
	}
}

func main() {
	defer recoverPanic()

	logger.Information("TEST from Workflow2")

	// Set up channel on which to send signal notifications.
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, os.Kill)

	// environment := os.Getenv("APP_ENV")
	// fmt.Println(environment)

	workflowName = os.Args[1]
	senzorID = os.Args[2]
	topic = os.Args[3]
	MqttUrl = os.Args[4]
	gatewayUrl = os.Args[5]

	gspt.SetProcTitle(workflowName)

	// log.Info("main.go of Workflow2 with name(" + workflowName + ")START")

	workflowIn = make(chan string)
	workflowOut = make(chan string)

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
		// fmt.Println("[PANIC] - " + err.Error())
		logger.Fatal("[PANIC] - " + err.Error()) //funguje, jen kdyz pouziju DLogger
		// log.Println("[PANIC] - " + err.Error()) //nefunguje

		// os.Exit(1)
	}
}
