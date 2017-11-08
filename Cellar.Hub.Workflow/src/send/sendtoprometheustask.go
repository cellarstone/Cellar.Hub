package send

import (
	// abs "../abstraction"
	"fmt"
	"strconv"

	abs "github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/push"
)

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

	// metricTemp = prometheus.NewGauge(prometheus.GaugeOpts{
	// 	Name: t.Topic,
	// })

	fmt.Println("sendtoprometheustask - " + t.Senzor + " - " + t.Topic + " - " + t.PrometheusUrl)

	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING

		fmt.Println("sendtoprometheustask - " + value)

		valueFloat, err := strconv.ParseFloat(value, 64)
		if err != nil {
			panic(err)
			// logme("Error", "main", "Could not push completion time to Pushgateway > "+err.Error())
		}

		//Prometheus - set metrics
		metricTemp.Set(valueFloat)
		err = push.AddCollectors("pushgateway",
			map[string]string{"instance": "AAA", "senzor": t.Senzor},
			t.PrometheusUrl,
			metricTemp,
		)
		if err != nil {
			panic(err)
			// logme("Error", "main", "Could not push completion time to Pushgateway > "+err.Error())
		}
		//*****************

		fmt.Println("sendtoprometheustask2222 - " + value)
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
