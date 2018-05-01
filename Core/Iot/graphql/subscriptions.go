package cellargraphql

// import (
// 	"github.com/functionalfoundry/graphqlws"
// 	"github.com/graphql-go/graphql"
// 	"gopkg.in/mgo.v2/bson"
// )

// var subscriptionType = graphql.NewObject(
// 	graphql.ObjectConfig{
// 		Name: "Subscription",
// 		Fields: graphql.Fields{
// 			"newSpace": &graphql.Field{
// 				Type: CellarSpaceType,
// 				Resolve: func(p graphql.ResolveParams) (interface{}, error) {

// 					//fmt.Println(p.Args)
// 					//fmt.Println(p.Context)
// 					//fmt.Println(p.Info)
// 					//fmt.Println(p.Source)

// 					asfdaf := RandStringBytesMaskImprSrc(5)

// 					conn := mockWebSocketConnection{
// 						id: asfdaf,
// 					}

// 					// Add two valid subscriptions
// 					sub1 := graphqlws.Subscription{
// 						ID:         asfdaf,
// 						Connection: &conn,
// 						Query:      "subscription { newSpace { id,name }}",
// 						SendData: func(msg *graphqlws.DataMessagePayload) {
// 							// Do nothing
// 						},
// 					}
// 					subscriptionManager.AddSubscription(&conn, &sub1)

// 					//OTHER
// 					item := CellarSpace{
// 						ID:   bson.NewObjectId(),
// 						Name: RandStringBytesMaskImprSrc(5),
// 					}

// 					return item, nil
// 				},
// 			},
// 		},
// 	})

// type mockWebSocketConnection struct {
// 	user string
// 	id   string
// }

// func (c mockWebSocketConnection) ID() string {
// 	return c.id
// }

// func (c mockWebSocketConnection) User() interface{} {
// 	return c.user
// }

// func (c mockWebSocketConnection) SendData(
// 	opID string,
// 	data *graphqlws.DataMessagePayload,
// ) {
// 	// Do nothing
// }

// func (c mockWebSocketConnection) SendError(err error) {
// 	// Do nothing
// }
