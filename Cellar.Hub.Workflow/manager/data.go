package main

import "gopkg.in/mgo.v2/bson"

type WorkflowEntity struct {
	ID         bson.ObjectId `json:"_id" bson:"_id,omitempty"`
	Type       string        `json:"type" bson:"type,omitempty"`
	Parameters []string      `json:"parameters" bson:"parameters,omitempty"`
}
