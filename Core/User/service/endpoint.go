package service

import (
	"context"

	"github.com/go-kit/kit/endpoint"
)

type Endpoints struct {
	//User
	GetAllUsersEndpoint endpoint.Endpoint
}

//-----------------------------
// USER
//-----------------------------

type GetAllUsersRequest struct{}

type GetAllUsersResponse struct {
	Data []CellarUser `json:"data"`
}

func MakeGetAllUsersEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		//call service
		result, err := svc.GetAllUsers()
		if err != nil {
			return nil, err
		}

		return GetAllUsersResponse{Data: result}, nil
	}
}
