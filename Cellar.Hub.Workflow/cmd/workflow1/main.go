package main

import (
	"math/rand"
	"os"
	"os/signal"
	"time"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/logging"

	"github.com/erikdubbelboer/gspt"
)

var err error

var workflowIn chan string
var workflowOut chan string

//Logging
var logger *logging.DLogger

//Metrics
var gatewayUrl = "http://pushgateway:9091/"

func init() {
	//set logging
	logger, err = logging.NewDLogger("Cellar.Hub.Workflow.Workflow1")
	if err != nil {
		panic(err)
	}
}

func main() {
	defer recoverPanic()

	// environment := os.Getenv("APP_ENV")
	workflowName := os.Args[1]
	gspt.SetProcTitle(workflowName)

	// Set up channel on which to send signal notifications.
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, os.Kill)

	workflowIn = make(chan string)
	workflowOut = make(chan string)

	// logger.Information("AAA0") //funguje, jen kdyz to je DLogger
	// log.Println("AAA1")        //nefunguje
	// fmt.Println("AAA2")        //funguje

	// errTest := errors.New("TEST PANIC")
	// panic(errTest)

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
	// each second send message

	RunTimeRepeaterTrigger(1)

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
