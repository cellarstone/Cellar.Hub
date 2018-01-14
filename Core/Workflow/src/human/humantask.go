package human

import (

	// abs "../abstraction"
	abs "github.com/cellarstone/Cellar.Hub/Core/Workflow/src/abstraction"
	"gopkg.in/mgo.v2/bson"
)

//**********************************
//TASK - Human Task
//**********************************
type BaseHumanTask struct {
	abs.BaseTask
	UserID       string `json:"userID" bson:"userID"`
	ResolvedTime string `json:"resolvedTime" bson:"resolvedTime"`
}

func NewHumanTask(name string, inchannelindex int, outchannelindex int, inchannel chan string, outchannel chan string) *BaseHumanTask {
	ht := &BaseHumanTask{
		BaseTask: abs.BaseTask{
			ID:              bson.NewObjectId(),
			Name:            name,
			State:           "new",
			Type:            "BaseHumanTask",
			InChannelIndex:  inchannelindex,
			OutChannelIndex: outchannelindex,
			InChannel:       inchannel,
			OutChannel:      outchannel,
		},
		UserID:       "asdf",
		ResolvedTime: "asdf",
	}

	return ht
}

// func GetHumanTaskState(ht *BaseHumanTask) string {

// 	session, err := mgo.Dial("localhost")
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer session.Close()

// 	// //SELECT TABLE
// 	// workflowsTable := session.DB("test").C("workflows")

// 	// result00 := Workflow{}
// 	// err = workflowsTable.Find(nil).Select(bson.M{"name": 1}).One(&result00)
// 	// if err != nil {
// 	// 	log.Fatal(err)
// 	// }

// 	// result01 := Workflow{}
// 	// err = workflowsTable.Find(nil).One(&result01)
// 	// if err != nil {
// 	// 	log.Fatal(err)
// 	// }

// 	// //CHECK IF STATE IS DONE
// 	// result := someHumanTask{}
// 	// err = workflowsTable.Find(bson.M{"tasks._id": ht.ID}).Select(bson.M{"tasks": 1}).One(&result)
// 	// if err != nil {
// 	// 	log.Fatal(err)
// 	// }

// 	// result2 := someHumanTask{}
// 	// err = workflowsTable.Find(bson.M{"tasks._id": ht.ID}).Select(bson.M{"tasks.$": 1}).One(&result2)
// 	// if err != nil {
// 	// 	log.Fatal(err)
// 	// }

// 	// // result3 := Workflow{}
// 	// // err = humanTasksTable.Find(bson.M{"tasks._id": ht.ID}).Select(bson.M{"tasks": 1}).One(&result3)
// 	// // if err != nil {
// 	// // 	log.Fatal(err)
// 	// // }

// 	// result4 := Workflow{}
// 	// err = workflowsTable.Find(bson.M{"tasks._id": ht.ID}).Select(bson.M{"tasks.$": 1}).One(&result4)
// 	// if err != nil {
// 	// 	log.Fatal(err)
// 	// }

// 	return "done"
// }

func (t *BaseHumanTask) Execute() error {

	for value := range t.InChannel {
		t.State = "inprogress"
		//*****************
		// DOING SOMETHING
		//result := GetHumanTaskState(t)
		result := "done"

		if result == "done" {
			t.OutChannel <- value
		}
		//*****************
	}

	//SEM SE TO NIKDY NEDOSTANE !!!
	t.State = "completed"
	return nil
}

func (t *BaseHumanTask) ExecuteParallel(value string) error {
	t.State = "inprogress"
	//*****************
	// DOING SOMETHING
	//*****************
	t.State = "completed"
	return nil
}