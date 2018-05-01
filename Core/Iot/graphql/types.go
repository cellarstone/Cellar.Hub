package cellargraphql

import (
	"github.com/graphql-go/graphql"
)

// UserType is the GraphQL schema for the user type.
var CellarSpaceType = graphql.NewObject(graphql.ObjectConfig{
	Name:        "CellarSpace",
	Description: "Representation of any space. Spaces are tree structure.",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"name": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"state": &graphql.Field{
			Type:        graphql.String,
			Description: "New | Approved | Forbidden",
		},
		"image": &graphql.Field{Type: graphql.String},
		"path": &graphql.Field{
			Type:        graphql.NewNonNull(graphql.String),
			Description: "Tree structure. Ex. /MyHouse/Floor1/Bedroom",
		},
	},
})

var CellarPlaceType = graphql.NewObject(graphql.ObjectConfig{
	Name:        "CellarPlace",
	Description: "Point of the map",
	Fields: graphql.Fields{
		"id":         &graphql.Field{Type: graphql.String},
		"name":       &graphql.Field{Type: graphql.String},
		"path":       &graphql.Field{Type: graphql.String},
		"country":    &graphql.Field{Type: graphql.String},
		"city":       &graphql.Field{Type: graphql.String},
		"street":     &graphql.Field{Type: graphql.String},
		"zipcode":    &graphql.Field{Type: graphql.String},
		"latitude":   &graphql.Field{Type: graphql.String},
		"longtitude": &graphql.Field{Type: graphql.String},
	},
})

var CellarSenzorType = graphql.NewObject(graphql.ObjectConfig{
	Name:        "CellarSenzor",
	Description: "Representation of Cellarstone Senzor",
	Fields: graphql.Fields{
		"id":           &graphql.Field{Type: graphql.String},
		"name":         &graphql.Field{Type: graphql.String},
		"state":        &graphql.Field{Type: graphql.String},
		"path":         &graphql.Field{Type: graphql.String},
		"type":         &graphql.Field{Type: graphql.String},
		"firmware":     &graphql.Field{Type: graphql.String},
		"ipaddress":    &graphql.Field{Type: graphql.String},
		"wifissid":     &graphql.Field{Type: graphql.String},
		"wifipassword": &graphql.Field{Type: graphql.String},
		"mqtturl":      &graphql.Field{Type: graphql.String},
	},
})
