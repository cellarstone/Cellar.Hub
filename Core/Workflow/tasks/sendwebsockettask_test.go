package tasks

import (
	"fmt"
	"testing"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/clients"
)

type MockSendToWebsocketTask struct {
	BaseTask
	Url    string `json:"url" bson:"url"`
	Room   string `json:"room" bson:"room"`
	client *clients.MockWebsocketClient
}

func (t *MockSendToWebsocketTask) Execute() {

	go func() {
		<-t.ChannelClose
		//fmt.Println("closing SendToWebsocketTask")
		close(t.ChannelOut)
	}()

	var err error
	t.client, err = clients.NewMockWebsocketClient()
	if err != nil {
		fmt.Println(err.Error)
	}
	//defer clientWebsocket.Client.Close()

	for value := range t.ChannelIn {

		t.client.Send(value)

		t.ChannelOut <- value
	}
}

func Test_SendWebsocketTask(t *testing.T) {

	inChannel := make(chan string)
	//defer close(inChannel)

	outChannel := make(chan string)
	//defer close(outChannel)

	closeChannel := make(chan string)
	//defer close(closeChannel)

	testTask := MockSendToWebsocketTask{
		BaseTask: BaseTask{
			ChannelIn:    inChannel,
			ChannelOut:   outChannel,
			ChannelClose: closeChannel,
		},
		Url:  "localhost:44406",
		Room: "testtopic",
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

func Benchmark_SendWebsocketTask(b *testing.B) {
	for index := 0; index < b.N; index++ {

		inChannel := make(chan string)
		//defer close(inChannel)

		outChannel := make(chan string)
		//defer close(outChannel)

		closeChannel := make(chan string)
		//defer close(closeChannel)

		testTask := MockSendToWebsocketTask{
			BaseTask: BaseTask{
				ChannelIn:    inChannel,
				ChannelOut:   outChannel,
				ChannelClose: closeChannel,
			},
			Url:  "localhost:44406",
			Room: "testtopic",
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
