package tasks

import (
	"fmt"
	"testing"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/clients"
)

type MockSendMqttTask struct {
	BaseTask
	Topic   string `json:"topic" bson:"topic"`
	MqttUrl string `json:"mqtturl" bson:"mqtturl"`
	client  *clients.MockMqttClient
}

func (t *MockSendMqttTask) Execute() {

	go func() {
		<-t.ChannelClose
		//fmt.Println("closing SendMqttTask")
		close(t.ChannelOut)
	}()

	var err error
	t.client, err = clients.NewMockMqttClient()
	if err != nil {
		fmt.Println(err.Error)
	}

	for value := range t.ChannelIn {

		t.client.Publish(t.Topic, value)
		t.ChannelOut <- value
	}

}
func Test_SendMqttTask(t *testing.T) {

	inChannel := make(chan string)
	//defer close(inChannel)

	outChannel := make(chan string)
	//defer close(outChannel)

	closeChannel := make(chan string)
	//defer close(closeChannel)

	testTask := MockSendMqttTask{
		BaseTask: BaseTask{
			ChannelIn:    inChannel,
			ChannelOut:   outChannel,
			ChannelClose: closeChannel,
		},
		Topic:   "testtopic",
		MqttUrl: "localhost",
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

func Benchmark_SendMqttTask(b *testing.B) {
	for index := 0; index < b.N; index++ {

		inChannel := make(chan string)
		//defer close(inChannel)

		outChannel := make(chan string)
		//defer close(outChannel)

		closeChannel := make(chan string)
		//defer close(closeChannel)

		testTask := MockSendMqttTask{
			BaseTask: BaseTask{
				ChannelIn:    inChannel,
				ChannelOut:   outChannel,
				ChannelClose: closeChannel,
			},
			Topic:   "testtopic",
			MqttUrl: "localhost",
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
