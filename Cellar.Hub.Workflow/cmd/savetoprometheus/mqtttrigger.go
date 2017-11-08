package main

import (
	"fmt"
	"log"
	"os"

	"github.com/yosssi/gmq/mqtt"
	"github.com/yosssi/gmq/mqtt/client"
)

func RunMqttTrigger(address string, clientID string, topic string) {
	//--------------------------------------------------
	//MQTT ---------------------------------------------
	//--------------------------------------------------

	// Create an MQTT Client.
	cli := client.New(&client.Options{
		// Define the processing of the error handler.
		ErrorHandler: func(err error) {
			//low-level exception logging
			fmt.Println(err)
			log.Fatalln(err)
			os.Exit(1) // Exit a program
		},
	})

	// Terminate the Client.
	defer cli.Terminate()

	// Connect to the MQTT Server.
	err2 := cli.Connect(&client.ConnectOptions{
		Network:  "tcp",
		Address:  address,
		ClientID: []byte(clientID),
	})
	if err2 != nil {
		//low-level exception logging
		fmt.Println(err2)
		os.Exit(1) // Exit a program
	}

	// Subscribe to topics.
	err2 = cli.Subscribe(&client.SubscribeOptions{
		SubReqs: []*client.SubReq{
			&client.SubReq{
				TopicFilter: []byte(topic),
				QoS:         mqtt.QoS1,
				// Define the processing of the message handler.
				Handler: processMessage,
			},
		},
	})
	if err2 != nil {
		//low-level exception logging
		fmt.Println(err2)
		os.Exit(1) // Exit a program
	}
}

func processMessage(topicName, message []byte) {

	// topic := string(topicName)
	// senzorID := strings.Split(topic, "/")[0]
	// measurement := strings.Split(topic, "/")[1]
	value := string(message)

	workflowIn <- value
}
