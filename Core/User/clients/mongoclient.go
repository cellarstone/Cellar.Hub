package clients

import (
	mgo "gopkg.in/mgo.v2"
)

// ---------------------------------------
// INTERFACE
// ---------------------------------------
type MongoClient interface {
	//Publish(topic string, message string) error
	// Subscribe(topic string, handler func(topicName, message []byte)) error
}

// ---------------------------------------
// REAL IMPLEMENTATION
// ---------------------------------------
type CellarMongoClient struct {
	Url     string
	Session *mgo.Session
}

func NewCellarMongoClient(url string) (result *CellarMongoClient, err error) {

	session, err := mgo.Dial(url)
	if err != nil {
		return nil, err
	}

	return &CellarMongoClient{
		Url:     url,
		Session: session,
	}, nil
}

// var err error

// func (c *CellarMqttClient) Publish(topic string, message string) error {
// 	err = c.Client.Publish(&client.PublishOptions{
// 		QoS:       mqtt.QoS0,
// 		TopicName: []byte(topic),
// 		Message:   []byte(message),
// 	})
// 	if err != nil {
// 		return err
// 	}
// 	return nil
// }

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
