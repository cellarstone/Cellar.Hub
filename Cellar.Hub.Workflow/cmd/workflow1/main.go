package main

import (
	"fmt"
	"math/rand"
	"os"
	"os/signal"
	"strconv"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/push"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/logging"

	"github.com/erikdubbelboer/gspt"
)

var err error

var workflowIn chan string
var workflowOut chan string

//Logging
var logger *logging.CLogger

//Metrics
var gatewayUrl = "http://pushgateway:9091/"
var (
	metricTemp = prometheus.NewGauge(prometheus.GaugeOpts{
		Name: "cellar_randomnumber",
		Help: "Random Number from cellarstone program.",
	})
	metricTempCount = prometheus.NewCounter(
		prometheus.CounterOpts{
			Name: "cellar_count",
			Help: "Number of rundom numbers.",
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

	logger.Information("TEST from Workflow1")

	// environment := os.Getenv("APP_ENV")
	workflowName := os.Args[1]
	gspt.SetProcTitle(workflowName)

	// Set up channel on which to send signal notifications.
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, os.Kill)

	workflowIn = make(chan string)
	workflowOut = make(chan string)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	RunWorkflow(workflowName)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	// each 2 seconds send message

	go func() {
		for {
			time.Sleep(1 * time.Second)
			// randomNumber := random(1, 100)
			randomNumberFloat := rand.Float64() * 1000

			logger.Information("TEST from Workflow1 - new message")

			//set metrics
			metricTemp.Set(randomNumberFloat)
			metricTempCount.Inc()

			err := push.AddCollectors("pushgateway",
				map[string]string{"instance": workflowName},
				gatewayUrl,
				metricTemp,
				metricTempCount,
			)
			if err != nil {
				logger.Warning("Could not push completion time to Pushgateway > " + err.Error())
			}

			//send value to the channel
			workflowIn <- strconv.FormatFloat(randomNumberFloat, 'E', -1, 64)
		}
		close(workflowIn)
	}()

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
