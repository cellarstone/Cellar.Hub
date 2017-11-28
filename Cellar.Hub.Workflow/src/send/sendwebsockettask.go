package send

import (

	// abs "../abstraction"
	"flag"
	"fmt"
	"net/url"

	abs "github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
	"github.com/gorilla/websocket"
	// log "github.com/sirupsen/logrus"
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
	// log.Printf("connecting to %s", u.String())

	c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		panic(err)
	}
	defer c.Close()

	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING

		err := c.WriteMessage(websocket.TextMessage, []byte(value))
		if err != nil {
			fmt.Println("error in write message to websocket :", err)
			// return
		}

		fmt.Println("SendToWebsocketTask value - " + value)
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
