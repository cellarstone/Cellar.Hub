package tasks

import (
	"fmt"
	"strconv"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/clients"
)

//**********************************
//TASK - Send influx db
//**********************************
type SendInfluxTask struct {
	BaseTask
	Topic  string `json:"topic" bson:"topic"`
	Url    string `json:"url" bson:"url"`
	client *clients.CellarInfluxClient
}

func (t *SendInfluxTask) Execute() {

	//connecting channel between closeChannel and this taks goroutine
	// go func() {
	// 	<-t.ChannelClose
	// 	//fmt.Println("closing SendInfluxTask")
	// 	(*t.client.Client).Close()
	// 	close(t.ChannelOut)
	// }()

	// //STATUS CHANNEL
	// go func() {
	// 	for _ = range t.ChannelStatus {
	// 		t.ChannelStatus <- "OK"
	// 	}
	// }()

	var err error
	t.client, err = clients.NewCellarInfluxClient(t.Url)
	if err != nil {
		fmt.Println(err.Error)
	}

	// Create a point and add to batch
	tags := map[string]string{"name": "somemeasurement"}
	values := map[string]interface{}{
		"value": 0,
	}
	valueFloat := float64(0)

	// for value := range t.ChannelIn {

	// 	valueFloat, err = strconv.ParseFloat(value, 64)
	// 	if err != nil {
	// 		fmt.Println(err.Error)
	// 	}
	// 	values["value"] = valueFloat

	// 	t.client.Insert(t.Topic, tags, values)

	// 	//*****************
	// 	t.ChannelOut <- value
	// }

	for {
		select {
		case tempR := <-t.ChannelIn:
			valueFloat, err = strconv.ParseFloat(tempR, 64)
			if err != nil {
				fmt.Println(err.Error)
			}
			values["value"] = valueFloat

			t.client.Insert(t.Topic, tags, values)
			t.ChannelOut <- tempR
		case _ = <-t.ChannelStatus:
			t.ChannelStatus <- "OK"
		case _ = <-t.ChannelClose:
			close(t.ChannelOut)
		}
	}

}
