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

func (t *FLogger) Debug(message string) error {
	return t.log("Debug", message)
}

func (t *FLogger) Information(message string) error {
	return t.log("Information", message)
}

func (t *FLogger) Warning(message string) error {
	return t.log("Warning", message)
}

func (t *FLogger) Error(message string) error {
	return t.log("Error", message)
}

func (t *FLogger) Fatal(message string) error {
	return t.log("Fatal", message)
}

func (t *FLogger) log(level string, message string) error {
	var data = map[string]string{
		"level":   level,
		"message": message,
	}
	error := t.FluentLogger.Post(t.tag, data)
	if error != nil {
		return error
	}
	return nil
}
