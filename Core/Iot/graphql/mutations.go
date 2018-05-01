package cellargraphql

import (
	"log"

	iot "github.com/cellarstone/Cellar.Hub/Core/Iot/service"
	"github.com/graphql-go/graphql"
	"gopkg.in/mgo.v2/bson"
)

// GetRootMutations returns all the available mutations.
func GetRootMutations() graphql.Fields {
	return graphql.Fields{
		"createCellarSpace":  GetCreateCellarSpaceMutation(),
		"deleteCellarSpace":  GetDeleteCellarSpaceMutation(),
		"updateCellarSpace":  GetUpdateCellarSpaceMutation(),
		"createCellarPlace":  GetCreateCellarPlaceMutation(),
		"deleteCellarPlace":  GetDeleteCellarPlaceMutation(),
		"updateCellarPlace":  GetUpdateCellarPlaceMutation(),
		"createCellarSenzor": GetCreateCellarSenzorMutation(),
		"deleteCellarSenzor": GetDeleteCellarSenzorMutation(),
		"updateCellarSenzor": GetUpdateCellarSenzorMutation(),
	}
}

//-----------------------------------------------------
// ---------------------- SPACE -----------------------
// FIRST VARIANT HOWTO INSERT DATA - BY PARAMETERS
//-----------------------------------------------------

//CREATE -------------

func GetCreateCellarSpaceMutation() *graphql.Field {
	return &graphql.Field{
		Type: CellarSpaceType,
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"state": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"image": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"path": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[mutation] create CellarSpace\n")

			item := &iot.CellarSpace{
				Name:  params.Args["name"].(string),
				State: params.Args["state"].(string),
				Image: params.Args["image"].(string),
				Path:  params.Args["path"].(string),
			}

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.AddSpace(*item)
			MyServiceLock.Unlock()

			return result, err
		},
	}
}

//DELETE -------------

func GetDeleteCellarSpaceMutation() *graphql.Field {
	return &graphql.Field{
		Type: graphql.String,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[mutation] delete CellarSpace\n")

			id := params.Args["id"].(string)

			// Goroutines safe
			MyServiceLock.Lock()
			err := MyService.RemoveSpace(id)
			MyServiceLock.Unlock()

			return nil, err
		},
	}
}

//UPDATE -------------

func GetUpdateCellarSpaceMutation() *graphql.Field {
	return &graphql.Field{
		Type: CellarSpaceType,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"name": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"state": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"image": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"path": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[mutation] update CellarSpace\n")

			item := &iot.CellarSpace{
				ID:    bson.ObjectIdHex(params.Args["id"].(string)),
				Name:  params.Args["name"].(string),
				State: params.Args["state"].(string),
				Image: params.Args["image"].(string),
				Path:  params.Args["path"].(string),
			}

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.UpdateSpace(*item)
			MyServiceLock.Unlock()

			return result, err
		},
	}
}

//-----------------------------------------------------
// ---------------------- PLACE -----------------------
// SECOND VARIANT HOWTO INSERT DATA - BY OBJECT
//-----------------------------------------------------

//CREATE -------------

//1. create input object
var createPlaceType = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "CreatePlaceType",
	Fields: graphql.InputObjectConfigFieldMap{
		"name": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"state": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"path": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"country": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"city": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"street": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"zipcode": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"latitude": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"longtitude": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
})

//2. Use object in mutation
func GetCreateCellarPlaceMutation() *graphql.Field {
	return &graphql.Field{
		Type: CellarPlaceType,
		Args: graphql.FieldConfigArgument{
			"input": &graphql.ArgumentConfig{
				Description: "An input with the Cellar Place object",
				Type:        graphql.NewNonNull(createPlaceType),
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[mutation] create CellarPlace\n")

			inp := params.Args["input"].(map[string]interface{})

			item := &iot.CellarPlace{
				Name:       inp["name"].(string),
				State:      inp["state"].(string),
				Path:       inp["path"].(string),
				Country:    inp["country"].(string),
				City:       inp["city"].(string),
				Street:     inp["street"].(string),
				Zipcode:    inp["zipcode"].(string),
				Latitude:   inp["latitude"].(string),
				Longtitude: inp["longtitude"].(string),
			}

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.AddPlace(*item)
			MyServiceLock.Unlock()

			return result, err
		},
	}
}

//DELETE -------------

func GetDeleteCellarPlaceMutation() *graphql.Field {
	return &graphql.Field{
		Type: graphql.String,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[mutation] delete CellarPlace\n")

			id := params.Args["id"].(string)

			// Goroutines safe
			MyServiceLock.Lock()
			err := MyService.RemovePlace(id)
			MyServiceLock.Unlock()

			return nil, err
		},
	}
}

