package main

import (
	"log"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type CellarOrder struct {
	ID         bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Type       string        `json:"type" bson:"type,omitempty"`
	State      string        `json:"state" bson:"state,omitempty"`
	PID        string        `json:"pid" bson:"pid"`
	Parameters []string      `json:"parameters" bson:"parameters,omitempty"`
}

type CellarSortimentItem struct {
	ID         bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Type       string        `json:"type" bson:"type,omitempty"`
	State      string        `json:"state" bson:"state,omitempty"`
	PID        string        `json:"pid" bson:"pid"`
	Parameters []string      `json:"parameters" bson:"parameters,omitempty"`
}

type CellarMeeting struct {
	ID         bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Type       string        `json:"type" bson:"type,omitempty"`
	State      string        `json:"state" bson:"state,omitempty"`
	PID        string        `json:"pid" bson:"pid"`
	Parameters []string      `json:"parameters" bson:"parameters,omitempty"`
}

type CellarOrder struct {
	ID         bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Type       string        `json:"type" bson:"type,omitempty"`
	State      string        `json:"state" bson:"state,omitempty"`
	PID        string        `json:"pid" bson:"pid"`
	Parameters []string      `json:"parameters" bson:"parameters,omitempty"`
}

var mongoUrl = "cellar.hub.mongodb"
var mongoDatabase = "HubDatabase"

func GetAllCellarWorkflows() []CellarWorkflow {
	session, err := mgo.Dial(mongoUrl)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	//Select table
	workflowsTable := session.DB(mongoDatabase).C("Workflows")

	//Return data
	var result []CellarWorkflow
	err = workflowsTable.Find(nil).All(&result)
	if err != nil && err.Error() != "not found" {
		log.Fatal(err)
	}

	return result
}

func GetCellarWorkflows(senzorname string) []CellarWorkflow {
	session, err := mgo.Dial(mongoUrl)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	// Error check on every access
	session.SetSafe(&mgo.Safe{})

	//Select table
	workflowsTable := session.DB(mongoDatabase).C("Workflows")

	//Return data
	var result []CellarWorkflow
	err = workflowsTable.Find(bson.M{"parameters": bson.M{"$in": []string{senzorname}}}).All(&result)
	if err != nil && err.Error() != "not found" {
		log.Fatal(err)
	}

	log.Println(result)

	return result
}

func GetCellarWorkflow(id string) CellarWorkflow {
	// Get session
	session, err := mgo.Dial(mongoUrl)
	if err != nil {
		panic(err)
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
		panic(err)
	}

	return result
}

func AddCellarWorkflow(wf *CellarWorkflow) *CellarWorkflow {
	session, err := mgo.Dial(mongoUrl)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	//SELECT TABLE
	workflowsTable := session.DB(mongoDatabase).C("Workflows")

	wf.ID = bson.NewObjectId()

	//INSERT
	err = workflowsTable.Insert(wf)
	if err != nil {
		panic(err)
	}

	log.Println(wf)

	return wf
}

func UpdateCellarWorkflow(wf *CellarWorkflow) *CellarWorkflow {
	session, err := mgo.Dial(mongoUrl)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	//SELECT TABLE
	workflowsTable := session.DB(mongoDatabase).C("Workflows")

	//UPDATE
	// colQuerier := bson.M{"_id": bson.ObjectIdHex(wf.ID)}
	err = workflowsTable.UpdateId(wf.ID, wf)
	if err != nil {
		panic(err)
	}

	return wf
}

func RemoveCellarWorkflow(id string) error {
	// Get session
	session, err := mgo.Dial(mongoUrl)
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
