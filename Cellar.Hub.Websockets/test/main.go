package main

import (
	"flag"
	"log"
	"math/rand"
	"net/url"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
)

func main() {

	addr := flag.String("addr", "localhost:8080", "http service address")

	u := url.URL{Scheme: "ws", Host: *addr, Path: "/ws/" + "room1"}
	log.Printf("connecting to %s", u.String())

	c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer c.Close()

	for {

		time.Sleep(time.Duration(1) * time.Second)
		randomNumberFloat := rand.Float64() * 1000
		randomNumberString := strconv.FormatFloat(randomNumberFloat, 'E', -1, 64)
		log.Println("Writing:", randomNumberString)

		err := c.WriteMessage(websocket.TextMessage, []byte(randomNumberString))
		if err != nil {
			log.Println("write:", err)
			// return
		}

	}

}
