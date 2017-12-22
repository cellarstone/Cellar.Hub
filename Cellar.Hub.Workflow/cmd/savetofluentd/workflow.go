package main

import (
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/send"
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/workflow"

	"gopkg.in/mgo.v2/bson"
)

func RunWorkflow(name string) {

	// NEW WORKFLOW
	go func() {
		wf := workflow.NewWorkflow(name)

		//normal task
		wf.AddTask(&send.SendToFluentdTask{
			BaseTask: abstraction.BaseTask{
				Type:            "SendToFluentdTask",
				Name:            "myTask1",
				State:           "new",
				ID:              bson.NewObjectId(),
				InChannelIndex:  0,
				OutChannelIndex: 99,
				InChannel:       workflowIn,
				OutChannel:      workflowOut,
			},
			Tag:        senzorID + "/" + topic,
			FluentdUrl: fluentdUrl,
		})

		wf.Run()
	}()

}
