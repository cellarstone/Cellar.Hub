package send

import (
	// abs "../abstraction"
	"fmt"
	"strconv"

	abs "github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
	"github.com/fluent/fluent-logger-golang/fluent"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/push"
)

//Fluentd
var fluentdUrl = "fluentd"
var logger *fluent.Fluent
var tag = "SaveToPrometheusWorkflow"
var err error

var (
	metricTemp = prometheus.NewGauge(prometheus.GaugeOpts{
		Name: "cellar_mqttnumber",
		Help: "Mqtt value from cellarstone program.",
	})
)

//**********************************
//TASK - Send to prometheus
//**********************************
type SendToPrometheusTask struct {
	abs.BaseTask
	Senzor        string `json:"senzor" bson:"senzor"`
	Topic         string `json:"topic" bson:"topic"`
	PrometheusUrl string `json:"prometheusurl" bson:"prometheusurl"`
}

func (t *SendToPrometheusTask) Execute() error {

	//set logging
	logger, err = fluent.New(fluent.Config{FluentPort: 24224, FluentHost: fluentdUrl})
	if err != nil {
		//stop program
		panic(err)
	}
	defer logger.Close()

	logme("Debug", "SendToPrometheusTask", "TEST message")

	fmt.Println("sendtoprometheustask - START")

	metricTemp = prometheus.NewGauge(prometheus.GaugeOpts{
		Name: t.Topic,
	})

	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING

		fmt.Println("sendtoprometheustask - " + value)

		valueFloat, _ := strconv.ParseFloat(value, 64)

		//Prometheus - set metrics
		metricTemp.Set(valueFloat)
		err := push.AddCollectors("pushgateway",
			map[string]string{"senzor": t.Senzor},
			t.PrometheusUrl,
			metricTemp,
		)
		if err != nil {
			panic(err)
			// logme("Error", "main", "Could not push completion time to Pushgateway > "+err.Error())
		}
		//*****************
		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *SendToPrometheusTask) ExecuteParallel(value string) error {

	metricTemp = prometheus.NewGauge(prometheus.GaugeOpts{
		Name: t.Topic,
	})

	t.State = "inprogress"
	//*****************
	// DOING SOMETHING
	valueFloat, _ := strconv.ParseFloat(value, 64)

	//Prometheus - set metrics
	metricTemp.Set(valueFloat)
	err := push.AddCollectors("pushgateway",
		map[string]string{"senzor": t.Senzor},
		t.PrometheusUrl,
		metricTemp,
	)
	if err != nil {
		panic(err)
		// logme("Error", "main", "Could not push completion time to Pushgateway > "+err.Error())
	}
	//*****************
	t.State = "completed"
	return nil
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
