package service

import (
	"context"

	"github.com/go-kit/kit/endpoint"
)

type Endpoints struct {
	//MeetingRoom
	GetAllMeetingRooms endpoint.Endpoint
	GetMeetingRoom     endpoint.Endpoint
	AddMeetingRoom     endpoint.Endpoint
	RemoveMeetingRoom  endpoint.Endpoint
	UpdateMeetingRoom  endpoint.Endpoint
	//MeetingRoom-Model
	GetAllMeetingRoomsModel endpoint.Endpoint
	GetMeetingRoomModel     endpoint.Endpoint
	//Space
	GetAllSpacesEndpoint     endpoint.Endpoint
	GetSpaceInfoEndpoint     endpoint.Endpoint
	GetSpaceTimelineEndpoint endpoint.Endpoint
	GetSpaceStateEndpoint    endpoint.Endpoint
	//Calendar
	// GetSpaceCalendarEndpoint endpoint.Endpoint
	// GetDayInfoEndpoint       endpoint.Endpoint
	// GetMeetingInfoEndpoint   endpoint.Endpoint
	// AddNewMeetingEndpoint    endpoint.Endpoint
	// UpdateMeetingEndpoint    endpoint.Endpoint
	// DeleteMeetingEndpoint    endpoint.Endpoint
	//Reception
	CallForCleanEndpoint  endpoint.Endpoint
	CallReceptionEndpoint endpoint.Endpoint
	SomethingElseEndpoint endpoint.Endpoint
	GetSortimentEndpoint  endpoint.Endpoint
	PlaceOrderEndpoint    endpoint.Endpoint
	//User
	ValidatePinEndpoint endpoint.Endpoint
}

//-----------------------------
// MEETING ROOM
//-----------------------------

type GetAllMeetingRoomsRequest struct{}

type GetAllMeetingRoomsResponse struct {
	Data []CellarMeetingRoom `json:"data"`
}

func MakeGetAllMeetingRoomsEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		//call service
		result, err := svc.GetAllMeetingRooms()
		if err != nil {
			return nil, err
		}

		return GetAllMeetingRoomsResponse{Data: result}, nil
	}
}

type GetMeetingRoomRequest struct {
	Id string `json:"id"`
}

type GetMeetingRoomResponse struct {
	Data CellarMeetingRoom `json:"data"`
}

func MakeGetMeetingRoomEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(GetMeetingRoomRequest)

		//call service
		result, err := svc.GetMeetingRoom(req.Id)
		if err != nil {
			return nil, err
		}

		return result, nil
	}
}

type AddMeetingRoomRequest struct {
	Item CellarMeetingRoom `json:"item"`
}

type AddMeetingRoomResponse struct {
	Item CellarMeetingRoom `json:"item"`
}

func MakeAddMeetingRoomEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(AddMeetingRoomRequest)

		//call service
		item, err := svc.AddMeetingRoom(req.Item)
		if err != nil {
			return nil, err
		}

		return item, nil
	}
}

type RemoveMeetingRoomRequest struct {
	Id string `json:"id"`
}

type RemoveMeetingRoomResponse struct {
}

func MakeRemoveMeetingRoomEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(RemoveMeetingRoomRequest)

		//call service
		err := svc.RemoveMeetingRoom(req.Id)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}
}

type UpdateMeetingRoomRequest struct {
	Item CellarMeetingRoom `json:"item"`
}

type UpdateMeetingRoomResponse struct {
	Item CellarMeetingRoom `json:"item"`
}

func MakeUpdateMeetingRoomEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(UpdateMeetingRoomRequest)

		//call service
		item, err := svc.UpdateMeetingRoom(req.Item)
		if err != nil {
			return nil, err
		}

		return item, nil
	}
}

//-----------------------------
// MEETING ROOM - MODEL
// COMBINATION of CellarSpace and CellarMeetingRoom
//-----------------------------

type GetAllMeetingRoomsModelRequest struct{}

type GetAllMeetingRoomsModelResponse struct {
	Data []MeetingRoomVM `json:"data"`
}

func MakeGetAllMeetingRoomsModelEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		//call service
		result, err := svc.GetAllMeetingRoomsModel()
		if err != nil {
			return nil, err
		}

		return GetAllMeetingRoomsModelResponse{Data: result}, nil
	}
}

