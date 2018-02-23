package tasks

import (
	"testing"
)

func Test_ConcreteTask1(t *testing.T) {

	inChannel := make(chan string)
	//defer close(inChannel)

	outChannel := make(chan string)
	//defer close(outChannel)

	closeChannel := make(chan string)
	//defer close(closeChannel)

	testTask := ConcreteTask1{
		BaseTask: BaseTask{
			ChannelIn:    inChannel,
			ChannelOut:   outChannel,
			ChannelClose: closeChannel,
		},
		Name: "TestConcreteTask1",
	}

	go testTask.Execute()

	//WRITE INTO INCHANNEL for task
	go func() {
		inChannel <- "hello world"
	}()

	// THEN
	expected := "hello world1111111111"
	found := <-outChannel // blocks until the output has contents

	if found != expected {
		t.Errorf("Expected %s, found %s", expected, found)
	}
}

// func Benchmark_ConcreteTask1(b *testing.B) {
// 	for index := 0; index < b.N; index++ {

// 		inChannel := make(chan string)
// 		//defer close(inChannel)

// 		outChannel := make(chan string)
// 		//defer close(outChannel)

// 		closeChannel := make(chan string)
// 		//defer close(closeChannel)

// 		testTask := ConcreteTask1{
// 			BaseTask: BaseTask{
// 				ChannelIn:    inChannel,
// 				ChannelOut:   outChannel,
// 				ChannelClose: closeChannel,
// 			},
// 			Name: "TestConcreteTask1",
// 		}

// 		go testTask.Execute()

// 		//WRITE INTO INCHANNEL for task
// 		go func() {
// 			for index := 0; index < 1000; index++ {
// 				inChannel <- "hello world"
// 			}
// 			inChannel <- "close"
// 		}()

// 		// THEN
// 		expected := "hello world1111111111"
// 		for found := range outChannel {
// 			if found == "close" {
// 				closeChannel <- "close"
// 			}
// 			if found != expected {
// 			}
// 		}

// 	}
// }
