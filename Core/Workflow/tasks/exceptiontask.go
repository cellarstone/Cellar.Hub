package tasks

import (
	"errors"
)

//**********************************
//TASK - Exception
//**********************************
type ExceptionTask struct {
	BaseTask
	MessageCount int `json:"messageCount" bson:"messageCount"`
}

func (t *ExceptionTask) Execute() {

	// go func() {
	// 	<-t.ChannelClose
	// 	close(t.ChannelOut)
	// }()

	count := 0

	for {
		select {
		case tempR := <-t.ChannelIn:
			if count > t.MessageCount {
				errTest := errors.New("TEST EXCEPTION - Exception task")
				panic(errTest)
			}
			count++
			t.ChannelOut <- tempR
		case _ = <-t.ChannelStatus:
			t.ChannelStatus <- "OK"
		case _ = <-t.ChannelClose:
			close(t.ChannelOut)
		}
	}

}
