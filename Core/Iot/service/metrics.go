package service

import (
	"time"

	"github.com/go-kit/kit/metrics"
)

func NewMetricsMiddleware(requestCount metrics.Counter,
	requestLatency metrics.Histogram,
	s Service) Service {
	return &MetricsMiddleware{
		Service:        s,
		requestCount:   requestCount,
		requestLatency: requestLatency,
	}
}

type MetricsMiddleware struct {
	Service
	requestCount   metrics.Counter
	requestLatency metrics.Histogram
}

//-----------------------------
// SPACE
//-----------------------------

func (mw MetricsMiddleware) GetAllSpaces() ([]CellarSpace, error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "GetAllSpaces"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	r, e := mw.Service.GetAllSpaces()
	return r, e
}

func (mw MetricsMiddleware) GetRootSpaces() ([]CellarSpace, error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "GetRootSpaces"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	r, e := mw.Service.GetRootSpaces()
	return r, e
}

//-----------------------------
// MQTT
//-----------------------------

// Implement service functions and add label method for our metrics
func (mw MetricsMiddleware) PublishToMqtt(topic, value string) (err error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "PublishToMqtt"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	err = mw.Service.PublishToMqtt(topic, value)
	// fmt.Println("r:", result)
	return
}
