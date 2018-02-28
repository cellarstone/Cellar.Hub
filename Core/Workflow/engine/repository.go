package engine

import (
	"fmt"
	"os"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type CellarWorkflow struct {
	ID             bson.ObjectId `json:"id" bson:"_id,omitempty"`
	WorkflowType   string        `json:"workflowtype" bson:"workflowtype"`
	WorkflowParams interface{}   `json:"workflowparams" bson:"workflowparams"`
	Tags           []string      `json:"tags" bson:"tags"`
	TriggerType    string        `json:"triggertype" bson:"triggertype"`
	TriggerParams  interface{}   `json:"triggerparams" bson:"triggerparams"`
}

const (
	defaultmongourl = "localhost"
)

var (
	mongourl      string
	mongoDatabase string
)

func InitRepository() {
	mongourl = envString("MONGO_URL", defaultmongourl)
	mongoDatabase = "HubDatabase"
}

func GetAllCellarWorkflows() ([]CellarWorkflow, error) {

	fmt.Println(mongourl)

	session, err := mgo.Dial(mongourl)
	if err != nil {
		return nil, err
	}
	defer session.Close()

	//Select table
	workflowsTable := session.DB(mongoDatabase).C("Workflows")

	//Return data
	var result []CellarWorkflow
	err = workflowsTable.Find(nil).All(&result)
	if err != nil && err.Error() != "not found" {
		return nil, err
	}

	return result, nil
}

func GetCellarWorkflows(senzorname string) ([]CellarWorkflow, error) {
	session, err := mgo.Dial(mongourl)
	if err != nil {
		return nil, err
	}
	defer session.Close()

	// Error check on every access
	session.SetSafe(&mgo.Safe{})

	//Select table
	workflowsTable := session.DB(mongoDatabase).C("Workflows")

	//Return data
	var result []CellarWorkflow
	err = workflowsTable.Find(bson.M{"tags": bson.M{"$in": []string{senzorname}}}).All(&result)
	if err != nil && err.Error() != "not found" {
		return nil, err
	}

	//log.Println(result)

	return result, nil
}

func DeleteCellarWorkflows(senzorname string) error {
	// Get session
	session, err := mgo.Dial(mongourl)
	if err != nil {
		return err
	}
	defer session.Close()

	// Error check on every access
	session.SetSafe(&mgo.Safe{})

	// Get collection
	collection := session.DB(mongoDatabase).C("Workflows")

	// Delete record
	err = collection.Remove(bson.M{"tags": bson.M{"$in": []string{senzorname}}})
	if err != nil && err.Error() != "not found" {
		return err
	}

	return nil
}

func GetCellarWorkflow(id string) (CellarWorkflow, error) {
	// Get session
	session, err := mgo.Dial(mongourl)
	if err != nil {
		return CellarWorkflow{}, err
	}
	defer session.Close()

	// Error check on every access
	session.SetSafe(&mgo.Safe{})

	// Get collection
	collection := session.DB(mongoDatabase).C("Workflows")

	// Return data
	var result CellarWorkflow
	err = collection.FindId(bson.ObjectIdHex(id)).One(&result)
	if err != nil && err.Error() != "not found" {
		return CellarWorkflow{}, err
	}

	return result, nil
}

func IsExistCellarWorkflow(id string) (bool, error) {
	session, err := mgo.Dial(mongourl)
	if err != nil {
		return false, err
	}
	defer session.Close()

	// Error check on every access
	session.SetSafe(&mgo.Safe{})

	//Select table
	workflowsTable := session.DB(mongoDatabase).C("Workflows")

	//Return data
	var result []CellarWorkflow
	err = workflowsTable.FindId(bson.ObjectIdHex(id)).All(&result)
	if err != nil && err.Error() != "not found" {
		return false, err
	}

	if len(result) > 0 {
		return true, nil
	}
	return false, nil
}

func AddCellarWorkflow(wf *CellarWorkflow) (CellarWorkflow, error) {
	session, err := mgo.Dial(mongourl)
	if err != nil {
		return CellarWorkflow{}, err
	}
	defer session.Close()

	//SELECT TABLE
	workflowsTable := session.DB(mongoDatabase).C("Workflows")

	wf.ID = bson.NewObjectId()

	//INSERT
	err = workflowsTable.Insert(wf)
	if err != nil {
		return CellarWorkflow{}, err
	}

	//log.Println(wf)

	return *wf, nil
}

func UpdateCellarWorkflow(wf *CellarWorkflow) (CellarWorkflow, error) {
	session, err := mgo.Dial(mongourl)
	if err != nil {
		return CellarWorkflow{}, err
	}
	defer session.Close()

	//SELECT TABLE
	workflowsTable := session.DB(mongoDatabase).C("Workflows")

	//UPDATE
	// colQuerier := bson.M{"_id": bson.ObjectIdHex(wf.ID)}
	err = workflowsTable.UpdateId(wf.ID, wf)
	if err != nil {
		return CellarWorkflow{}, err
	}

	return *wf, nil
}

func RemoveCellarWorkflow(id string) error {
	// Get session
	session, err := mgo.Dial(mongourl)
	if err != nil {
		return err
	}
	defer session.Close()

	// Error check on every access
	session.SetSafe(&mgo.Safe{})

	// Get collection
	collection := session.DB(mongoDatabase).C("Workflows")

	// Delete record
	err = collection.RemoveId(bson.ObjectIdHex(id))
	if err != nil && err.Error() != "not found" {
		return err
	}

	return nil
}

//HELPER
func envString(env, fallback string) string {
	e := os.Getenv(env)
	if e == "" {
		return fallback
	}
	return e
}
