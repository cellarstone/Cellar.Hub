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

// var (
// 	metricTemp = prometheus.NewGauge(prometheus.GaugeOpts{
// 		Name: "cellar_randomnumber",
// 		Help: "Random Number from cellarstone program.",
// 	})
// 	metricTempCount = prometheus.NewCounter(
// 		prometheus.CounterOpts{
// 			Name: "cellar_count",
// 			Help: "Number of rundom numbers.",
// 		})
// )

func init() {
	//set logging
	logger, err = logging.NewDLogger("Cellar.Hub.Workflow.Workflow1")
	if err != nil {
		panic(err)
	}
}

func main() {
	defer recoverPanic()

	// logger.Information("AAA0") //funguje, jen kdyz to je DLogger
	// log.Println("AAA1")        //nefunguje
	// fmt.Println("AAA2")        //funguje

	// environment := os.Getenv("APP_ENV")
	workflowName := os.Args[1]
	gspt.SetProcTitle(workflowName)

	// Set up channel on which to send signal notifications.
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, os.Kill)

	workflowIn = make(chan string)
	workflowOut = make(chan string)

	// errTest := errors.New("TEST PANIC")
	// panic(errTest)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	RunWorkflow(workflowName)

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	// each second send message

	RunTimeRepeaterTrigger(1)

	// go func() {
	// 	defer recoverPanic()

	// 	var exceptionCount = 0

	// 	for {
	// 		time.Sleep(1 * time.Second)
	// 		// randomNumber := random(1, 100)
	// 		randomNumberFloat := rand.Float64() * 1000

	// 		// logger.Information("BBB0") //funguje, jen kdyz to je DLogger
	// 		// log.Println("BBB1")        //nefunguje
	// 		// fmt.Println("BBB2")        //funguje

	// 		if exceptionCount == 120 {
	// 			panic("SOME TIMING TEST PANIC")
	// 		}
	// 		exceptionCount++

	// 		//set metrics
	// 		metricTemp.Set(randomNumberFloat)
	// 		metricTempCount.Inc()

	// 		err := push.AddCollectors("pushgateway",
	// 			map[string]string{"instance": workflowName},
	// 			gatewayUrl,
	// 			metricTemp,
	// 			metricTempCount,
	// 		)
	// 		if err != nil {
	// 			// fmt.Println("Could not push completion time to Pushgateway > " + err.Error())
	// 			logger.Warning("Could not push completion time to Pushgateway > " + err.Error()) //nefunguje
	// 		}

	// 		//send value to the channel
	// 		workflowIn <- strconv.FormatFloat(randomNumberFloat, 'E', -1, 64)
	// 	}
	// 	close(workflowIn)
	// }()

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	// read each message and print

	go func() {
		for value := range workflowOut {
			//ulozit vysledek workflow vcetne celeho contextu
			//neukladat hodnotu z kazdeho workflow zvlast !!!!!
			//fmt.Println("OUT > " + value)
			logger.Information("OUT > " + value) //nefunguje
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
		// fmt.Println("[PANIC] - " + err.Error())
		// fmt.Panic()
		logger.Fatal("[PANIC] - " + err.Error()) //nefunguje
		// log.Println("[PANIC] - " + err.Error()) //nefunguje

		// os.Exit(1)
	}
}
