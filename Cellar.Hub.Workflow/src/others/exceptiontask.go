package others

import (
	// "../abstraction"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
)

//**********************************
//TASK - exception
//**********************************
type ExceptionTask struct {
	abstraction.BaseTask
	MessageCount int `json:"messageCount" bson:"messageCount"`
}

func (t *ExceptionTask) Execute() error {

	var counter = 0

	for value := range t.InChannel {

		if counter == t.MessageCount {
			panic("TEST EXCEPTION")
		}
		counter++

		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *ExceptionTask) ExecuteParallel(value string) error {
	t.State = "inprogress"

	panic("TEST EXCEPTION")

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}
