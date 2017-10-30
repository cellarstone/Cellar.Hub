package send

import (
	"fmt"

	// abs "../abstraction"
	abs "github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/core/abstraction"
)

//**********************************
//TASK - Send email
//**********************************
type SendEmailTask struct {
	abs.BaseTask
	EmailAddress string `json:"emailAddress" bson:"emailAddress"`
}

func (t *SendEmailTask) Execute() error {
	fmt.Println("SendEmailTask execute")

	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING
		fmt.Println("SendEmailTask value - " + value)
		//*****************
		t.OutChannel <- value
	}

	t.State = "completed"
	return nil
}

func (t *SendEmailTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	//*****************
	// DOING SOMETHING
	fmt.Println("SendEmailTask parallel value - " + value)
	//*****************
	t.State = "completed"
	return nil
}
