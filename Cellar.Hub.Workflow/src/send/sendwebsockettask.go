package send

import (

	// abs "../abstraction"
	abs "github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"

	log "github.com/sirupsen/logrus"
)

//**********************************
//TASK - Send Websocket
//**********************************
type SendWebsocketTask struct {
	abs.BaseTask
	url string `json:"url" bson:"url"`
}

func (t *SendWebsocketTask) Execute() error {
	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING
		log.Debug("SendWebsocketTask value - " + value)
		//*****************
		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *SendWebsocketTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	//*****************
	// DOING SOMETHING
	log.Debug("SendWebsocketTask parallel value - " + value)
	//*****************
	t.State = "completed"
	return nil
}