//UPDATE -------------

//1. create input object
var updatePlaceType = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "UpdatePlaceType",
	Fields: graphql.InputObjectConfigFieldMap{
		"id": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"state": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"name": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"path": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"country": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"city": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"street": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"zipcode": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"latitude": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"longtitude": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
})

//2. Use object in mutation
func GetUpdateCellarPlaceMutation() *graphql.Field {
	return &graphql.Field{
		Type: CellarPlaceType,
		Args: graphql.FieldConfigArgument{
			"input": &graphql.ArgumentConfig{
				Description: "An input with the Cellar Place object",
				Type:        graphql.NewNonNull(updatePlaceType),
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[mutation] udpate CellarPlace\n")

			inp := params.Args["input"].(map[string]interface{})

			item := &iot.CellarPlace{
				ID:         bson.ObjectIdHex(inp["id"].(string)),
				Name:       inp["name"].(string),
				State:      inp["state"].(string),
				Path:       inp["path"].(string),
				Country:    inp["country"].(string),
				City:       inp["city"].(string),
				Street:     inp["street"].(string),
				Zipcode:    inp["zipcode"].(string),
				Latitude:   inp["latitude"].(string),
				Longtitude: inp["longtitude"].(string),
			}

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.UpdatePlace(*item)
			MyServiceLock.Unlock()

			return result, err
		},
	}
}

//-----------------------------------------------------
// -------------------- SENZORS -----------------------
// FIRST VARIANT HOWTO INSERT DATA - BY PARAMETERS
//-----------------------------------------------------

//CREATE -------------

func GetCreateCellarSenzorMutation() *graphql.Field {
	return &graphql.Field{
		Type: CellarSenzorType,
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"state": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"path": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"type": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"firmware": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"ipaddress": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"wifissid": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"wifipassword": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"mqtturl": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[mutation] create CellarSenzor\n")

			item := &iot.CellarSenzor{
				Name:         params.Args["name"].(string),
				State:        params.Args["state"].(string),
				Path:         params.Args["path"].(string),
				Type:         params.Args["type"].(string),
				Firmware:     params.Args["firmware"].(string),
				IpAddress:    params.Args["ipaddress"].(string),
				WifiSSID:     params.Args["wifissid"].(string),
				WifiPassword: params.Args["wifipassword"].(string),
				MQTTUrl:      params.Args["pamqtturlth"].(string),
			}

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.AddSenzor(*item)
			MyServiceLock.Unlock()

			return result, err
		},
	}
}

//DELETE -------------

func GetDeleteCellarSenzorMutation() *graphql.Field {
	return &graphql.Field{
		Type: graphql.String,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[mutation] delete CellarSenzor\n")

			id := params.Args["id"].(string)

			// Goroutines safe
			MyServiceLock.Lock()
			err := MyService.RemoveSenzor(id)
			MyServiceLock.Unlock()

			return nil, err
		},
	}
}

//UPDATE -------------

func GetUpdateCellarSenzorMutation() *graphql.Field {
	return &graphql.Field{
		Type: CellarSenzorType,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"name": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"state": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"path": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"type": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"firmware": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"ipaddress": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"wifissid": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"wifipassword": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"mqtturl": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[mutation] update CellarSenzor\n")

			item := &iot.CellarSenzor{
				ID:           bson.ObjectIdHex(params.Args["id"].(string)),
				Name:         params.Args["name"].(string),
				State:        params.Args["state"].(string),
				Path:         params.Args["path"].(string),
				Type:         params.Args["type"].(string),
				Firmware:     params.Args["firmware"].(string),
				IpAddress:    params.Args["ipaddress"].(string),
				WifiSSID:     params.Args["wifissid"].(string),
				WifiPassword: params.Args["wifipassword"].(string),
				MQTTUrl:      params.Args["pamqtturlth"].(string),
			}

			// Goroutines safe
			MyServiceLock.Lock()
			result, err := MyService.UpdateSenzor(*item)
			MyServiceLock.Unlock()

			return result, err
		},
	}
}
