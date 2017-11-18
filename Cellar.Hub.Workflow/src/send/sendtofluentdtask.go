package send

import (
	// "../abstraction"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
	"github.com/fluent/fluent-logger-golang/fluent"
)

//**********************************
//TASK - log
//**********************************
type SendToFluentdTask struct {
	abstraction.BaseTask
	fluentdUrl string
	tag        string
}

func (t *SendToFluentdTask) Execute() error {

	FluentLogger, errtemp := fluent.New(fluent.Config{FluentPort: 24224, FluentHost: t.fluentdUrl})
	if errtemp != nil {
		//stop program
		return nil, errtemp
	}

	for value := range t.InChannel {

		var data = map[string]string{
			"message": value,
		}
		error := t.FluentLogger.Post(t.tag, data)
		if error != nil {
			return error
		}

		t.OutChannel <- value
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *SendToFluentdTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	//*****************************************
	//*****************************************
	// TO FINISH!
	//*****************************************
	//*****************************************
	t.State = "completed"
	return nil
}
