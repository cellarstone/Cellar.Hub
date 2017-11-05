package main

import (
	"fmt"
	"math/rand"
	"os"
	"os/signal"
	"strconv"
	"strings"
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
	// Log as JSON instead of the default ASCII formatter.
	log.SetFormatter(&log.JSONFormatter{})

	// Output to stdout instead of the default stderr
	// Can be any io.Writer, see below for File example
	log.SetOutput(os.Stdout)

	// Only log the warning severity or above.
	log.SetLevel(log.InfoLevel)
}

func main() {
	fmt.Println("START")

	// Set up channel on which to send signal notifications.
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, os.Kill)

	// environment := os.Getenv("APP_ENV")
	// fmt.Println(environment)

	workflowName := os.Args[1]
	topic := os.Args[2]
	senzor := strings.Split(topic, "/")[0]
	gspt.SetProcTitle(workflowName)

	log.Info("main.go of Workflow2 with name(" + workflowName + ")START")

	workflowIn = make(chan string)
	workflowOut = make(chan string)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	RunWorkflow(workflowName)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	randomClientName := RandStringBytesMaskImprSrc(10)

	RunMqttTrigger("cellar.hub.mqtt:1883", randomClientName, topic)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	// read each message and print

	go func() {
		for value := range workflowOut {

			valueFloat, _ := strconv.ParseFloat(value, 64)

			//set metrics
			metricTemp.Set(valueFloat)
			metricTempCount.Inc()

			err := push.AddCollectors("pushgateway",
				map[string]string{"instance": workflowName, "senzor": senzor},
				gatewayUrl,
				metricTemp,
				metricTempCount,
			)
			if err != nil {
				fmt.Println("Could not push completion time to Pushgateway:", err)
			}

			fmt.Println("OUT > " + value)
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
