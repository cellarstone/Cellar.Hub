package workflows

import (
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/tasks"
)

type DefaultSenzorWorkflow struct {
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

type Params_DefaultSenzorWorkflow struct {
	WebsocketRoom string `json:"websocketroom"`
	InfluxTopic   string `json:"influxtopic"`
}

func CreateAndRun_DefaultSenzorWorkflow(params interface{}, tags []string) *DefaultSenzorWorkflow {

	jsonBytes, err := json.Marshal(params)
	if err != nil {
		fmt.Println(err)
	}

	wParams := &Params_DefaultSenzorWorkflow{}
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
	ct2_channelOut := make(chan string)
	ct2_channelStatus := make(chan string)
	ct2_channelClose := make(chan string)

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

	ct2 := tasks.SendInfluxTask{
		BaseTask: tasks.BaseTask{
			ChannelIn:     ct2_channelIn,
			ChannelOut:    ct2_channelOut,
			ChannelStatus: ct2_channelStatus,
			ChannelClose:  ct2_channelClose,
		},
		Url:   influxurl,
		Topic: wParams.InfluxTopic,
	}

	go func() {
		defer recoverPanic("defaultsenzor")
		ct1.Execute()
	}()
	go func() {
		defer recoverPanic("defaultsenzor")
		ct2.Execute()
	}()

	//READER --------------------------------------
	go func() {
		//reader withou println
		//<-ct3_channelOut

		//reader with println
		for item := range ct2_channelOut {
			item = item
		}
	}()

	return &DefaultSenzorWorkflow{
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

func (w DefaultSenzorWorkflow) Check() string {

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

	wg.Wait()
	return result
}

func (w DefaultSenzorWorkflow) Close() {
	go func() { w.Trigger_channelClose <- "close" }()
	go func() { w.Ct1_channelClose <- "close" }()
	go func() { w.Ct2_channelClose <- "close" }()
}

func (w DefaultSenzorWorkflow) GetType() string {
	return "defaultsenzor"
}

func (w DefaultSenzorWorkflow) GetId() string {
	return w.BaseWorkflow.Id
}
