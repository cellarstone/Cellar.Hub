package iot

import (
	"time"

	"github.com/go-kit/kit/log"
)

func NewLoggingMiddleware(logger log.Logger, s Service) Service {
	return &LoggingMiddleware{
		Service: s,
		logger:  logger}
}

type LoggingMiddleware struct {
	Service
	logger log.Logger
}

//-----------------------------
// SPACE
//-----------------------------

func (mw LoggingMiddleware) GetAllSpaces() (result []CellarSpace, err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "GetAllSpaces",
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	r, e := mw.Service.GetAllSpaces()
	return r, e
}

func (mw LoggingMiddleware) GetRootSpaces() (result []CellarSpace, err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "GetRootSpaces",
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	r, e := mw.Service.GetRootSpaces()
	return r, e
}
