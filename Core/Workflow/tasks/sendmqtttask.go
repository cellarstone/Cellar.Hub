package tasks

import (
	"fmt"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/clients"
)

//**********************************
//TASK - Send mqtt
//**********************************
type SendMqttTask struct {
	BaseTask
	Topic   string `json:"topic" bson:"topic"`
	MqttUrl string `json:"mqtturl" bson:"mqtturl"`
	client  *clients.CellarMqttClient
}

func (t *SendMqttTask) Execute() {
	// defer t.client.Client.Terminate()
	// defer close(t.ChannelOut)
	// defer close(t.ChannelStatus)

	// // CLOSE CHANNEL
	// go func() {
	// 	<-t.ChannelClose
	// 	//fmt.Println("closing SendMqttTask")
	// 	t.client.Client.Terminate()
	// 	close(t.ChannelOut)
	// }()

	// //STATUS CHANNEL
	// go func() {
	// 	for _ = range t.ChannelStatus {
	// 		t.ChannelStatus <- "OK"
	// 	}
	// }()

	var err error
	t.client, err = clients.NewCellarMqttClient(t.MqttUrl)
	if err != nil {
		fmt.Println(err.Error)
	}
	//defer clientMqtt.Client.Terminate()

	// for value := range t.ChannelIn {

	// 	t.client.Publish(t.Topic, value)

	// 	// value += "3333333"

	// 	//fmt.Println("SendMqttTask value - " + value)
	// 	//*****************
	// 	t.ChannelOut <- value
	// }

	for {
		select {
		case tempR := <-t.ChannelIn:
			t.client.Publish(t.Topic, tempR)
			t.ChannelOut <- tempR
		case _ = <-t.ChannelStatus:
			t.ChannelStatus <- "OK"
		case _ = <-t.ChannelClose:
			close(t.ChannelOut)
		}
	}

}
