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

func (mw LoggingMiddleware) DeleteWorkflows(senzorname string) (err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "DeleteWorkflows",
			"senzorname", senzorname,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	err = mw.Service.DeleteWorkflows(senzorname)
	return err
}

func (mw LoggingMiddleware) RunWorkflows(senzorname string) (err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "RunWorkflows",
			"senzorname", senzorname,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	err = mw.Service.RunWorkflows(senzorname)
	return err
}

func (mw LoggingMiddleware) CheckWorkflows(senzorname string) (result string, err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "CheckWorkflows",
			"senzorname", senzorname,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	result, err = mw.Service.CheckWorkflows(senzorname)
	return result, err
}

func (mw LoggingMiddleware) StopWorkflows(senzorname string) (err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "StopWorkflows",
			"senzorname", senzorname,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	err = mw.Service.StopWorkflows(senzorname)
	return err
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

func (mw LoggingMiddleware) StopAllWorkflows() (err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "StopAllWorkflows",
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	err = mw.Service.StopAllWorkflows()
	return err
}

func (mw LoggingMiddleware) StopWorkflow(id string) (err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "StopWorkflow",
			"id", id,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	err = mw.Service.StopWorkflow(id)
	return err
}

func (mw LoggingMiddleware) CreateAndRunDefaultSenzorWorkflows(senzorid string) (err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "CreateAndRunDefaultSenzorWorkflows",
			"senzorid", senzorid,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	err = mw.Service.CreateAndRunDefaultSenzorWorkflows(senzorid)
	return err
}

func (mw LoggingMiddleware) StopAndDeleteDefaultSenzorWorkflows(senzorid string) (err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "StopAndDeleteDefaultSenzorWorkflows",
			"senzorid", senzorid,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	err = mw.Service.StopAndDeleteDefaultSenzorWorkflows(senzorid)
	return err
}
