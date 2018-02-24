package triggers

import (
	"encoding/json"
	"fmt"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/clients"
	"github.com/yosssi/gmq/mqtt"
	"github.com/yosssi/gmq/mqtt/client"
)

type MqttTrigger struct {
	BaseTrigger
	Url    string
	Topic  string
	client *clients.CellarMqttClient
}

type Params_MqttTrigger struct {
	Topic string `json:"topic"`
}

func RunNewMqttTrigger(channelOut chan string, params interface{}) (channelClose chan string) {
	jsonBytes, err := json.Marshal(params)
	if err != nil {
		fmt.Println(err)
	}

	wParams := &Params_MqttTrigger{}
	parseErr := json.Unmarshal(jsonBytes, wParams)
	if parseErr != nil {
		fmt.Println("JSON Error")
		fmt.Println(parseErr)
	}

	//CHANNELS --------------------------------------
	trigger_channelClose := make(chan string)

	fmt.Println(wParams.Topic)

	//TRIGGER --------------------------------------
	trigger := MqttTrigger{
		BaseTrigger: BaseTrigger{
			ChannelOut:   channelOut,
			ChannelClose: trigger_channelClose,
		},
		Url:   mqtturl,
		Topic: wParams.Topic,
	}

	go trigger.Run()

	return trigger_channelClose
}

// func (t *MqttTrigger) Create(channnelOutput chan string) {
// 	t.BaseTrigger.ChannelClose = make(chan string)
// 	t.BaseTrigger.ChannelOut = channnelOutput
// }

func (t *MqttTrigger) Run() {

	var err error
	t.client, err = clients.NewCellarMqttClient(t.Url)
	if err != nil {
		fmt.Println(err.Error)
	}

	go func() {
		<-t.BaseTrigger.ChannelClose
		t.client.Client.Terminate()
		close(t.ChannelOut)
	}()

	// t.client.Subscribe(t.Topic, t.processMessage)

	err = t.client.Client.Subscribe(&client.SubscribeOptions{
		SubReqs: []*client.SubReq{
			&client.SubReq{
				TopicFilter: []byte(t.Topic),
				QoS:         mqtt.QoS1,
				// Define the processing of the message handler.
				Handler: func(topicName, message []byte) {
					t.BaseTrigger.ChannelOut <- string(message)
				},
			},
		},
	})
	if err != nil {
		fmt.Println(err.Error)
	}

	// go func() {

	// loop:
	// 	for {

	// 		select {
	// 		case sendmessage := <-t.BaseTrigger.ChannelClose:
	// 			fmt.Println("mqtttrigger.go " + sendmessage)
	// 			t.client.Client.Terminate()
	// 			close(t.ChannelOut)
	// 			break loop
	// 		default:

	// 			//send value to the channel
	// 			//do nothing
	// 		}
	// 	}
	// }()
}

// func (t *MqttTrigger) processMessage(topicName, message []byte) {

// 	// topic := string(topicName)
// 	// senzorID := strings.Split(topic, "/")[0]
// 	// measurement := strings.Split(topic, "/")[1]
// 	value := string(message)
// 	//fmt.Println(value)

// 	t.BaseTrigger.ChannelOut <- value
// }

// func (t *TimeRepeaterTrigger) Close() {
// 	t.BaseTrigger.ChannelClose <- "close"
// }
