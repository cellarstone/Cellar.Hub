package main

import (
	"fmt"
	"math/rand"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"time"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/logging"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/push"

	"github.com/erikdubbelboer/gspt"
)

var err error

var workflowIn chan string
var workflowOut chan string

//Logging
var logger *logging.CLogger

//Mqtt url
var MqttUrl = "cellar.hub.mqtt:1883"

//Metrics
var gatewayUrl = "http://pushgateway:9091/"
var (
	metricTemp = prometheus.NewGauge(prometheus.GaugeOpts{
		Name: "cellar_mqttnumber",
		Help: "Mqtt value from cellarstone program.",
	})
	metricTempCount = prometheus.NewCounter(
		prometheus.CounterOpts{
			Name: "cellar_mqttcount",
			Help: "Number of Mqtt numbers.",
		})
)

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

			valueFloat, _ := strconv.ParseFloat(value, 64)

			//Prometheus - set metrics
			metricTemp.Set(valueFloat)
			metricTempCount.Inc()
			err := push.AddCollectors("pushgateway",
				map[string]string{"instance": workflowName, "senzor": senzor},
				gatewayUrl,
				metricTemp,
				metricTempCount,
			)
			if err != nil {
				logger.Warning("Could not push completion time to Pushgateway > " + err.Error())
			}

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
