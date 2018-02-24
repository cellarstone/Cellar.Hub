package clients

import (
	"strconv"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/push"
)

var (
	metricTemp = prometheus.NewGauge(prometheus.GaugeOpts{
		Name: "value",
		Help: "Cellarstone Time Serie",
	})
)

// ---------------------------------------
// INTERFACE
// ---------------------------------------
type PrometheusClient interface {
	Publish(tag string, value string) error
}

// ---------------------------------------
// REAL IMPLEMENTATION
// ---------------------------------------
type CellarPrometheusClient struct {
	url string
}

func NewCellarPrometheusClient(url string) (*CellarPrometheusClient, error) {
	return &CellarPrometheusClient{
		url: url,
	}, nil
}

func (c CellarPrometheusClient) Publish(tag string, value string) error {
	valueFloat, err := strconv.ParseFloat(value, 64)
	if err != nil {
		return err
	}

	//Prometheus - set metrics
	metricTemp.Set(valueFloat)
	err = push.AddCollectors("pushgateway",
		map[string]string{"tag": tag},
		c.url,
		metricTemp,
	)
	if err != nil {
		return err
	}
	return nil
}
