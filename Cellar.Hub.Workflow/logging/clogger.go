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

func (t *CLogger) Debug(source string, message string) error {
	return t.log("Debug", source, message)
}

func (t *CLogger) Information(source string, message string) error {
	return t.log("Information", source, message)
}

func (t *CLogger) Warning(source string, message string) error {
	return t.log("Warning", source, message)
}

func (t *CLogger) Error(source string, message string) error {
	return t.log("Error", source, message)
}

func (t *CLogger) Fatal(source string, message string) error {
	return t.log("Fatal", source, message)
}

func (t *CLogger) log(level string, source string, message string) error {

	log.Println("[", level, "]", "[", source, "]", " - ", message)

	// fmt.Println("[", level, "]", "[", source, "]", " - ", message)

	return nil
}
