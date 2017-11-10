package main

import (
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/check"
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/decision"
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/workflow"

	"gopkg.in/mgo.v2/bson"
)

func RunWorkflow(name string) {

	// NEW WORKFLOW
	go func() {
		wf := workflow.NewWorkflow(name)

		// CHANNELS ------------------

		ch1out := make(chan string)
		ch2out := make(chan string)
		ch3out := make(chan string)
		ch4out := make(chan string)
		ch5out := make(chan string)
		ch6out := make(chan string)
		ch7out := make(chan string)

		// PIPELINE ------------------

		//Check if room have some meeting in this time
		wf.AddTask(&check.CheckActualMeetingTask{
			BaseTask: abstraction.BaseTask{
				Type:            "CheckActualMeetingTask",
				Name:            "myTask1",
				State:           "new",
				ID:              bson.NewObjectId(),
				InChannelIndex:  0,
				OutChannelIndex: 1,
				InChannel:       workflowIn,
				OutChannel:      ch1out,
			},
			RoomID: "????",
			ApiUrl: "http://cellar.hub.api/checkactualmeeting",
		})

		//decision task
		chas := make([]chan string, 2)
		chas[0] = workflowOut
		chas[1] = ch2out
		dt := decision.NewTrueFalseDecisionTask("IsThereAnyRunningMeeting", 1, []int{99, 2}, ch1out, chas)
		wf.AddTask(dt)

		wf.Run()
	}()

}
