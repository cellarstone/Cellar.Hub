package send

import (
	"fmt"

	// abs "../abstraction"
	abs "github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
)

//**********************************
//TASK - Send Websocket
//**********************************
type SendWebsocketTask struct {
	abs.BaseTask
	url string `json:"url" bson:"url"`
}

func (t *SendWebsocketTask) Execute() error {
	fmt.Println("SendWebsocketTask execute")

	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING
		fmt.Println("SendWebsocketTask value - " + value)
		//*****************
		t.OutChannel <- value
	}

	//SEM SE TO NEDOSTANE ???
	fmt.Println("SendWebsocketTask - COMPLETE")

	t.State = "completed"
	return nil
}

func (t *SendWebsocketTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	//*****************
	// DOING SOMETHING
	fmt.Println("SendWebsocketTask parallel value - " + value)
	//*****************
	t.State = "completed"
	return nil
}
