package service

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
// USER
//-----------------------------

func (mw LoggingMiddleware) GetAllUsers() (result []CellarUser, err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "GetAllUsers",
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	r, e := mw.Service.GetAllUsers()
	return r, e
}
