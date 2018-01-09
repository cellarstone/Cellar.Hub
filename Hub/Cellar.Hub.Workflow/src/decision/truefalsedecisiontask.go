package decision

import (
	"gopkg.in/mgo.v2/bson"
)

//*********************************************
// TRUE & FALSE Decision Task
//*********************************************
type TrueFalseDecisionTask struct {
	ID               bson.ObjectId `json:"_id" bson:"_id,omitempty"`
	Name             string        `json:"name" bson:"name"`
	State            string        `json:"state" bson:"state"`
	Type             string        `json:"type" bson:"type"`
	InChannelIndex   int           `json:"inchannelindex" bson:"inchannelindex"`
	OutChannelsIndex []int         `json:"outchannelsindex" bson:"outchannelsindex"`
	InChannel        chan string   `json:"-" bson:"-"`
	OutChannels      []chan string `json:"-" bson:"-"`
}

func NewTrueFalseDecisionTask(name string, inchannelindex int, outchannelsindex []int, inchannel chan string, outChannels []chan string) *TrueFalseDecisionTask {
	return &TrueFalseDecisionTask{
		Name:             name,
		State:            "new",
		Type:             "TrueFalseDecisionTask",
		InChannelIndex:   inchannelindex,
		OutChannelsIndex: outchannelsindex,
		InChannel:        inchannel,
		OutChannels:      outChannels,
	}
}

// Execute implement Task.Execute.
func (t *TrueFalseDecisionTask) Execute() error {
	t.State = "inprogress"

	for value := range t.InChannel {

		if value == "true" {
			t.OutChannels[0] <- value
		} else if value == "false" {
			t.OutChannels[1] <- value
		}

	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *TrueFalseDecisionTask) ExecuteParallel(value string) error {
	//nothing here
	return nil
}