type GetMeetingRoomModelRequest struct {
	Id string `json:"id"`
}

type GetMeetingRoomModelResponse struct {
	Data MeetingRoomVM `json:"data"`
}

func MakeGetMeetingRoomModelEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(GetMeetingRoomModelRequest)

		//call service
		result, err := svc.GetMeetingRoomModel(req.Id)
		if err != nil {
			return nil, err
		}

		return result, nil
	}
}

//-----------------------------
// SPACE
//-----------------------------

type GetAllSpacesRequest struct{}

type GetAllSpacesResponse struct {
	Data []Space `json:"data"`
}

func MakeGetAllSpacesEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		//call service
		result, err := svc.GetAllSpaces()
		if err != nil {
			return nil, err
		}

		return GetAllSpacesResponse{Data: result}, nil
	}
}

type GetSpaceInfoRequest struct {
	Id string `json:"id"`
}

type GetSpaceInfoResponse struct {
	Data SpaceInfo `json:"data"`
}

func MakeGetSpaceInfoEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(GetSpaceInfoRequest)

		//call service
		result, err := svc.GetSpaceInfo(req.Id)
		if err != nil {
			return nil, err
		}

		return GetSpaceInfoResponse{Data: result}, nil
	}
}

type GetSpaceTimelineRequest struct {
	Id string `json:"id"`
}

type GetSpaceTimelineResponse struct {
	Data []MeetingInfo `json:"data"`
}

func MakeGetSpaceTimelineEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(GetSpaceTimelineRequest)

		//call service
		result, err := svc.GetSpaceTimeline(req.Id)
		if err != nil {
			return nil, err
		}

		return GetSpaceTimelineResponse{Data: result}, nil
	}
}

type GetSpaceStateRequest struct {
	Id string `json:"id"`
}

type GetSpaceStateResponse struct {
	Data string `json:"data"`
}

func MakeGetSpaceStateEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(GetSpaceStateRequest)

		//call service
		result, err := svc.GetSpaceState(req.Id)
		if err != nil {
			return nil, err
		}

		return GetSpaceStateResponse{Data: result}, nil
	}
}

//-----------------------------
// CALENDAR
//-----------------------------

// type GetSpaceCalendarRequest struct {
// 	Id string `json:"id"`
// }

// type GetSpaceCalendarResponse struct {
// 	Data []CalendarItem `json:"data"`
// }

// func MakeGetSpaceCalendarEndpoint(svc Service) endpoint.Endpoint {
// 	return func(ctx context.Context, request interface{}) (interface{}, error) {
// 		req := request.(GetSpaceCalendarRequest)

// 		//call service
// 		result, err := svc.GetSpaceCalendar(req.Id)
// 		if err != nil {
// 			return nil, err
// 		}

// 		//fmt.Println(result)

// 		return GetSpaceCalendarResponse{Data: result}, nil
// 	}
// }

// type GetDayInfoRequest struct {
// 	SpaceId string `json:"spaceid"`
// 	Year    int    `json:"year"`
// 	Month   int    `json:"month"`
// 	Day     int    `json:"day"`
// }

// type GetDayInfoResponse struct {
// 	Data []MeetingInfo `json:"data"`
// }

// func MakeGetDayInfoEndpoint(svc Service) endpoint.Endpoint {
// 	return func(ctx context.Context, request interface{}) (interface{}, error) {
// 		req := request.(GetDayInfoRequest)

// 		//call service
// 		result, err := svc.GetDayInfo(req.SpaceId, req.Year, req.Month, req.Day)
// 		if err != nil {
// 			return nil, err
// 		}

// 		//fmt.Println(result)

// 		return GetDayInfoResponse{Data: result}, nil
// 	}
// }

// type GetMeetingInfoRequest struct {
// 	MeetingId string `json:"meetingid"`
// }

// type GetMeetingInfoResponse struct {
// 	Data MeetingInfo `json:"data"`
// }

// func MakeGetMeetingInfoEndpoint(svc Service) endpoint.Endpoint {
// 	return func(ctx context.Context, request interface{}) (interface{}, error) {
// 		req := request.(GetMeetingInfoRequest)

// 		//call service
// 		result, err := svc.GetMeetingInfo(req.MeetingId)
// 		if err != nil {
// 			return nil, err
// 		}

// 		//fmt.Println(result)

