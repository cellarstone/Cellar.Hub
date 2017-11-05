package send

import (
	// abs "../abstraction"

	abs "github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"

	log "github.com/sirupsen/logrus"
)

//**********************************
//TASK - Send email
//**********************************
type SendEmailTask struct {
	abs.BaseTask
	EmailAddress string `json:"emailAddress" bson:"emailAddress"`
}

func (t *SendEmailTask) Execute() error {
	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING
		log.Debug("SendEmailTask value - " + value)
		//*****************
		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *SendEmailTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	//*****************
	// DOING SOMETHING
	log.Debug("SendEmailTask parallel value - " + value)
	//*****************
	t.State = "completed"
	return nil
}
