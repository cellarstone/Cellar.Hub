package others

import (
	// "../abstraction"

	"fmt"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
)

//**********************************
//TASK - log
//**********************************
type LogTask struct {
	abstraction.BaseTask
}

func (t *LogTask) Execute() error {
	for value := range t.InChannel {
		fmt.Println("LogTask value - " + value)
		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *LogTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	fmt.Println("LogTask parallel value - " + value)
	t.State = "completed"
	return nil
}
