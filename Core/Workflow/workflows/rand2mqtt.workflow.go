package workflows

import (
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/tasks"
)

type Rand2MqttWorkflow struct {
	BaseWorkflow
	Ct1_channelIn        chan string
	Ct1_channelOut       chan string
	Ct1_channelStatus    chan string
	Ct1_channelClose     chan string
	Trigger_channelClose chan string
}

type Params_Rand2MqttWorkflow struct {
	MqttTopic string `json:"mqtttopic"`
}

func CreateAndRun_Rand2MqttWorkflow(params interface{}, tags []string) *Rand2MqttWorkflow {

	jsonBytes, err := json.Marshal(params)
	if err != nil {
		fmt.Println(err)
	}

	wParams := &Params_Rand2MqttWorkflow{}
	parseErr := json.Unmarshal(jsonBytes, wParams)
	if parseErr != nil {
		fmt.Println("JSON Error")
		fmt.Println(parseErr)
	}

	//wParams := params.(Params_Rand2MqttWorkflow)

	//CHANNELS --------------------------------------
	ct1_channelIn := make(chan string)
	ct1_channelOut := make(chan string)
	ct1_channelStatus := make(chan string)
	ct1_channelClose := make(chan string)

	//TASKS --------------------------------------
	ct1 := tasks.SendMqttTask{
		BaseTask: tasks.BaseTask{
			ChannelIn:     ct1_channelIn,
			ChannelOut:    ct1_channelOut,
			ChannelStatus: ct1_channelStatus,
			ChannelClose:  ct1_channelClose,
		},
		MqttUrl: mongourl,
		Topic:   wParams.MqttTopic,
	}

	go func() {
		defer recoverPanic("rand2mqtt")
		ct1.Execute()
	}()

	//READER --------------------------------------
	go func() {
		//reader withou println
		//<-ct1_channelOut

		//reader with println
		for item := range ct1_channelOut {
			//fmt.Println(name, " - ", item)
			item = item
		}
	}()

	return &Rand2MqttWorkflow{
		BaseWorkflow: BaseWorkflow{
			Params: wParams,
			Tags:   tags,
		},
		Ct1_channelIn:     ct1_channelIn,
		Ct1_channelOut:    ct1_channelOut,
		Ct1_channelStatus: ct1_channelStatus,
		Ct1_channelClose:  ct1_channelClose,
	}

}

func (w Rand2MqttWorkflow) Check() string {

	result := ""

	var wg sync.WaitGroup
	var mutex sync.Mutex

	//CT1
	wg.Add(1)
	go func() {

		timeout := make(chan bool, 1)
		go func() {
			time.Sleep(1 * time.Second)
			timeout <- true
		}()

		select {
		case tempR := <-w.Ct1_channelStatus:
			mutex.Lock()
			result += "Ct1_channelStatus - " + tempR + " \n"
			mutex.Unlock()
			wg.Done()
		case <-timeout:
			mutex.Lock()
			result += "Ct1_channelStatus - TIMEOUT \n"
			mutex.Unlock()
			wg.Done()
		}

	}()
	w.Ct1_channelStatus <- "check status"

	wg.Wait()
	return result
}

func (w Rand2MqttWorkflow) Close() {
	go func() { w.Trigger_channelClose <- "close" }()
	go func() { w.Ct1_channelClose <- "close" }()
}

func (w Rand2MqttWorkflow) GetType() string {
	return "rand2mqtt"
}

func (w Rand2MqttWorkflow) GetId() string {
	return w.BaseWorkflow.Id
}
