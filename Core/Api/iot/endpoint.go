package iot

import (
	"context"

	"github.com/go-kit/kit/endpoint"
)

type Endpoints struct {
	//Space
	GetAllSpacesEndpoint  endpoint.Endpoint
	GetRootSpacesEndpoint endpoint.Endpoint
	GetSpacesEndpoint     endpoint.Endpoint
	RemoveSpacesEndpoint  endpoint.Endpoint
	GetSpaceEndpoint      endpoint.Endpoint
	AddSpaceEndpoint      endpoint.Endpoint
	RemoveSpaceEndpoint   endpoint.Endpoint
	UpdateSpaceEndpoint   endpoint.Endpoint
	//Senzor
	GetAllSenzorsEndpoint endpoint.Endpoint
	GetSenzorsEndpoint    endpoint.Endpoint
	RemoveSenzorsEndpoint endpoint.Endpoint
	GetSenzorEndpoint     endpoint.Endpoint
	AddSenzorEndpoint     endpoint.Endpoint
	RemoveSenzorEndpoint  endpoint.Endpoint
	UpdateSenzorEndpoint  endpoint.Endpoint
	//Place
	GetAllPlacesEndpoint endpoint.Endpoint
	GetPlaceEndpoint     endpoint.Endpoint
	AddPlaceEndpoint     endpoint.Endpoint
	RemovePlaceEndpoint  endpoint.Endpoint
	UpdatePlaceEndpoint  endpoint.Endpoint
}

//-----------------------------
// SPACE
//-----------------------------

type GetAllSpacesRequest struct{}

type GetAllSpacesResponse struct {
	Result []CellarSpace `json:"result"`
}

func MakeGetAllSpacesEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		//call service
		result, err := svc.GetAllSpaces()
		if err != nil {
			return nil, err
		}

		return GetAllSpacesResponse{Result: result}, nil
	}
}

type GetRootSpacesRequest struct{}

type GetRootSpacesResponse struct {
	Result []CellarSpace `json:"result"`
}

func MakeGetRootSpacesEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		//call service
		result, err := svc.GetRootSpaces()
		if err != nil {
			return nil, err
		}

		return GetRootSpacesResponse{Result: result}, nil
	}
}

type GetSpacesRequest struct {
	Path string `json:"path"`
}

type GetSpacesResponse struct {
	Result []CellarSpace `json:"result"`
}

func MakeGetSpacesEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(GetSpacesRequest)

		//call service
		result, err := svc.GetSpaces(req.Path)
		if err != nil {
			return nil, err
		}

		return GetSpacesResponse{Result: result}, nil
	}
}

type RemoveSpacesRequest struct {
	Path string `json:"path"`
}

type RemoveSpacesResponse struct {
}

func MakeRemoveSpacesEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(RemoveSpacesRequest)

		//call service
		err := svc.RemoveSpaces(req.Path)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}
}

type GetSpaceRequest struct {
	Path string `json:"path"`
}

type GetSpaceResponse struct {
	Result CellarSpace `json:"result"`
}

func MakeGetSpaceEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(GetSpaceRequest)

		//call service
		result, err := svc.GetSpace(req.Path)
		if err != nil {
			return nil, err
		}

		return result, nil
	}
}

type AddSpaceRequest struct {
	Item CellarSpace `json:"item"`
}

type AddSpaceResponse struct {
}

func MakeAddSpaceEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(AddSpaceRequest)

		//call service
		err := svc.AddSpace(req.Item)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}
}

type RemoveSpaceRequest struct {
	Id string `json:"id"`
}

type RemoveSpaceResponse struct {
}

func MakeRemoveSpaceEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(RemoveSpaceRequest)

		//call service
		err := svc.RemoveSpace(req.Id)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}
}

type UpdateSpaceRequest struct {
	Item CellarSpace `json:"item"`
}

type UpdateSpaceResponse struct {
}

func MakeUpdateSpaceEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(UpdateSpaceRequest)

		//call service
		err := svc.UpdateSpace(req.Item)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}
}

//-----------------------------
// SENZOR
//-----------------------------

type GetAllSenzorsRequest struct{}

type GetAllSenzorsResponse struct {
	Result []CellarSenzor `json:"result"`
}

func MakeGetAllSenzorsEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		//call service
		result, err := svc.GetAllSenzors()
		if err != nil {
			return nil, err
		}

		return GetAllSenzorsResponse{Result: result}, nil
	}
}

type GetSenzorsRequest struct {
	Path string `json:"path"`
}

type GetSenzorsResponse struct {
	Result []CellarSenzor `json:"result"`
}

func MakeGetSenzorsEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(GetSenzorsRequest)

		//call service
		result, err := svc.GetSenzors(req.Path)
		if err != nil {
			return nil, err
		}

		return GetSenzorsResponse{Result: result}, nil
	}
}

type RemoveSenzorsRequest struct {
	Path string `json:"path"`
}

type RemoveSenzorsResponse struct {
}

func MakeRemoveSenzorsEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(RemoveSenzorsRequest)

		//call service
		err := svc.RemoveSenzors(req.Path)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}
}

type GetSenzorRequest struct {
	Path string `json:"path"`
}

type GetSenzorResponse struct {
	Result CellarSenzor `json:"result"`
}

func MakeGetSenzorEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(GetSenzorRequest)

		//call service
		result, err := svc.GetSenzor(req.Path)
		if err != nil {
			return nil, err
		}

		return result, nil
	}
}

type AddSenzorRequest struct {
	Item CellarSenzor `json:"item"`
}

type AddSenzorResponse struct {
}

func MakeAddSenzorEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(AddSenzorRequest)

		//call service
		err := svc.AddSenzor(req.Item)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}
}

type RemoveSenzorRequest struct {
	Id string `json:"id"`
}

type RemoveSenzorResponse struct {
}

func MakeRemoveSenzorEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(RemoveSenzorRequest)

		//call service
		err := svc.RemoveSenzor(req.Id)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}
}

type UpdateSenzorRequest struct {
	Item CellarSenzor `json:"item"`
}

type UpdateSenzorResponse struct {
}

func MakeUpdateSenzorEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(UpdateSenzorRequest)

		//call service
		err := svc.UpdateSenzor(req.Item)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}
}

//-----------------------------
// PLACE
//-----------------------------

type GetAllPlacesRequest struct{}

type GetAllPlacesResponse struct {
	Result []CellarPlace `json:"result"`
}

func MakeGetAllPlacesEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		//call service
		result, err := svc.GetAllPlaces()
		if err != nil {
			return nil, err
		}

		return GetAllPlacesResponse{Result: result}, nil
	}
}

type GetPlaceRequest struct {
	Path string `json:"path"`
}

type GetPlaceResponse struct {
	Result CellarPlace `json:"result"`
}

func MakeGetPlaceEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(GetPlaceRequest)

		//call service
		result, err := svc.GetPlace(req.Path)
		if err != nil {
			return nil, err
		}

		return result, nil
	}
}

type AddPlaceRequest struct {
	Item CellarPlace `json:"item"`
}

type AddPlaceResponse struct {
}

func MakeAddPlaceEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(AddPlaceRequest)

		//call service
		err := svc.AddPlace(req.Item)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}
}

type RemovePlaceRequest struct {
	Id string `json:"id"`
}

type RemovePlaceResponse struct {
}

func MakeRemovePlaceEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(RemovePlaceRequest)

		//call service
		err := svc.RemovePlace(req.Id)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}
}

type UpdatePlaceRequest struct {
	Item CellarPlace `json:"item"`
}

type UpdatePlaceResponse struct {
}

func MakeUpdatePlaceEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(UpdatePlaceRequest)

		//call service
		err := svc.UpdatePlace(req.Item)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}
}
