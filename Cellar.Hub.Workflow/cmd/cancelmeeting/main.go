package main

import (
	"math/rand"
	"os"
	"os/signal"
	"time"

	"github.com/erikdubbelboer/gspt"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/logging"
)

var workflowIn chan string
var workflowOut chan string

//Logging
// var fluentdUrl = "fluentd"
// var logger *fluent.Fluent
// var tag = "Cellar.Hub.Workflow.Manager"
// var err error

var logger *log.Logger

func main() {
	// Set up channel on which to send signal notifications.
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, os.Kill)

	//set logging
	// logger, err = fluent.New(fluent.Config{FluentPort: 24224, FluentHost: fluentdUrl})
	// if err != nil {
	// 	//stop program
	// 	panic(err)
	// }
	// defer logger.Close()
	logger := log.

	// environment := os.Getenv("APP_ENV")
	workflowName := os.Args[1]
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
			log("Info", "cancelMeeting", "OUT > "+value)
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
func log(level string, method string, message string) {
	var data = map[string]string{
		"level":   level,
		"method":  method,
		"message": message,
	}
	error := logger.Post(tag, data)
	if error != nil {
		panic(error)
	}
}
func random(min, max int) int {
	rand.Seed(time.Now().Unix())
	return rand.Intn(max-min) + min
}
