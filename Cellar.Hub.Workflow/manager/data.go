package main

import (
	"log"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type WorkflowEntity struct {
	ID         bson.ObjectId `json:"_id" bson:"_id,omitempty"`
	Type       string        `json:"type" bson:"type,omitempty"`
	Parameters []string      `json:"parameters" bson:"parameters,omitempty"`
}

var MongoUrl = "cellar.hub.mongodb"
var MongoDatabase = "test"

func SaveWorkflowEntity(wf *WorkflowEntity) {
	session, err := mgo.Dial(MongoUrl)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	//SELECT TABLE
	workflowsTable := session.DB(MongoDatabase).C("workflowentity")

	//INSERT
	err = workflowsTable.Insert(wf)
	if err != nil {
		panic(err)
	}
}

func GetAllWorkflowEntity() []WorkflowEntity {
	session, err := mgo.Dial(MongoUrl)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	//Select table
	workflowsTable := session.DB(MongoDatabase).C("workflowentity")

	//Return data
	var result []WorkflowEntity
	err = workflowsTable.Find(nil).All(&result)
	if err != nil && err.Error() != "not found" {
		log.Fatal(err)
	}

	return result
}

func DeleteWorklfowEntity(id string) error {
	// Get session
	session, err := mgo.Dial(MongoUrl)
	if err != nil {
		return err
	}
	defer session.Close()

	// Error check on every access
	session.SetSafe(&mgo.Safe{})

	// Get collection
	collection := session.DB(MongoDatabase).C("workflowentity")

	// Delete record
	err = collection.RemoveId(bson.ObjectIdHex(id))
	if err != nil && err.Error() != "not found" {
		return err
	}

	return nil
}
