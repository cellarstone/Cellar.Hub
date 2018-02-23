package clients

import (
	"encoding/json"
	"fmt"
	"net/url"

	"github.com/gorilla/websocket"
)

// ---------------------------------------
// INTERFACE
// ---------------------------------------
type WebsocketClient interface {
	Send(value string) error
}

// ---------------------------------------
// REAL IMPLEMENTATION
// ---------------------------------------
type CellarWebsocketClient struct {
	Client *websocket.Conn
	url    string
}

func NewCellarWebsocketClient(socketurl string, room string) (*CellarWebsocketClient, error) {
	// addr := flag.String("addr", socketurl, "http service address")
	// flag.Parse()

	// fmt.Println(addr)

	u := url.URL{Scheme: "ws", Host: socketurl, Path: "/ws/" + room}
	//fmt.Println("connecting to %s", u.String())

	c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		return nil, err
	}

	return &CellarWebsocketClient{
		Client: c,
		url:    socketurl,
	}, nil
}

var mapD map[string]string
var mapB []byte
var mapC string

func (c *CellarWebsocketClient) Send(value string) error {
	mapD = map[string]string{
		"name": "message",
		"data": value,
	}
	mapB, _ = json.Marshal(mapD)
	mapC = string(mapB)

	err = c.Client.WriteMessage(websocket.TextMessage, []byte(mapC))
	if err != nil {
		fmt.Println("error in write message to websocket :", err)
	}
	return nil
}
