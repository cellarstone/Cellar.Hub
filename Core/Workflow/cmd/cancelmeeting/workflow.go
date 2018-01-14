package main

import (
	"github.com/cellarstone/Cellar.Hub/Core/Workflow/src/abstraction"
	"github.com/cellarstone/Cellar.Hub/Core/Workflow/src/check"
	"github.com/cellarstone/Cellar.Hub/Core/Workflow/src/decision"
	"github.com/cellarstone/Cellar.Hub/Core/Workflow/src/workflow"

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
			RoomID: roomID,
			ApiUrl: apiUrl + "/checkactualmeeting",
		})

		//decision task
		chas := make([]chan string, 2)
		chas[0] = ch2out
		chas[1] = workflowOut
		dt := decision.NewTrueFalseDecisionTask("IsThereAnyRunningMeeting", 1, []int{2, 99}, ch1out, chas)
		wf.AddTask(dt)

		//Check if room have some movement during last XX minutes
		wf.AddTask(&check.CheckMovementTask{
			BaseTask: abstraction.BaseTask{
				Type:            "CheckMovementTask",
				Name:            "myTask2",
				State:           "new",
				ID:              bson.NewObjectId(),
				InChannelIndex:  0,
				OutChannelIndex: 1,
				InChannel:       ch2out,
				OutChannel:      ch3out,
			},
			RoomID:         roomID,
			TimeBackPeriod: timePeriodBack,
			PrometheusUrl:  prometheusUrl,
		})

		//decision task
		chas = make([]chan string, 2)
		chas[0] = ch4out
		chas[1] = workflowOut
		dt = decision.NewTrueFalseDecisionTask("IsThereAnyMovement", 1, []int{3, 99}, ch3out, chas)
		wf.AddTask(dt)

		//Cancel actual meeting
		wf.AddTask(&check.CancelActualMeetingTask{
			BaseTask: abstraction.BaseTask{
				Type:            "CancelActualMeetingTask",
				Name:            "myTask3",
				State:           "new",
				ID:              bson.NewObjectId(),
				InChannelIndex:  0,
				OutChannelIndex: 1,
				InChannel:       ch4out,
				OutChannel:      workflowOut,
			},
			RoomID: roomID,
			ApiUrl: apiUrl + "/cancelactualmeetingtask",
		})

		wf.Run()
	}()

}
