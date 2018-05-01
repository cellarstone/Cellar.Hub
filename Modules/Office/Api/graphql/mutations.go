package cellargraphql

import (
	"log"

	service "github.com/cellarstone/Cellar.Hub/Modules/Office/Api/service"
	"github.com/graphql-go/graphql"
	"gopkg.in/mgo.v2/bson"
)

// GetRootMutations returns all the available mutations.
func GetRootMutations() graphql.Fields {
	return graphql.Fields{
		"createCellarMeetingRoom": CreateCellarMeetingRoomMutation(),
		"deleteCellarMeetingRoom": DeleteCellarMeetingRoomMutation(),
		"updateCellarMeetingRoom": UpdateCellarMeetingRoomMutation(),
	}
}

//-----------------------------------------------------
// ---------------------- MEETING ROOM -----------------------
// FIRST VARIANT HOWTO INSERT DATA - BY PARAMETERS
//-----------------------------------------------------

//CREATE -------------

func CreateCellarMeetingRoomMutation() *graphql.Field {
	return &graphql.Field{
		Type: CellarMeetingRoomType,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"email": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[mutation] create CellarMeetingRoom\n")

			item := &service.CellarMeetingRoom{
				ID:    bson.ObjectIdHex(params.Args["id"].(string)),
				Email: params.Args["email"].(string),
			}

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.AddMeetingRoom(*item)
			MyServiceLock.Unlock()

			return result, err
		},
	}
}

//DELETE -------------

func DeleteCellarMeetingRoomMutation() *graphql.Field {
	return &graphql.Field{
		Type: graphql.String,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[mutation] delete CellarMeetingRoom\n")

			id := params.Args["id"].(string)

			// Goroutines safe
			MyServiceLock.Lock()
			err := MyService.RemoveMeetingRoom(id)
			MyServiceLock.Unlock()

			return nil, err
		},
	}
}

//UPDATE -------------

func UpdateCellarMeetingRoomMutation() *graphql.Field {
	return &graphql.Field{
		Type: CellarMeetingRoomType,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"email": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[mutation] update CellarMeetingRoom\n")

			item := &service.CellarMeetingRoom{
				ID:    bson.ObjectIdHex(params.Args["id"].(string)),
				Email: params.Args["email"].(string),
			}

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.UpdateMeetingRoom(*item)
			MyServiceLock.Unlock()

			return result, err
		},
	}
}
