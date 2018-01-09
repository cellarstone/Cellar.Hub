package check

import (
	// "../abstraction"

	"fmt"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
)

//**********************************
//TASK - log
//**********************************
type CancelActualMeetingTask struct {
	abstraction.BaseTask
	RoomID string `json:"roomid" bson:"roomid"`
	ApiUrl string `json:"apiurl" bson:"apiurl"`
}

func (t *CancelActualMeetingTask) Execute() error {
	for value := range t.InChannel {
		fmt.Println("CancelMeetingTask value - " + value)
		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *CancelActualMeetingTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	fmt.Println("CancelMeetingTask parallel value - " + value)
	t.State = "completed"
	return nil
}
