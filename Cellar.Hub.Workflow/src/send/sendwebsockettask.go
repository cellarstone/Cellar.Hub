package send

import (

	// abs "../abstraction"
	abs "github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"

	log "github.com/sirupsen/logrus"
)

//**********************************
//TASK - Send Websocket
//**********************************
type SendToWebsocketTask struct {
	abs.BaseTask
	url string `json:"url" bson:"url"`
}

func (t *SendToWebsocketTask) Execute() error {
	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING
		log.Debug("SendToWebsocketTask value - " + value)
		//*****************
		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *SendToWebsocketTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	//*****************
	// DOING SOMETHING
	log.Debug("SendToWebsocketTask parallel value - " + value)
	//*****************
	t.State = "completed"
	return nil
}
