package service

import (
	grpctransport "github.com/go-kit/kit/transport/grpc"
	"golang.org/x/net/context"

	pb "github.com/cellarstone/Cellar.Hub/Core/User/pb"
)

type grpcServer struct {
	getallusers grpctransport.Handler
}

// implement LoremServer Interface in lorem.pb.go
func (s *grpcServer) GetAllUsers(ctx context.Context, r *pb.GetAllUsersRequest) (*pb.GetAllUsersResponse, error) {
	_, resp, err := s.getallusers.ServeGRPC(ctx, r)
	if err != nil {
		return nil, err
	}
	return resp.(*pb.GetAllUsersResponse), nil
}

func MakeGrpcHandler(ctx context.Context, endpoint Endpoints) pb.UserServiceServer {
	return &grpcServer{
		getallusers: grpctransport.NewServer(
			endpoint.GetAllUsersEndpoint,
			decodeGetAllUsersRequestGRPC,
			encodeGetAllUsersResponseGRPC,
		),
	}
}

// func encodeGetAllSpacesRequestGRPC(_ context.Context, r interface{}) (interface{}, error) {
// 	return &pb.GetAllSpacesRequest{}, nil
// }

func decodeGetAllUsersRequestGRPC(_ context.Context, r interface{}) (interface{}, error) {
	return GetAllUsersRequest{}, nil
}

func encodeGetAllUsersResponseGRPC(_ context.Context, r interface{}) (interface{}, error) {
	resp := r.(GetAllUsersResponse)
	// fmt.Println(resp)

	var data []*pb.CellarUser

	for _, item := range resp.Data {
		data = append(data, &pb.CellarUser{
			Id:    string(item.ID),
			Name:  item.Name,
			State: item.State,
			Image: item.Image,
		})
	}

	return &pb.GetAllUsersResponse{
		Data: data,
	}, nil
}

// func decodeGetAllSpacesResponseGRPC(_ context.Context, r interface{}) (interface{}, error) {
// 	resp := r.(GetAllSpacesResponse)
// 	return pb.GetAllSpacesResponse{
// 		Data: resp.Data,
// 	}, nil
// }
