package logging

import (
	"github.com/fluent/fluent-logger-golang/fluent"
)

type FLogger struct {
	fluentdUrl   string
	FluentLogger *fluent.Fluent
	tag          string
}

func NewFLogger(tag string) (logger *FLogger, err error) {
	var errtemp error

	result := FLogger{}
	result.fluentdUrl = "fluentd"
	result.tag = tag

	//set logging
	result.FluentLogger, errtemp = fluent.New(fluent.Config{FluentPort: 24224, FluentHost: result.fluentdUrl})
	if errtemp != nil {
		//stop program
		return nil, errtemp
	}
	//defer logger.Close()

	return &result, nil
}

func (t *FLogger) Debug(source string, message string) error {
	return t.log("Debug", source, message)
}

func (t *FLogger) Information(source string, message string) error {
	return t.log("Information", source, message)
}

func (t *FLogger) Warning(source string, message string) error {
	return t.log("Warning", source, message)
}

func (t *FLogger) Error(source string, message string) error {
	return t.log("Error", source, message)
}

func (t *FLogger) Fatal(source string, message string) error {
	return t.log("Fatal", source, message)
}

func (t *FLogger) log(level string, source string, message string) error {
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
