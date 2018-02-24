package mqtt

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/yosssi/gmq/mqtt"
	"github.com/yosssi/gmq/mqtt/client"
)

// create type that return function.
// this will be needed in main.go
// type ServiceMiddleware func(Service) Service

type Service interface {
	PublishToMqtt(topic string, value string) error
}

type MqttService struct {
	Mqtturl string
}

func NewService(mqtturl string) *MqttService {
	return &MqttService{
		Mqtturl: mqtturl,
	}
}

func (s MqttService) PublishToMqtt(topic string, value string) error {

	clientID := RandStringBytesMaskImprSrc(10)

	//--------------------------------------------------
	//MQTT ---------------------------------------------
	//--------------------------------------------------

	// Create an MQTT Client.
	cli := client.New(&client.Options{
		// Define the processing of the error handler.
		ErrorHandler: func(err error) {
			//low-level exception logging
			fmt.Println(err.Error())
		},
	})

	// Terminate the Client.
	defer cli.Terminate()

	// Connect to the MQTT Server.
	err2 := cli.Connect(&client.ConnectOptions{
		Network:  "tcp",
		Address:  s.Mqtturl + ":1883",
		ClientID: []byte(clientID),
	})
	if err2 != nil {
		//low-level exception logging
		return err2
	}

	// Publish a message.
	err := cli.Publish(&client.PublishOptions{
		QoS:       mqtt.QoS1,
		TopicName: []byte(topic),
		Message:   []byte(value),
	})
	if err != nil {
		return err
	}

	return nil
}

//---------------------------------------------------------
//HELPERS -------------------------------------------------
//---------------------------------------------------------

var src = rand.NewSource(time.Now().UnixNano())

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const (
	letterIdxBits = 6                    // 6 bits to represent a letter index
	letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
	letterIdxMax  = 63 / letterIdxBits   // # of letter indices fitting in 63 bits
)

func RandStringBytesMaskImprSrc(n int) string {
	b := make([]byte, n)
	// A src.Int63() generates 63 random bits, enough for letterIdxMax characters!
	for i, cache, remain := n-1, src.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = src.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
			b[i] = letterBytes[idx]
			i--
		}
		cache >>= letterIdxBits
		remain--
	}

	return string(b)
}
