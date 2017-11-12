package logging

import (
	"github.com/fluent/fluent-logger-golang/fluent"
)

type Logger struct {
	fluentdUrl string
	logger     *fluent.Fluent
	tag        string
}

func NewLogger(tag string) *Logger {
	var err error

	result := Logger{}
	result.fluentdUrl = "fluentd"

	//set logging
	result.logger, err = fluent.New(fluent.Config{FluentPort: 24224, FluentHost: result.fluentdUrl})
	if err != nil {
		//stop program
		panic(err)
	}
	//defer logger.Close()

	result.fluentdUrl = "fluentd"
	result.tag = tag

	return &result
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
	error := t.logger.Post(t.tag, data)
	if error != nil {
		return error
	}
	return nil
}
