package engine

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
func (mw MetricsMiddleware) UpdateWorkflow(workflow CellarWorkflow) (result CellarWorkflow, err error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "UpdateWorkflow"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	result, err = mw.Service.UpdateWorkflow(workflow)
	return result, err
}

// Implement service functions and add label method for our metrics
func (mw MetricsMiddleware) SaveWorkflow(workflowType string, workflowParams interface{}, tags []string, triggerType string, triggerParams interface{}) (result CellarWorkflow, err error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "SaveWorkflow"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	result, err = mw.Service.SaveWorkflow(workflowType, workflowParams, tags, triggerType, triggerParams)
	return result, err
}

func (mw MetricsMiddleware) GetAllWorkflows() (data []CellarWorkflow, err error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "GetAllWorkflows"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	data, err = mw.Service.GetAllWorkflows()
	return data, err
}

func (mw MetricsMiddleware) GetWorkflows(senzorname string) (data []CellarWorkflow, err error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "GetWorkflows"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	data, err = mw.Service.GetWorkflows(senzorname)
	return data, err
}

func (mw MetricsMiddleware) GetWorkflow(id string) (data CellarWorkflow, err error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "GetWorkflow"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	data, err = mw.Service.GetWorkflow(id)
	return data, err
}

func (mw MetricsMiddleware) RunAllWorkflows() (err error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "RunAllWorkflows"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	err = mw.Service.RunAllWorkflows()
	return err
}

// Implement service functions and add label method for our metrics
func (mw MetricsMiddleware) RunWorkflow(id string) (err error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "RunWorkflow"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	err = mw.Service.RunWorkflow(id)
	return err
}

func (mw MetricsMiddleware) CheckAllWorkflows() (res string) {
	defer func(begin time.Time) {
		lvs := []string{"method", "CheckAllWorkflows"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	res = mw.Service.CheckAllWorkflows()
	return res
}

func (mw MetricsMiddleware) CheckWorkflow(id string) (result string, err error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "CheckAllWorkflows"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	result, err = mw.Service.CheckWorkflow(id)
	return result, err
}

func (mw MetricsMiddleware) CloseAllWorkflows() (err error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "CloseAllWorkflows"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	err = mw.Service.CloseAllWorkflows()
	return err
}

func (mw MetricsMiddleware) CloseWorkflow(id string) (err error) {
	defer func(begin time.Time) {
		lvs := []string{"method", "CloseWorkflow"}
		mw.requestCount.With(lvs...).Add(1)
		mw.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())
	err = mw.Service.CloseWorkflow(id)
	return err
}
