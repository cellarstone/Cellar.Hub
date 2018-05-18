package cellargraphql

import (
	"log"

	service "github.com/cellarstone/Cellar.Hub/Modules/Office/Api/service"
	"github.com/graphql-go/graphql"
)

// GetRootQueries returns all the available queries.
func GetRootQueries() graphql.Fields {
	return graphql.Fields{
		"cellarmeetingroom": GetMeetingRoomsQuery(),
		"meetingroommodel":  GetMeetingRoomsModelQuery(),
	}
}

func GetMeetingRoomsQuery() *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(CellarMeetingRoomType),
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[query] CellarMeetingRoom\n")

			idQuery, _ := params.Args["id"].(string)

			if idQuery != "" {
				// Goroutines safe
				MyServiceLock.Lock()
				resultS, err := MyService.GetMeetingRoom(idQuery)
				MyServiceLock.Unlock()

				if err != nil {
					log.Printf("error : {0}", err)
				}

				resultArray := []service.CellarMeetingRoom{resultS}
				return resultArray, err
			}

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.GetAllMeetingRooms()
			MyServiceLock.Unlock()

			if err != nil {
				log.Printf("error : {0}", err)
			}

			return result, err

		},
	}
}

func GetMeetingRoomsModelQuery() *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(ModelMeetingRoomType),
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[query] CellarMeetingRoomModel\n")

			idQuery, _ := params.Args["id"].(string)
			// fmt.Println("id : ", idQuery)
			if idQuery != "" {
				// Goroutines safe
				MyServiceLock.Lock()
				resultS, err := MyService.GetMeetingRoomModel(idQuery)

				if err != nil {
					log.Printf("error : {0}", err)
				}

				resultArray := []service.MeetingRoomVM{resultS}
				MyServiceLock.Unlock()
				return resultArray, err
			}

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.GetAllMeetingRoomsModel()
			MyServiceLock.Unlock()

			if err != nil {
				log.Printf("error : {0}", err)
			}

			return result, err

		},
	}
}
