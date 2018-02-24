package triggers

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

type TimeRepeaterTrigger struct {
	BaseTrigger
	Seconds int
}

type Params_TimeRepeaterTrigger struct {
	Seconds string `json:"seconds"`
}

func RunNewTimeRepeaterTrigger(channelOut chan string, params interface{}) (channelClose chan string) {
	jsonBytes, err := json.Marshal(params)
	if err != nil {
		fmt.Println(err)
	}

	wParams := &Params_TimeRepeaterTrigger{}
	parseErr := json.Unmarshal(jsonBytes, wParams)
	if parseErr != nil {
		fmt.Println("JSON Error")
		fmt.Println(parseErr)
	}

	seconds, err := strconv.Atoi(wParams.Seconds)

	//CHANNELS --------------------------------------
	trigger_channelClose := make(chan string)

	//TRIGGER --------------------------------------
	trigger := TimeRepeaterTrigger{
		BaseTrigger: BaseTrigger{
			ChannelOut:   channelOut,
			ChannelClose: trigger_channelClose,
		},
		Seconds: seconds,
	}

	go trigger.Run()

	return trigger_channelClose
}

// func (t *TimeRepeaterTrigger) Create(channnelOutput chan string) {
// 	t.BaseTrigger.ChannelClose = make(chan string)
// 	t.BaseTrigger.ChannelOut = channnelOutput
// }

func (t *TimeRepeaterTrigger) Run() {
	go func() {

		var randomNumberFloat float64
		var randomNumberString string

	loop:
		for {
			time.Sleep(time.Duration(t.Seconds) * time.Second)
			randomNumberFloat = rand.Float64() * 1000
			randomNumberString = strconv.FormatFloat(randomNumberFloat, 'E', -1, 64)

			//fmt.Println(randomNumberString)

			select {
			case sendmessage := <-t.BaseTrigger.ChannelClose:
				fmt.Println("timerepeatertrigger.go " + sendmessage)
				close(t.ChannelOut)
				break loop
			default:

				//send value to the channel
				t.BaseTrigger.ChannelOut <- randomNumberString
			}
		}
	}()
}

// func (t *TimeRepeaterTrigger) Close() {
// 	t.BaseTrigger.ChannelClose <- "close"
// }
