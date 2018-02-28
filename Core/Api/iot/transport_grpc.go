package iot

import (
	grpctransport "github.com/go-kit/kit/transport/grpc"
	"golang.org/x/net/context"

	pb "github.com/cellarstone/Cellar.Hub/Core/Api/pb"
)

type grpcServer struct {
	getallspaces grpctransport.Handler
}

// implement LoremServer Interface in lorem.pb.go
func (s *grpcServer) GetAllSpaces(ctx context.Context, r *pb.GetAllSpacesRequest) (*pb.GetAllSpacesResponse, error) {
	_, resp, err := s.getallspaces.ServeGRPC(ctx, r)
	if err != nil {
		return nil, err
	}
	return resp.(*pb.GetAllSpacesResponse), nil
}

func MakeGrpcHandler(ctx context.Context, endpoint Endpoints) pb.IoTServiceServer {
	return &grpcServer{
		getallspaces: grpctransport.NewServer(
			endpoint.GetAllSpacesEndpoint,
			decodeGetAllSpacesRequestGRPC,
			encodeGetAllSpacesResponseGRPC,
		),
	}
}

func encodeGetAllSpacesRequestGRPC(_ context.Context, r interface{}) (interface{}, error) {
	return &pb.GetAllSpacesRequest{}, nil
}

func decodeGetAllSpacesRequestGRPC(_ context.Context, r interface{}) (interface{}, error) {
	return GetAllSpacesRequest{}, nil
}

func encodeGetAllSpacesResponseGRPC(_ context.Context, r interface{}) (interface{}, error) {
	resp := r.(pb.GetAllSpacesResponse)
	return &pb.GetAllSpacesResponse{
		Result: resp.Result,
	}, nil
}

func decodeGetAllSpacesResponseGRPC(_ context.Context, r interface{}) (interface{}, error) {
	resp := r.(*pb.GetAllSpacesResponse)
	return pb.GetAllSpacesResponse{
		Result: resp.Result,
	}, nil
}
