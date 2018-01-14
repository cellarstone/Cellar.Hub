package send

import (
	"encoding/json"
	"flag"
	"fmt"
	"net/url"

	abs "github.com/cellarstone/Cellar.Hub/Core/Workflow/src/abstraction"
	"github.com/gorilla/websocket"
)

//**********************************
//TASK - Send Websocket
//**********************************
type SendToWebsocketTask struct {
	abs.BaseTask
	Url  string `json:"url" bson:"url"`
	Room string `json:"room" bson:"room"`
}

func (t *SendToWebsocketTask) Execute() error {

	addr := flag.String("addr", t.Url, "http service address")

	u := url.URL{Scheme: "ws", Host: *addr, Path: "/ws/" + t.Room}
	//fmt.Println("connecting to %s", u.String())

	c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		panic(err)
	}
	defer c.Close()

	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING

		// data := {
		// 	name: "value",
		// 	data: value,
		// }

		mapD := map[string]string{
			"name": "message",
			"data": value,
		}
		mapB, _ := json.Marshal(mapD)
		mapC := string(mapB)

		err := c.WriteMessage(websocket.TextMessage, []byte(mapC))
		if err != nil {
			fmt.Println("error in write message to websocket :", err)
		}

		// fmt.Println("SendToWebsocketTask value - " + value)
		//*****************
		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *SendToWebsocketTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	//*****************
	// DOING SOMETHING
	// log.Debug("SendToWebsocketTask parallel value - " + value)
	//*****************
	t.State = "completed"
	return nil
}
