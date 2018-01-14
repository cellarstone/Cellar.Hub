package send

import (
	// "../abstraction"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/src/abstraction"
	"github.com/fluent/fluent-logger-golang/fluent"
)

//**********************************
//TASK - log
//**********************************
type SendToFluentdTask struct {
	abstraction.BaseTask
	Tag        string `json:"tag" bson:"tag"`
	FluentdUrl string `json:"fluenturl" bson:"fluenturl"`
}

func (t *SendToFluentdTask) Execute() error {

	fluentLogger, errtemp := fluent.New(fluent.Config{FluentPort: 24224, FluentHost: t.FluentdUrl})
	if errtemp != nil {
		//stop program
		return errtemp
	}

	for value := range t.InChannel {

		var data = map[string]string{
			"message": value,
		}
		error := fluentLogger.Post(t.Tag, data)
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
