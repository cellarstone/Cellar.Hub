package send

import (

	// "../abstraction"
	"github.com/cellarstone/Cellar.Hub/Core/Workflow/src/abstraction"

	log "github.com/sirupsen/logrus"
)

//**********************************
//TASK - Send mqtt
//**********************************
type SendMqttTask struct {
	abstraction.BaseTask
	Topic string `json:"topic" bson:"topic"`
}

func (t *SendMqttTask) Execute() error {
	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING
		log.Debug("SendMqttTask value - " + value)
		//*****************
		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *SendMqttTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	//*****************
	// DOING SOMETHING
	log.Debug("SendMqttTask parallel value - " + value)
	//*****************
	t.State = "completed"
	return nil
}
