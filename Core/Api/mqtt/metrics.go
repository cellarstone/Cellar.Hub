package mqtt

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

// Make a new type and wrap into Service interface
// Add expected metrics property to this type
type MetricsMiddleware struct {
	Service
	requestCount   metrics.Counter
	requestLatency metrics.Histogram
}

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
