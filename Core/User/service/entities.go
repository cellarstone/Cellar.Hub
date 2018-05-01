package service

import "gopkg.in/mgo.v2/bson"

//-----------------------------
//-----------------------------
// ENTITIES
//-----------------------------
//-----------------------------

type CellarUser struct {
	ID    bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name  string        `json:"name" bson:"name"`
	State string        `json:"state" bson:"state"`
	Image string        `json:"image" bson:"image"`
	Role  string        `json:"path" bson:"path"`
}
