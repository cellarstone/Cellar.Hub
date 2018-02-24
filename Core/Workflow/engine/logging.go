package engine

import (
	"time"

	"github.com/go-kit/kit/log"
)

// implement function to return ServiceMiddleware
func NewLoggingMiddleware(logger log.Logger, s Service) Service {
	return &LoggingMiddleware{
		Service: s,
		logger:  logger}
}

// Make a new type and wrap into Service interface
// Add logger property to this type
type LoggingMiddleware struct {
	Service
	logger log.Logger
}

func (mw LoggingMiddleware) UpdateWorkflow(workflow CellarWorkflow) (result CellarWorkflow, err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "SaveWorkflow",
			"workflow", workflow,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	result, err = mw.Service.UpdateWorkflow(workflow)
	return result, err
}

func (mw LoggingMiddleware) SaveWorkflow(workflowType string, workflowParams interface{}, tags []string, triggerType string, triggerParams interface{}) (result CellarWorkflow, err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "SaveWorkflow",
			"workflowtype", workflowType,
			"workflowparams", workflowParams,
			"tags", tags,
			"triggertype", triggerType,
			"triggerparams", triggerParams,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	result, err = mw.Service.SaveWorkflow(workflowType, workflowParams, tags, triggerType, triggerParams)
	return result, err
}
func (mw LoggingMiddleware) GetAllWorkflows() (data []CellarWorkflow, err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "GetAllWorkflows",
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	data, err = mw.Service.GetAllWorkflows()
	return data, err
}

func (mw LoggingMiddleware) GetWorkflows(senzorname string) (data []CellarWorkflow, err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "GetWorkflows",
			"senzorname", senzorname,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	data, err = mw.Service.GetWorkflows(senzorname)
	return data, err
}

func (mw LoggingMiddleware) GetWorkflow(id string) (data CellarWorkflow, err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "GetWorkflow",
			"id", id,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	data, err = mw.Service.GetWorkflow(id)
	return data, err
}

func (mw LoggingMiddleware) RunAllWorkflows() (err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "RunAllWorkflows",
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	err = mw.Service.RunAllWorkflows()
	return err
}

// Implement Service Interface for LoggingMiddleware
func (mw LoggingMiddleware) RunWorkflow(id string) (err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "RunWorkflow",
			"id", id,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	err = mw.Service.RunWorkflow(id)
	return err
}

func (mw LoggingMiddleware) CheckAllWorkflows() (res string) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "CheckAllWorkflows",
			"result", res,
			"took", time.Since(begin),
		)
	}(time.Now())
	res = mw.Service.CheckAllWorkflows()
	return res
}

func (mw LoggingMiddleware) CheckWorkflow(id string) (result string, err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "CheckWorkflow",
			"id", id,
			"result", result,
			"took", time.Since(begin),
		)
	}(time.Now())
	result, err = mw.Service.CheckWorkflow(id)
	return result, err
}

func (mw LoggingMiddleware) CloseAllWorkflows() (err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "CloseAllWorkflows",
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	err = mw.Service.CloseAllWorkflows()
	return err
}

func (mw LoggingMiddleware) CloseWorkflow(id string) (err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "CloseWorkflow",
			"id", id,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	err = mw.Service.CloseWorkflow(id)
	return err
}
