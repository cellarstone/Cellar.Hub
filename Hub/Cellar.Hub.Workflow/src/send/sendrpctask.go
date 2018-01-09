package send

import (

	// abs "../abstraction"
	abs "github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"

	log "github.com/sirupsen/logrus"
)

//**********************************
//TASK - Send gRPC
//**********************************
type SendRpcTask struct {
	abs.BaseTask
	address string `json:"address" bson:"address"`
}

func (t *SendRpcTask) Execute() error {
	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING
		log.Debug("SendRpcTask value - " + value)
		//*****************
		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *SendRpcTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	//*****************
	// DOING SOMETHING
	log.Debug("SendRpcTask parallel value - " + value)
	//*****************
	t.State = "completed"
	return nil
}
