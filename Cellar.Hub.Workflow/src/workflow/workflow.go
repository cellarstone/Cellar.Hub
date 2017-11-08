package workflow

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

	// "../abstraction"
	// "../decision"
	// "../human"
	// mylog "../log"
	// "../send"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/abstraction"
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/decision"
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/human"
	mylog "github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/others"
	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/src/send"

	log "github.com/sirupsen/logrus"
)

// Workflow contains tasks list of workflow definition.
type Workflow struct {
	ID            bson.ObjectId `json:"_id" bson:"_id,omitempty"`
	Name          string        `json:"name" bson:"name"`
	State         string        `json:"state" bson:"state"`
	Tasks         []interface{} `json:"tasks" bson:"tasks"`
	ChannelsCount int           `json:"channelsCount" bson:"channelsCount"`
}

var MongoUrl = "cellar.hub.mongodb"
var MongoDatabase = "test"

// NewWorkflow creates a new workflow definition.
func NewWorkflow(name string) *Workflow {
	wf := &Workflow{
		ID:    bson.NewObjectId(),
		Name:  name,
		State: "new",
		Tasks: make([]interface{}, 0),
	}
	return wf
}

func GetWorkflowById(id string) *Workflow {
	session, err := mgo.Dial(MongoUrl)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	//SELECT TABLE
	workflowsTable := session.DB(MongoDatabase).C("workflows")

	//CHECK IF STATE IS DONE
	result := Workflow{}
	err = workflowsTable.Find(bson.M{"_id": id}).One(&result)
	if err != nil && err.Error() != "not found" {
		log.Fatal(err)
	}

	return &result
}

func GetWorkflow(wf *Workflow) *Workflow {
	session, err := mgo.Dial(MongoUrl)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	//SELECT TABLE
	workflowsTable := session.DB(MongoDatabase).C("workflows")

	//CHECK IF STATE IS DONE
	result := Workflow{}
	err = workflowsTable.Find(bson.M{"_id": wf.ID}).One(&result)
	if err != nil {
		log.Fatal(err)
	}

	return &result
}

func SaveWorkflow(wf *Workflow) {
	session, err := mgo.Dial(MongoUrl)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	//SELECT TABLE
	workflowsTable := session.DB(MongoDatabase).C("workflows")

	//INSERT
	err = workflowsTable.Insert(wf)
	if err != nil {
		panic(err)
	}
}

// AddTask add task with name.
func (wf *Workflow) AddTask(task interface{}) {
	wf.Tasks = append(wf.Tasks, task)
}

// Run defined workflow tasks.
func (wf *Workflow) Run() error {
	return wf.run(wf.Tasks)
}

func (wf *Workflow) run(tasks []interface{}) error {
	wf.State = "inprogress"

	for _, nt := range tasks {

		switch nttype := nt.(type) {
		case *mylog.LogTask:
			log.Debug("LogTask - ", nttype)
			// RUN IT in separate goroutine
			go func(t abstraction.Task) {
				t.Execute()
			}(nttype)
		case *decision.BaseDecisionTask:
			log.Debug("BaseDecisionTask - ", nttype)
			// RUN IT in separate goroutine
			go func(t abstraction.Task) {
				t.Execute()
			}(nttype)
		case *human.BaseHumanTask:
			log.Debug("BaseHumanTask - ", nttype)
			// RUN IT in separate goroutine
			go func(t abstraction.Task) {
				t.Execute()
			}(nttype)
		case *send.SendEmailTask:
			log.Debug("SendEmailTask -", nttype)
			// RUN IT in separate goroutine
			go func(t abstraction.Task) {
				t.Execute()
			}(nttype)
		case *send.SendSmsTask:
			log.Debug("SendSmsTask -", nttype)
			// RUN IT in separate goroutine
			go func(t abstraction.Task) {
				t.Execute()
			}(nttype)
		case *send.SendMqttTask:
			log.Debug("SendMqttTask -", nttype)
			// RUN IT in separate goroutine
			go func(t abstraction.Task) {
				t.Execute()
			}(nttype)
		case *send.SendRpcTask:
			log.Debug("SendRpcTask -", nttype)
			// RUN IT in separate goroutine
			go func(t abstraction.Task) {
				t.Execute()
			}(nttype)
		default:
			log.Debug("----default-----", nttype)
			// fmt.Println(nttype)
		}

	}

	wf.State = "completed"
	return nil
}
