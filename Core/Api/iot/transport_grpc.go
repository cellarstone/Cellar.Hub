package iot

import (
	"fmt"

	grpctransport "github.com/go-kit/kit/transport/grpc"
	"golang.org/x/net/context"

	pb "github.com/cellarstone/Cellar.Hub/Core/Api/pb"
)

type grpcServer struct {
	getallspaces grpctransport.Handler
	getsenzor    grpctransport.Handler
}

// implement LoremServer Interface in lorem.pb.go
func (s *grpcServer) GetAllSpaces(ctx context.Context, r *pb.GetAllSpacesRequest) (*pb.GetAllSpacesResponse, error) {
	_, resp, err := s.getallspaces.ServeGRPC(ctx, r)
	if err != nil {
		return nil, err
	}
	return resp.(*pb.GetAllSpacesResponse), nil
}

func (s *grpcServer) GetSenzor(ctx context.Context, r *pb.GetSenzorRequest) (*pb.GetSenzorResponse, error) {

	//mapping
	asdf := GetSenzorRequest{
		Id: r.Id,
	}

	_, resp, err := s.getsenzor.ServeGRPC(ctx, asdf)
	if err != nil {
		return nil, err
	}
	return resp.(*pb.GetSenzorResponse), nil
}

func MakeGrpcHandler(ctx context.Context, endpoint Endpoints) pb.IoTServiceServer {
	return &grpcServer{
		getallspaces: grpctransport.NewServer(
			endpoint.GetAllSpacesEndpoint,
			decodeGetAllSpacesRequestGRPC,
			encodeGetAllSpacesResponseGRPC,
		),
		getsenzor: grpctransport.NewServer(
			endpoint.GetSenzorEndpoint,
			decodeGetSenzorRequestGRPC,
			encodeGetSenzorResponseGRPC,
		),
	}
}

// func encodeGetAllSpacesRequestGRPC(_ context.Context, r interface{}) (interface{}, error) {
// 	return &pb.GetAllSpacesRequest{}, nil
// }

func decodeGetAllSpacesRequestGRPC(_ context.Context, r interface{}) (interface{}, error) {
	return GetAllSpacesRequest{}, nil
}

func encodeGetAllSpacesResponseGRPC(_ context.Context, r interface{}) (interface{}, error) {
	resp := r.(GetAllSpacesResponse)
	fmt.Println(resp)

	var data []*pb.CellarSpace

	for _, item := range resp.Data {
		data = append(data, &pb.CellarSpace{
			Id:    string(item.ID),
			Name:  item.Name,
			Path:  item.Path,
			State: item.State,
			Image: item.Image,
		})
	}

	return &pb.GetAllSpacesResponse{
		Data: data,
	}, nil
}

// func decodeGetAllSpacesResponseGRPC(_ context.Context, r interface{}) (interface{}, error) {
// 	resp := r.(GetAllSpacesResponse)
// 	return pb.GetAllSpacesResponse{
// 		Data: resp.Data,
// 	}, nil
// }

func decodeGetSenzorRequestGRPC(_ context.Context, r interface{}) (interface{}, error) {
	req := r.(GetSenzorRequest)
	return GetSenzorRequest{
		Id: req.Id,
	}, nil
}

func encodeGetSenzorResponseGRPC(_ context.Context, r interface{}) (interface{}, error) {
	resp := r.(CellarSenzor)
	fmt.Println(resp)

	data := &pb.CellarSenzor{
		Id:           string(resp.ID),
		Name:         resp.Name,
		Path:         resp.Path,
		State:        resp.State,
		Type:         resp.Type,
		Firmware:     resp.Firmware,
		IpAdrress:    resp.IpAddress,
		WifiSSID:     resp.WifiSSID,
		WifiPassword: resp.WifiPassword,
		MQTTUrl:      resp.MQTTUrl,
	}

	return &pb.GetSenzorResponse{
		Data: data,
	}, nil
}
