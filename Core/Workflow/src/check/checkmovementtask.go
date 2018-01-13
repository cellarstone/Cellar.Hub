package check

import (
	// "../abstraction"

	"fmt"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
)

//**********************************
//TASK - log
//**********************************
type CheckMovementTask struct {
	abstraction.BaseTask
	RoomID         string `json:"roomid" bson:"roomid"`
	TimeBackPeriod string `json:"timebackperiod" bson:"timebackperiod"`
	PrometheusUrl  string `json:"prometheusurl" bson:"prometheusurl"`
}

func (t *CheckMovementTask) Execute() error {
	for value := range t.InChannel {

		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *CheckMovementTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	fmt.Println("CheckMovementTask parallel value - " + value)
	t.State = "completed"
	return nil
}
