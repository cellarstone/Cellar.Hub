package others

import (
	// "../abstraction"

	"errors"

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
			errTest := errors.New("TEST EXCEPTION - Exception task")
			panic(errTest)
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

	errTest := errors.New("TEST EXCEPTION")
	panic(errTest)

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}
