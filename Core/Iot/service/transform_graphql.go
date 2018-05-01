package service

import (
	"log"
	"net/http"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

func MakeGraphqlHandler(queries graphql.Fields, mutations graphql.Fields) http.Handler {

	schemaConfig := graphql.SchemaConfig{
		Query: graphql.NewObject(graphql.ObjectConfig{
			Name:   "RootQuery",
			Fields: queries,
		}),
		Mutation: graphql.NewObject(graphql.ObjectConfig{
			Name:   "RootMutation",
			Fields: mutations,
		}),
		// Subscription: subscriptionType,
	}
	schema, err := graphql.NewSchema(schemaConfig)

	if err != nil {
		log.Fatalf("Failed to create new schema, error: %v", err)
	}

	httpHandler := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	return httpHandler
}

func MakeGraphqlWSHandler() http.Handler {

	// // Create subscription manager and GraphQL WS handler
	// subscriptionManager = graphqlws.NewSubscriptionManager(&schema)
	// // subscriptionManager.
	// websocketHandler := graphqlws.NewHandler(graphqlws.HandlerConfig{
	// 	SubscriptionManager: subscriptionManager,
	// 	Authenticate: func(token string) (interface{}, error) {
	// 		return "Default user", nil
	// 	},
	// })
	return nil
}
