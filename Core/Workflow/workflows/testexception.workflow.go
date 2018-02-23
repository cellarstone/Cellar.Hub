package workflows

import (
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/tasks"
)

type TestExceptionWorkflow struct {
	BaseWorkflow
	Ct1_channelIn        chan string
	Ct1_channelStatus    chan string
	Ct1_channelClose     chan string
	Ct2_channelIn        chan string
	Ct2_channelOut       chan string
	Ct2_channelStatus    chan string
	Ct2_channelClose     chan string
	Trigger_channelClose chan string
}

type Params_TestExceptionWorkflow struct {
	MessageCount int    `json:"messagecount" bson:"messagecount"`
	MqttTopic    string `json:"mqtttopic"`
}

func CreateAndRun_TestExceptionWorkflow(params interface{}, tags []string) *TestExceptionWorkflow {

	jsonBytes, err := json.Marshal(params)
	if err != nil {
		fmt.Println(err)
	}

	wParams := &Params_TestExceptionWorkflow{}
	parseErr := json.Unmarshal(jsonBytes, wParams)
	if parseErr != nil {
		fmt.Println("JSON Error")
		fmt.Println(parseErr)
	}

	//wParams := params.(Params_TestExceptionWorkflow)

	//CHANNELS --------------------------------------
	ct1_channelIn := make(chan string)
	ct1_channelStatus := make(chan string)
	ct1_channelClose := make(chan string)

	ct2_channelIn := make(chan string)
	ct2_channelOut := make(chan string)
	ct2_channelStatus := make(chan string)
	ct2_channelClose := make(chan string)

	//TASKS --------------------------------------
	ct1 := tasks.ExceptionTask{
		BaseTask: tasks.BaseTask{
			ChannelIn:     ct1_channelIn,
			ChannelOut:    ct2_channelIn,
			ChannelStatus: ct1_channelStatus,
			ChannelClose:  ct1_channelClose,
		},
		MessageCount: wParams.MessageCount,
	}

	ct2 := tasks.SendMqttTask{
		BaseTask: tasks.BaseTask{
			ChannelIn:     ct2_channelIn,
			ChannelOut:    ct2_channelOut,
			ChannelStatus: ct2_channelStatus,
			ChannelClose:  ct2_channelClose,
		},
		MqttUrl: mqtturl,
		Topic:   wParams.MqttTopic,
	}

	go func() {
		defer recoverPanic("testexception")
		ct1.Execute()
	}()
	go func() {
		defer recoverPanic("testexception")
		ct2.Execute()
	}()

	//READER --------------------------------------
	go func() {
		//reader withou println
		//<-ct1_channelOut

		//reader with println
		for item := range ct2_channelOut {
			//fmt.Println(name, " - ", item)
			item = item
		}
	}()

	return &TestExceptionWorkflow{
		BaseWorkflow: BaseWorkflow{
			Params: wParams,
			Tags:   tags,
		},
		Ct1_channelIn:     ct1_channelIn,
		Ct1_channelStatus: ct1_channelStatus,
		Ct1_channelClose:  ct1_channelClose,
		Ct2_channelIn:     ct2_channelIn,
		Ct2_channelOut:    ct2_channelOut,
		Ct2_channelStatus: ct2_channelStatus,
		Ct2_channelClose:  ct2_channelClose,
	}

}

func (w TestExceptionWorkflow) Check() string {

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

	//CT2
	wg.Add(1)
	go func() {
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

	wg.Wait()
	return result
}

func (w TestExceptionWorkflow) Close() {
	go func() { w.Trigger_channelClose <- "close" }()
	go func() { w.Ct1_channelClose <- "close" }()
	go func() { w.Ct2_channelClose <- "close" }()
}

func (w TestExceptionWorkflow) GetType() string {
	return "testexception"
}

func (w TestExceptionWorkflow) GetId() string {
	return w.BaseWorkflow.Id
}
