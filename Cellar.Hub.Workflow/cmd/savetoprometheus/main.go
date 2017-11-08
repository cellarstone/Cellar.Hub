package main

import (
	"fmt"
	"math/rand"
	"os"
	"os/signal"
	"strings"
	"time"

	"github.com/erikdubbelboer/gspt"
	"github.com/fluent/fluent-logger-golang/fluent"
)

var workflowIn chan string
var workflowOut chan string

//Mqtt url
var MqttUrl = "cellar.hub.mqtt:1883"

//Prometheus url
var gatewayUrl = "http://pushgateway:9091/"

//Fluentd
var fluentdUrl = "fluentd"
var logger *fluent.Fluent
var tag = "Cellar.Hub.Workflow.Workflow2"
var err error

// func init() {
// 	// Log as JSON instead of the default ASCII formatter.
// 	log.SetFormatter(&log.JSONFormatter{})

// 	// Output to stdout instead of the default stderr
// 	// Can be any io.Writer, see below for File example
// 	log.SetOutput(os.Stdout)

// 	// Only log the warning severity or above.
// 	log.SetLevel(log.InfoLevel)
// }

func main() {
	defer recoverPanic()

	//set logging
	logger, err = fluent.New(fluent.Config{FluentPort: 24224, FluentHost: fluentdUrl})
	if err != nil {
		//low-level exception logging
		fmt.Println(err)
	}
	defer logger.Close()

	// fmt.Println("TEST2 fmt Println")
	// log.Println("TEST2 log Println")
	//NEFUNGUJE - PROC ?
	logme("Info", "indexHandler", "TEST2 logme")

	// Set up channel on which to send signal notifications.
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, os.Kill)

	// environment := os.Getenv("APP_ENV")
	// fmt.Println(environment)

	workflowName := os.Args[1]
	topic := os.Args[2]
	senzor := strings.Split(topic, "/")[0]
	gspt.SetProcTitle(workflowName)

	// log.Info("main.go of Workflow2 with name(" + workflowName + ")START")

	workflowIn = make(chan string)
	workflowOut = make(chan string)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	RunWorkflow(workflowName)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	randomClientName := RandStringBytesMaskImprSrc(10)

	RunMqttTrigger(MqttUrl, randomClientName, topic)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	// read each message and print

	go func() {
		for value := range workflowOut {

			//DO NOTHING
			value = value

		}
		close(workflowOut)
	}()

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	// Wait for receiving a signal.
	<-sigc
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

func logme(level string, method string, message string) {
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

//Error handling
func recoverPanic() {
	if rec := recover(); rec != nil {
		err := rec.(error)
		//low-level exception logging
		fmt.Println("Handle panic > " + err.Error())
		// fmt.Println("recoverPanic" + err.Error())
		// logger.Printf("Unhandled error: %v\n", err.Error())
		// fmt.Fprintf(os.Stderr, "Program quit unexpectedly; please check your logs\n")
		os.Exit(1)
	}
}