// 		return GetMeetingInfoResponse{Data: result}, nil
// 	}
// }

// type AddNewMeetingRequest struct {
// 	Item MeetingInfo `json:"item"`
// }

// type AddNewMeetingResponse struct {
// }

// func MakeAddNewMeetingEndpoint(svc Service) endpoint.Endpoint {
// 	return func(ctx context.Context, request interface{}) (interface{}, error) {
// 		req := request.(AddNewMeetingRequest)

// 		//call service
// 		err := svc.AddNewMeeting(req.Item)
// 		if err != nil {
// 			return nil, err
// 		}

// 		//fmt.Println(result)

// 		return nil, nil
// 	}
// }

// type UpdateMeetingRequest struct {
// 	Item MeetingInfo `json:"item"`
// }

// type UpdateMeetingResponse struct {
// 	Item MeetingInfo `json:"item"`
// }

// func MakeUpdateMeetingEndpoint(svc Service) endpoint.Endpoint {
// 	return func(ctx context.Context, request interface{}) (interface{}, error) {
// 		req := request.(UpdateMeetingRequest)

// 		//call service
// 		result, err := svc.UpdateMeeting(req.Item)
// 		if err != nil {
// 			return nil, err
// 		}

// 		//fmt.Println(result)

// 		return result, nil
// 	}
// }

// type DeleteMeetingRequest struct {
// 	Id string `json:"id"`
// }

// type DeleteMeetingResponse struct {
// }

// func MakeDeleteMeetingEndpoint(svc Service) endpoint.Endpoint {
// 	return func(ctx context.Context, request interface{}) (interface{}, error) {
// 		req := request.(DeleteMeetingRequest)

// 		//call service
// 		err := svc.DeleteMeeting(req.Id)
// 		if err != nil {
// 			return nil, err
// 		}

// 		//fmt.Println(result)

// 		return nil, nil
// 	}
// }

//-----------------------------
// RECEPTION
//-----------------------------

type CallForCleanRequest struct {
	SpaceId string `json:"spaceid"`
}

type CallForCleanResponse struct {
}

func MakeCallForCleanEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CallForCleanRequest)

		//call service
		err := svc.CallForClean(req.SpaceId)
		if err != nil {
			return nil, err
		}

		//fmt.Println(result)

		return nil, nil
	}
}

type CallReceptionRequest struct {
	SpaceId string `json:"spaceid"`
}

type CallReceptionResponse struct {
}

func MakeCallReceptionEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CallReceptionRequest)

		//call service
		err := svc.CallReception(req.SpaceId)
		if err != nil {
			return nil, err
		}

		//fmt.Println(result)

		return nil, nil
	}
}

type SomethingElseRequest struct {
	SpaceId string `json:"spaceid"`
	Text    string `json:"text"`
}

type SomethingElseResponse struct {
}

func MakeSomethingElseEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(SomethingElseRequest)

		//call service
		err := svc.SomethingElse(req.SpaceId, req.Text)
		if err != nil {
			return nil, err
		}

		//fmt.Println(result)

		return nil, nil
	}
}

type GetSortimentRequest struct {
	SpaceId string `json:"spaceid"`
}

type GetSortimentResponse struct {
}

func MakeGetSortimentEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(GetSortimentRequest)

		//call service
		result, err := svc.GetSortiment(req.SpaceId)
		if err != nil {
			return nil, err
		}

		//fmt.Println(result)

		return result, nil
	}
}

type PlaceOrderRequest struct {
	SpaceId string      `json:"spaceid"`
	Item    CellarOrder `json:"item"`
}

type PlaceOrderResponse struct {
}

func MakePlaceOrderEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(PlaceOrderRequest)

		//call service
		err := svc.PlaceOrder(req.SpaceId, req.Item)
		if err != nil {
			return nil, err
		}

		//fmt.Println(result)

		return nil, nil
	}
}

//-----------------------------
// USER
//-----------------------------

type ValidatePinRequest struct {
	Pin string `json:"pin"`
}

type ValidatePinResponse struct {
	Data bool `json:"data"`
}

func MakeValidatePinEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(ValidatePinRequest)

		//call service
		result, err := svc.ValidatePin(req.Pin)
		if err != nil {
			return nil, err
		}

		//fmt.Println(result)

		return result, nil
	}
}
