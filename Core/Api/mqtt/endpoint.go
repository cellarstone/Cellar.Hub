package mqtt

import (
	"context"

	"github.com/go-kit/kit/endpoint"
)

type Endpoints struct {
	PublishToMqttEndpoint endpoint.Endpoint
}

type PublishToMqttRequest struct {
	Topic string `json:"topic"`
	Value string `json:"value"`
}

type PublishToMqttResponse struct {
	Result string `json:"result"`
}

func MakePublishToMqttEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(PublishToMqttRequest)

		//call service
		result2 := svc.PublishToMqtt(req.Topic, req.Value)
		if result2 != nil {
			return PublishToMqttResponse{Result: "ERROR"}, result2
		}

		return PublishToMqttResponse{Result: "OK"}, nil
	}
}
