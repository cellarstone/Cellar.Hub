package cellargraphql

import (
	"log"

	iot "github.com/cellarstone/Cellar.Hub/Core/Iot/service"
	"github.com/graphql-go/graphql"
)

// GetRootQueries returns all the available queries.
func GetRootQueries() graphql.Fields {
	return graphql.Fields{
		"cellarspace":  GetSpacesQuery(),
		"cellarplace":  GetPlacesQuery(),
		"cellarsenzor": GetSenzorsQuery(),
	}
}

func GetSpacesQuery() *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(CellarSpaceType),
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[query] CellarSpace\n")

			idQuery, _ := params.Args["id"].(string)

			if idQuery != "" {
				// Goroutines safe
				MyServiceLock.Lock()
				resultS, err := MyService.GetSpace(idQuery)
				MyServiceLock.Unlock()

				resultArray := []iot.CellarSpace{resultS}
				return resultArray, err
			}

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.GetAllSpaces()
			MyServiceLock.Unlock()

			return result, err

		},
	}
}

func GetPlacesQuery() *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(CellarPlaceType),
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[query] CellarPlace\n")

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.GetAllPlaces()
			MyServiceLock.Unlock()

			return result, err
		},
	}
}

func GetSenzorsQuery() *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(CellarSenzorType),
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[query] CellarSenzor\n")

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.GetAllSenzors()
			MyServiceLock.Unlock()

			return result, err
		},
	}
}
