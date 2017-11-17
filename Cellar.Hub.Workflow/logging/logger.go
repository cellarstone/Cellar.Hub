package logging

import (
	"github.com/fluent/fluent-logger-golang/fluent"
)

type Logger struct {
	fluentdUrl   string
	FluentLogger *fluent.Fluent
	tag          string
}

func NewLogger(tag string) (logger *Logger, err error) {
	var errtemp error

	result := Logger{}
	result.fluentdUrl = "fluentd"
	result.tag = tag

	//set logging
	result.FluentLogger, errtemp = fluent.New(fluent.Config{FluentPort: 24224, FluentHost: result.fluentdUrl})
	if errtemp != nil {
		//stop program
		return nil, err
	}
	//defer logger.Close()

	return &result, nil
}

func (t *Logger) Debug(source string, message string) error {
	return t.log("Debug", source, message)
}

func (t *Logger) Information(source string, message string) error {
	return t.log("Information", source, message)
}

func (t *Logger) Warning(source string, message string) error {
	return t.log("Warning", source, message)
}

func (t *Logger) Error(source string, message string) error {
	return t.log("Error", source, message)
}

func (t *Logger) Fatal(source string, message string) error {
	return t.log("Fatal", source, message)
}

func (t *Logger) log(level string, source string, message string) error {
	var data = map[string]string{
		"level":   "Debug",
		"source":  source,
		"message": message,
	}
	error := t.FluentLogger.Post(t.tag, data)
	if error != nil {
		return error
	}
	return nil
}
