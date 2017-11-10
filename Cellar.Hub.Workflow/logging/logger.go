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
	error := t.Logger.Post(t.Tag, data)
	if error != nil {
		return error
	}
	return nil
}
