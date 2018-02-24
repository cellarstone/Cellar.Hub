package workflows

import (
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/tasks"
)

type Test1Workflow struct {
	BaseWorkflow
	Ct1_channelIn        chan string
	Ct1_channelStatus    chan string
	Ct1_channelClose     chan string
	Ct2_channelIn        chan string
	Ct2_channelStatus    chan string
	Ct2_channelClose     chan string
	Ct3_channelIn        chan string
	Ct3_channelOut       chan string
	Ct3_channelStatus    chan string
	Ct3_channelClose     chan string
	Trigger_channelClose chan string
}

type Params_Test1Workflow struct {
	WebsocketRoom string `json:"websocketroom"`
	MqttTopic     string `json:"mqtttopic"`
	InfluxTopic   string `json:"influxtopic"`
}

func CreateAndRun_Test1Workflow(params interface{}, tags []string) *Test1Workflow {

	jsonBytes, err := json.Marshal(params)
	if err != nil {
		fmt.Println(err)
	}

	wParams := &Params_Test1Workflow{}
	parseErr := json.Unmarshal(jsonBytes, wParams)
	if parseErr != nil {
		fmt.Println("JSON Error")
		fmt.Println(parseErr)
	}

	//wParams := params.(Params_Test1Workflow)

	//CHANNELS --------------------------------------
	ct1_channelIn := make(chan string)
	ct1_channelStatus := make(chan string)
	ct1_channelClose := make(chan string)

	ct2_channelIn := make(chan string)
	ct2_channelStatus := make(chan string)
	ct2_channelClose := make(chan string)

	ct3_channelIn := make(chan string)
	ct3_channelOut := make(chan string)
	ct3_channelStatus := make(chan string)
	ct3_channelClose := make(chan string)

	//TASKS --------------------------------------
	ct1 := tasks.SendToWebsocketTask{
		BaseTask: tasks.BaseTask{
			ChannelIn:     ct1_channelIn,
			ChannelOut:    ct2_channelIn,
			ChannelStatus: ct1_channelStatus,
			ChannelClose:  ct1_channelClose,
		},
		Url:  websocketsurl,
		Room: wParams.WebsocketRoom,
	}

	ct2 := tasks.SendMqttTask{
		BaseTask: tasks.BaseTask{
			ChannelIn:     ct2_channelIn,
			ChannelOut:    ct3_channelIn,
			ChannelStatus: ct2_channelStatus,
			ChannelClose:  ct2_channelClose,
		},
		MqttUrl: mqtturl,
		Topic:   wParams.MqttTopic,
	}

	ct3 := tasks.SendInfluxTask{
		BaseTask: tasks.BaseTask{
			ChannelIn:     ct3_channelIn,
			ChannelOut:    ct3_channelOut,
			ChannelStatus: ct3_channelStatus,
			ChannelClose:  ct3_channelClose,
		},
		Url:   influxurl,
		Topic: wParams.InfluxTopic,
	}

	go func() {
		defer recoverPanic("test1")
		ct1.Execute()
	}()
	go func() {
		defer recoverPanic("test1")
		ct2.Execute()
	}()
	go func() {
		defer recoverPanic("test1")
		ct3.Execute()
	}()

	//READER --------------------------------------
	go func() {
		//reader withou println
		//<-ct3_channelOut

		//reader with println
		for item := range ct3_channelOut {
			item = item
		}
	}()

	return &Test1Workflow{
		BaseWorkflow: BaseWorkflow{
			Params: wParams,
			Tags:   tags,
		},
		Ct1_channelIn:     ct1_channelIn,
		Ct1_channelStatus: ct1_channelStatus,
		Ct1_channelClose:  ct1_channelClose,
		Ct2_channelIn:     ct2_channelIn,
		Ct2_channelStatus: ct2_channelStatus,
		Ct2_channelClose:  ct2_channelClose,
		Ct3_channelIn:     ct3_channelIn,
		Ct3_channelStatus: ct3_channelStatus,
		Ct3_channelOut:    ct3_channelOut,
		Ct3_channelClose:  ct3_channelClose,
	}

}

func (w Test1Workflow) Check() string {

	result := ""

	var mutex sync.Mutex
	var wg sync.WaitGroup

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

	//CT2
	wg.Add(1)
	go func() {
		// tempR := <-w.Ct2_channelStatus
		// if tempR != "OK" {
		// 	result += "Ct2_channelStatus - OK \n"
		// }
		// result += "Ct2_channelStatus - " + tempR + " \n"
		// wg.Done()
		timeout := make(chan bool, 1)
		go func() {
			time.Sleep(1 * time.Second)
			timeout <- true
		}()

		select {
		case tempR := <-w.Ct2_channelStatus:
			mutex.Lock()
			result += "Ct2_channelStatus - " + tempR + " \n"
			mutex.Unlock()
			wg.Done()
		case <-timeout:
			mutex.Lock()
			result += "Ct2_channelStatus - TIMEOUT \n"
			mutex.Unlock()
			wg.Done()
		}

	}()
	w.Ct2_channelStatus <- "check status"

	//CT3
	wg.Add(1)
	go func() {
		timeout := make(chan bool, 1)
		go func() {
			time.Sleep(1 * time.Second)
			timeout <- true
		}()

		select {
		case tempR := <-w.Ct3_channelStatus:
			mutex.Lock()
			result += "Ct3_channelStatus - " + tempR + " \n"
			mutex.Unlock()
			wg.Done()
		case <-timeout:
			mutex.Lock()
			result += "Ct3_channelStatus - TIMEOUT \n"
			mutex.Unlock()
			wg.Done()
		}

	}()
	w.Ct3_channelStatus <- "check status"

	wg.Wait()
	return result
}

func (w Test1Workflow) Close() {
	go func() { w.Trigger_channelClose <- "close" }()
	go func() { w.Ct1_channelClose <- "close" }()
	go func() { w.Ct2_channelClose <- "close" }()
	go func() { w.Ct3_channelClose <- "close" }()
}

func (w Test1Workflow) GetType() string {
	return "test1"
}

func (w Test1Workflow) GetId() string {
	return w.BaseWorkflow.Id
}
