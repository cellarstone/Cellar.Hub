package main

import (
	// "./core/abstraction"
	// "./core/decision"
	// "./core/human"
	// "./core/log"
	// "./core/send"
	// "./core/workflow"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/decision"
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/human"
	logtask "github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/others"
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/send"
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/workflow"

	"gopkg.in/mgo.v2/bson"
)

func RunWorkflow(name string) {

	wf := workflow.NewWorkflow(name)

	// CHANNELS ------------------

	ch1out := make(chan string)
	// ch2out := make(chan string)
	ch3out := make(chan string)

	ch4out := make(chan string)
	ch5out := make(chan string)
	ch6out := make(chan string)

	ch7out := make(chan string)

	wf.ChannelsCount = 7

	// PIPELINE ------------------

	//normal task
	wf.AddTask(&logtask.LogTask{
		BaseTask: abstraction.BaseTask{
			Type:            "LogTask",
			Name:            "myTask1",
			State:           "new",
			ID:              bson.NewObjectId(),
			InChannelIndex:  0,
			OutChannelIndex: 1,
			InChannel:       workflowIn,
			OutChannel:      ch1out,
		}})

	//human task
	ht := human.NewHumanTask("ht1", 2, 3, ch1out, ch3out)
	ht.UserID = "user21"
	ht.ResolvedTime = "27-10-2017 15:43:00"
	wf.AddTask(ht)

	//decision task
	chas := make([]chan string, 3)
	chas[0] = ch4out
	chas[1] = ch5out
	chas[2] = ch6out
	dt := decision.NewDecisionTask("Decision1", 3, []int{4, 5, 6}, ch3out, chas)
	wf.AddTask(dt)

	//decision's tasks
	wf.AddTask(&send.SendEmailTask{
		BaseTask: abstraction.BaseTask{
			Type:            "SendEmailTask",
			Name:            "myTask5",
			State:           "new",
			ID:              bson.NewObjectId(),
			InChannelIndex:  4,
			OutChannelIndex: 7,
			InChannel:       ch4out,
			OutChannel:      ch7out}, EmailAddress: "someuser@gmail.com"})
	wf.AddTask(&send.SendSmsTask{
		BaseTask: abstraction.BaseTask{
			Type:            "SendSmsTask",
			Name:            "myTask6",
			State:           "new",
			ID:              bson.NewObjectId(),
			InChannelIndex:  5,
			OutChannelIndex: 7,
			InChannel:       ch5out,
			OutChannel:      ch7out}, PhoneNumber: "725012034"})
	wf.AddTask(&send.SendMqttTask{
		BaseTask: abstraction.BaseTask{
			Type:            "SendMqttTask",
			Name:            "myTask7",
			State:           "new",
			ID:              bson.NewObjectId(),
			InChannelIndex:  6,
			OutChannelIndex: 7,
			InChannel:       ch6out,
			OutChannel:      ch7out}, Topic: "house/alarm"})

	//normal task
	wf.AddTask(&send.SendToPrometheusTask{
		BaseTask: abstraction.BaseTask{
			Type:            "SendToPrometheusTask",
			Name:            "myTask8",
			State:           "new",
			ID:              bson.NewObjectId(),
			InChannelIndex:  7,
			OutChannelIndex: 99,
			InChannel:       ch7out,
			OutChannel:      workflowOut},
		Senzor:        senzorID,
		Topic:         topic,
		PrometheusUrl: gatewayUrl,
	})

	wf.Run()

}
