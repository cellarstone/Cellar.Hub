package others

import (
	// "../abstraction"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"

	log "github.com/sirupsen/logrus"
)

//**********************************
//TASK - log
//**********************************
type LogTask struct {
	abstraction.BaseTask
}

func (t *LogTask) Execute() error {
	for value := range t.InChannel {
		log.Debug("LogTask value - " + value)
		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *LogTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	log.Debug("LogTask parallel value - " + value)
	t.State = "completed"
	return nil
}
