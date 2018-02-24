package tasks

import (
	"fmt"
	"strconv"
	"testing"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/clients"
)

type MockSendInfluxTask struct {
	BaseTask
	Topic  string `json:"topic" bson:"topic"`
	Url    string `json:"url" bson:"url"`
	client *clients.MockInfluxClient
}

func (t *MockSendInfluxTask) Execute() {

	var err error

	//connecting channel between closeChannel and this taks goroutine
	go func() {
		<-t.ChannelClose
		//fmt.Println("closing SendInfluxTask")
		close(t.ChannelOut)
	}()

	t.client, err = clients.NewMockInfluxClient()
	if err != nil {
		fmt.Println(err.Error)
	}

	// Create a point and add to batch
	tags := map[string]string{"name": "somemeasurement"}
	values := map[string]interface{}{
		"value": 0,
	}
	valueFloat := float64(0)

	for value := range t.ChannelIn {

		if value == "close" {
			t.ChannelOut <- value
		} else {

			valueFloat, err = strconv.ParseFloat(value, 64)
			if err != nil {
				fmt.Println(err.Error)
			}

			//valueFloat = valueFloat

			values["value"] = valueFloat

			t.client.Insert(t.Topic, tags, values)

			//*****************
			t.ChannelOut <- value
		}
	}

}

func Test_SendTickStackTask(t *testing.T) {

	inChannel := make(chan string)
	//defer close(inChannel)

	outChannel := make(chan string)
	//defer close(outChannel)

	closeChannel := make(chan string)
	//defer close(closeChannel)

	testTask := MockSendInfluxTask{
		BaseTask: BaseTask{
			ChannelIn:    inChannel,
			ChannelOut:   outChannel,
			ChannelClose: closeChannel,
		},
		Topic: "testtopic",
		Url:   "http://localhost:8086",
	}

	go testTask.Execute()

	//WRITE INTO INCHANNEL for task
	go func() {
		inChannel <- "5"
	}()

	// THEN
	expected := "5"
	found := <-outChannel // blocks until the output has contents

	if found != expected {
		t.Errorf("Expected %s, found %s", expected, found)
	}
}

func Benchmark_SendTickStackTask(b *testing.B) {
	for index := 0; index < b.N; index++ {

		inChannel := make(chan string)
		//defer close(inChannel)

		outChannel := make(chan string)
		//defer close(outChannel)

		closeChannel := make(chan string)
		//defer close(closeChannel)

		testTask := MockSendInfluxTask{
			BaseTask: BaseTask{
				ChannelIn:    inChannel,
				ChannelOut:   outChannel,
				ChannelClose: closeChannel,
			},
			Topic: "testtopic",
			Url:   "http://localhost:8086",
		}

		go testTask.Execute()

		//WRITE INTO INCHANNEL for task
		go func() {

			for index := 0; index < 1000; index++ {
				inChannel <- "5"
			}

			inChannel <- "close"

		}()

		// THEN
		expected := "5"
		for found := range outChannel {
			if found == "close" {
				closeChannel <- "close"
			}
			if found != expected {
			}
		}

	}
}
