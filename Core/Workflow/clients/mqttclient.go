package clients

import (
	"fmt"

	"github.com/yosssi/gmq/mqtt"
	"github.com/yosssi/gmq/mqtt/client"
)

// ---------------------------------------
// INTERFACE
// ---------------------------------------
type MqttClient interface {
	Publish(topic string, message string) error
	// Subscribe(topic string, handler func(topicName, message []byte)) error
}

// ---------------------------------------
// REAL IMPLEMENTATION
// ---------------------------------------
type CellarMqttClient struct {
	Client *client.Client
}

func NewCellarMqttClient(url string) (*CellarMqttClient, error) {

	// Create an MQTT Client.
	cli := client.New(&client.Options{
		// Define the processing of the error handler.
		ErrorHandler: func(err error) {
			fmt.Println(err)
		},
	})

	// Terminate the Client.
	defer cli.Terminate()

	// Connect to the MQTT Server.
	err := cli.Connect(&client.ConnectOptions{
		Network:  "tcp",
		Address:  url + ":1883",
		ClientID: []byte(RandStringBytesMaskImprSrc(5)),
	})
	if err != nil {
		return nil, err
	}

	return &CellarMqttClient{
		Client: cli,
	}, nil
}

var err error

func (c *CellarMqttClient) Publish(topic string, message string) error {
	err = c.Client.Publish(&client.PublishOptions{
		QoS:       mqtt.QoS0,
		TopicName: []byte(topic),
		Message:   []byte(message),
	})
	if err != nil {
		return err
	}
	return nil
}

// func (c *CellarMqttClient) Subscribe(topic string, handler func(topicName, message []byte)) error {
// 	err := c.Client.Subscribe(&client.SubscribeOptions{
// 		SubReqs: []*client.SubReq{
// 			&client.SubReq{
// 				TopicFilter: []byte(topic),
// 				QoS:         mqtt.QoS1,
// 				// Define the processing of the message handler.
// 				Handler: handler,
// 			},
// 		},
// 	})
// 	if err != nil {
// 		return err
// 	}
// 	return nil
// }
