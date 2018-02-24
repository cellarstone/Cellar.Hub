package tasks

import (
	"testing"
)

func Test_ExceptionTask(t *testing.T) {

	inChannel := make(chan string)
	//defer close(inChannel)

	outChannel := make(chan string)
	//defer close(outChannel)

	closeChannel := make(chan string)
	//defer close(closeChannel)

	testTask := ExceptionTask{
		BaseTask: BaseTask{
			ChannelIn:    inChannel,
			ChannelOut:   outChannel,
			ChannelClose: closeChannel,
		},
		MessageCount: 120,
	}

	go testTask.Execute()

	//WRITE INTO INCHANNEL for task
	go func() {
		inChannel <- "hello world"
	}()

	// THEN
	expected := "hello world"
	found := <-outChannel // blocks until the output has contents

	if found != expected {
		t.Errorf("Expected %s, found %s", expected, found)
	}
}

func Benchmark_ExceptionTask(b *testing.B) {
	for index := 0; index < b.N; index++ {

		inChannel := make(chan string)
		//defer close(inChannel)

		outChannel := make(chan string)
		//defer close(outChannel)

		closeChannel := make(chan string)
		//defer close(closeChannel)

		testTask := ExceptionTask{
			BaseTask: BaseTask{
				ChannelIn:    inChannel,
				ChannelOut:   outChannel,
				ChannelClose: closeChannel,
			},
			MessageCount: 1200,
		}

		go testTask.Execute()

		//WRITE INTO INCHANNEL for task
		go func() {
			for index := 0; index < 1000; index++ {
				inChannel <- "hello world"
			}
			inChannel <- "close"
		}()

		// THEN
		expected := "hello world"
		for found := range outChannel {
			if found == "close" {
				closeChannel <- "close"
			}
			if found != expected {
			}
		}

	}
}
