package engine

import "gopkg.in/mgo.v2/bson"

type CellarWorkflow struct {
	ID             bson.ObjectId `json:"id" bson:"_id,omitempty"`
	WorkflowType   string        `json:"workflowtype" bson:"workflowtype"`
	WorkflowParams interface{}   `json:"workflowparams" bson:"workflowparams"`
	Tags           []string      `json:"tags" bson:"tags"`
	TriggerType    string        `json:"triggertype" bson:"triggertype"`
	TriggerParams  interface{}   `json:"triggerparams" bson:"triggerparams"`
}
