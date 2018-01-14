package main

import (
	"github.com/cellarstone/Cellar.Hub/Core/Workflow/src/abstraction"
	"github.com/cellarstone/Cellar.Hub/Core/Workflow/src/send"
	"github.com/cellarstone/Cellar.Hub/Core/Workflow/src/workflow"

	"gopkg.in/mgo.v2/bson"
)

func RunWorkflow(name string) {

	// NEW WORKFLOW
	go func() {
		wf := workflow.NewWorkflow(name)

		//normal task
		wf.AddTask(&send.SendToPrometheusTask{
			BaseTask: abstraction.BaseTask{
				Type:            "SendToPrometheusTask",
				Name:            "myTask1",
				State:           "new",
				ID:              bson.NewObjectId(),
				InChannelIndex:  0,
				OutChannelIndex: 99,
				InChannel:       workflowIn,
				OutChannel:      workflowOut,
			},
			Senzor:        senzorID,
			Topic:         topic,
			PrometheusUrl: gatewayUrl,
		})

		wf.Run()
	}()

}
