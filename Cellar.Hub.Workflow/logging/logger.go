package logging

import (
	"github.com/fluent/fluent-logger-golang/fluent"
)

type Logger struct {
	FluentdUrl string
	Logger     *fluent.Fluent
	Tag        string
}

func NewLogger(tag string) *Logger {
	var err error

	result := Logger{}
	result.FluentdUrl = "fluentd"

	//set logging
	result.Logger, err = fluent.New(fluent.Config{FluentPort: 24224, FluentHost: result.FluentdUrl})
	if err != nil {
		//stop program
		panic(err)
	}
	//defer logger.Close()

	result.FluentdUrl = "fluentd"
	result.Tag = tag

	return &result
}
