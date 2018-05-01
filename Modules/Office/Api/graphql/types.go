package cellargraphql

import (
	"github.com/graphql-go/graphql"
)

var CellarMeetingRoomType = graphql.NewObject(graphql.ObjectConfig{
	Name:        "CellarMeetingRoom",
	Description: "Representation of Meeting room. Any space can be a meeting room",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"email": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
})

var ModelMeetingRoomType = graphql.NewObject(graphql.ObjectConfig{
	Name:        "ModelMeetingRoom",
	Description: "ViewModel of Meeting room. Combine CellarSpace and CellarMeetingRoom",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"name": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"path": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"email": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
})
