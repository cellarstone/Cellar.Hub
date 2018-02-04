package mqtt

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

// Implement Service Interface for LoggingMiddleware
func (mw LoggingMiddleware) PublishToMqtt(topic, value string) (err error) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "PublishToMqtt",
			"topic", topic,
			"value", value,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())
	err = mw.Service.PublishToMqtt(topic, value)
	return
}
