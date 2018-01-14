package check

import (
	// "../abstraction"

	"fmt"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/src/abstraction"
)

//**********************************
//TASK - log
//**********************************
type CheckActualMeetingTask struct {
	abstraction.BaseTask
	RoomID string `json:"roomid" bson:"roomid"`
	ApiUrl string `json:"apiurl" bson:"apiurl"`
}

func (t *CheckActualMeetingTask) Execute() error {
	for value := range t.InChannel {
		fmt.Println("CheckMeetingTask value - " + value)
		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *CheckActualMeetingTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	fmt.Println("CheckMeetingTask parallel value - " + value)
	t.State = "completed"
	return nil
}
