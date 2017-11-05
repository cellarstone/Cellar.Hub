package main

import (
	"fmt"
	"math/rand"
	"os"
	"os/signal"
	"strconv"
	"time"

	log "github.com/sirupsen/logrus"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/push"

	"github.com/erikdubbelboer/gspt"
)

var workflowIn chan string
var workflowOut chan string

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
	// Log as JSON instead of the default ASCII formatter.
	log.SetFormatter(&log.JSONFormatter{})

	// Output to stdout instead of the default stderr
	// Can be any io.Writer, see below for File example
	log.SetOutput(os.Stdout)

	// Only log the warning severity or above.
	log.SetLevel(log.InfoLevel)
}

func main() {

	// environment := os.Getenv("APP_ENV")
	workflowName := os.Args[1]
	gspt.SetProcTitle(workflowName)

	log.Info("main.go of Workflow1 with name(" + workflowName + ")START")

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
		for i := 0; i < 1000; i++ {
			time.Sleep(1 * time.Second)
			// randomNumber := random(1, 100)
			randomNumberFloat := rand.Float64() * 1000

			log.Info(workflowName + " - " + strconv.FormatFloat(randomNumberFloat, 'E', -1, 64))

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
				fmt.Println("Could not push completion time to Pushgateway:", err)
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
			log.Info("OUT > " + value)
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
