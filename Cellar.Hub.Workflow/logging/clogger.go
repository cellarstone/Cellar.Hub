package logging

import (
	"log"
)

type CLogger struct {
	tag string
}

func NewCLogger(tag string) (logger *CLogger, err error) {

	result := CLogger{}
	result.tag = tag

	return &result, nil
}

func (t *CLogger) Debug(message string) error {
	return t.log("Debug", message)
}

func (t *CLogger) Information(message string) error {
	return t.log("Information", message)
}

func (t *CLogger) Warning(message string) error {
	return t.log("Warning", message)
}

func (t *CLogger) Error(message string) error {
	return t.log("Error", message)
}

func (t *CLogger) Fatal(message string) error {
	return t.log("Fatal", message)
}

func (t *CLogger) log(level string, message string) error {

	log.Println("[", level, "]", "[", t.tag, "]", " - ", message)

	return nil
}
