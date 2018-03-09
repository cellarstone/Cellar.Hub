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
// USER
//-----------------------------

func (mw MetricsMiddleware) GetAllUsers() ([]CellarUser, error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "GetAllUsers"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	r, e := mw.Service.GetAllUsers()
	return r, e
}
