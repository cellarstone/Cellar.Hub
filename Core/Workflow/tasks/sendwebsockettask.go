package tasks

import (
	"fmt"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/clients"
)

//**********************************
//TASK - Send Websocket
//**********************************
type SendToWebsocketTask struct {
	BaseTask
	Url    string `json:"url" bson:"url"`
	Room   string `json:"room" bson:"room"`
	client *clients.CellarWebsocketClient
}

func (t *SendToWebsocketTask) Execute() {

	// go func() {
	// 	<-t.ChannelClose
	// 	//fmt.Println("closing SendToWebsocketTask")
	// 	t.client.Client.Close()
	// 	close(t.ChannelOut)
	// }()

	// //STATUS CHANNEL
	// go func() {
	// 	for _ = range t.ChannelStatus {
	// 		t.ChannelStatus <- "OK"
	// 	}
	// }()

	var err error
	t.client, err = clients.NewCellarWebsocketClient(t.Url, t.Room)
	if err != nil {
		fmt.Println(err.Error)
	}
	//defer clientWebsocket.Client.Close()

	// for value := range t.ChannelIn {

	// 	t.client.Send(value)

	// 	t.ChannelOut <- value
	// }

	for {
		select {
		case tempR := <-t.ChannelIn:
			t.client.Send(tempR)
			t.ChannelOut <- tempR
		case _ = <-t.ChannelStatus:
			t.ChannelStatus <- "OK"
		case _ = <-t.ChannelClose:
			close(t.ChannelOut)
		}
	}
}
