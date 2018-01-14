package send

import (

	// abs "../abstraction"
	abs "github.com/cellarstone/Cellar.Hub/Core/Workflow/src/abstraction"

	log "github.com/sirupsen/logrus"
)

//**********************************
//TASK - Send SMS
//**********************************
type SendSmsTask struct {
	abs.BaseTask
	PhoneNumber string `json:"phoneNumber" bson:"phoneNumber"`
}

func (t *SendSmsTask) Execute() error {
	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING
		log.Debug("SendSmsTask value - " + value)
		//*****************
		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *SendSmsTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	//*****************
	// DOING SOMETHING
	log.Debug("SendSmsTask parallel value - " + value)
	//*****************
	t.State = "completed"
	return nil
}
