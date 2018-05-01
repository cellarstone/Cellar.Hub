package service

import (
	"context"
	"fmt"
	"log"

	"gopkg.in/mgo.v2/bson"

	pb "github.com/cellarstone/Cellar.Hub/Modules/Office/Api/pb/externall"
	"google.golang.org/grpc"
	mgo "gopkg.in/mgo.v2"
)

//-----------------------------
//-----------------------------
// SERVICE METHODS
//-----------------------------
//-----------------------------

type Service interface {
	//MeetingRooms
	GetAllMeetingRooms() ([]CellarMeetingRoom, error)
	GetMeetingRoom(id string) (CellarMeetingRoom, error)
	AddMeetingRoom(item CellarMeetingRoom) (CellarMeetingRoom, error)
	RemoveMeetingRoom(id string) error
	UpdateMeetingRoom(item CellarMeetingRoom) (CellarMeetingRoom, error)
	//MeetingRooms-Model
	GetAllMeetingRoomsModel() ([]MeetingRoomVM, error)
	GetMeetingRoomModel(id string) (MeetingRoomVM, error)
	//Space
	GetAllSpaces() ([]Space, error)
	GetSpaceInfo(id string) (SpaceInfo, error)
	GetSpaceTimeline(id string) ([]MeetingInfo, error)
	GetSpaceState(id string) (string, error)
	//Calendar
	// GetSpaceCalendar(id string) ([]CalendarItem, error)
	// GetDayInfo(spaceid string, year int, month int, day int) ([]MeetingInfo, error)
	// GetMeetingInfo(meetingid string) (MeetingInfo, error)
	// AddNewMeeting(item MeetingInfo) error
	// UpdateMeeting(item MeetingInfo) (MeetingInfo, error)
	// DeleteMeeting(id string) error
	//Reception
	CallForClean(spaceid string) error
	CallReception(spaceid string) error
	SomethingElse(spaceid string, text string) error
	GetSortiment(spaceid string) ([]CellarSortimentItem, error)
	PlaceOrder(spaceid string, item CellarOrder) error
	//User
	ValidatePin(pin string) (bool, error)
}

type OfficeApiService struct {
	MongoDbUrl         string
	Mqtturl            string
	IoTMicroserviceUrl string
}

var Database = "OfficeDatabase"
var session *mgo.Session

func NewService(mongodburl string, mqtturl string, iotmicroserviceurl string) *OfficeApiService {

	var err error
	if session, err = mgo.Dial(mongodburl); err != nil {
		log.Fatal(err)
	}

	return &OfficeApiService{
		MongoDbUrl:         mongodburl,
		Mqtturl:            mqtturl,
		IoTMicroserviceUrl: iotmicroserviceurl,
	}
}

//-----------------------------
// MEETING ROOM
//-----------------------------

func (s OfficeApiService) GetAllMeetingRooms() ([]CellarMeetingRoom, error) {
	sess := session.Clone()
	defer sess.Close()

	//SELECT TABLE
	table := sess.DB(Database).C("MeetingRooms")

	//SELECT
	var result []CellarMeetingRoom
	err := table.Find(nil).All(&result)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s OfficeApiService) GetMeetingRoom(id string) (CellarMeetingRoom, error) {
	sess := session.Clone()
	defer sess.Close()

	//SELECT TABLE
	table := sess.DB(Database).C("MeetingRooms")

	//SELECT
	var result CellarMeetingRoom
	err := table.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&result)
	if err != nil {
		return CellarMeetingRoom{}, err
	}

	return result, nil
}

func (s OfficeApiService) AddMeetingRoom(item CellarMeetingRoom) (CellarMeetingRoom, error) {
	sess := session.Clone()
	defer sess.Close()

	//SELECT TABLE
	table := sess.DB(Database).C("MeetingRooms")

	//SELECT
	err := table.Insert(&item)
	if err != nil {
		return CellarMeetingRoom{}, err
	}

	return item, nil
}

func (s OfficeApiService) RemoveMeetingRoom(id string) error {
	sess := session.Clone()
	defer sess.Close()

	//SELECT TABLE
	table := sess.DB(Database).C("MeetingRooms")

	//SELECT
	err := table.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}

	return nil
}

func (s OfficeApiService) UpdateMeetingRoom(item CellarMeetingRoom) (CellarMeetingRoom, error) {
	sess := session.Clone()
	defer sess.Close()

	//SELECT TABLE
	table := sess.DB(Database).C("MeetingRooms")

	// Update
	colQuerier := bson.M{"_id": item.ID}
	err := table.Update(colQuerier, item)
	if err != nil {
		return CellarMeetingRoom{}, err
	}

	return item, nil
}

//-----------------------------
// MEETING ROOM - MODEL
// COMBINATION of CellarSpace and CellarMeetingRoom
//-----------------------------

func (s OfficeApiService) GetAllMeetingRoomsModel() ([]MeetingRoomVM, error) {

	spaces, err := s.GetAllSpaces()
	if err != nil {
		return nil, err
	}

	meetingRooms, err := s.GetAllMeetingRooms()
	if err != nil {
		return nil, err
	}

	result := []MeetingRoomVM{}

	for _, item1 := range meetingRooms {
		for _, item2 := range spaces {
			if item1.ID == item2.ID {

				asdf := MeetingRoomVM{
					ID:    item1.ID,
					Name:  item2.Name,
					Path:  item2.Path,
					Email: item1.Email,
				}

				result = append(result, asdf)
			}
		}
	}

	return result, nil
}

func (s OfficeApiService) GetMeetingRoomModel(id string) (MeetingRoomVM, error) {

	result := MeetingRoomVM{}

	spaces, err := s.GetAllSpaces()
	if err != nil {
		return result, err
	}

	fmt.Println(spaces)

	meetingRooms, err := s.GetAllMeetingRooms()
	if err != nil {
		return result, err
	}

	fmt.Println(meetingRooms)

	for _, item1 := range meetingRooms {
		for _, item2 := range spaces {

			if item1.ID.Hex() == item2.ID.Hex() && item1.ID.Hex() == id {

				result = MeetingRoomVM{
					ID:    item1.ID,
					Name:  item2.Name,
					Path:  item2.Path,
					Email: item1.Email,
				}

				fmt.Println(item1.ID.Hex() + " - " + item2.ID.Hex())
				fmt.Println(result)

			}
		}
	}

	fmt.Println(result)
	return result, nil
}

//-----------------------------
// SPACE
//-----------------------------

func (s OfficeApiService) GetAllSpaces() (result []Space, err error) {
	// gRPC -----------------------------------
	conn, err := grpc.Dial(s.IoTMicroserviceUrl, grpc.WithInsecure())
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	client := pb.NewIoTServiceClient(conn)

	request := &pb.GetAllSpacesRequest{}

	allspacesResponse, err := client.GetAllSpaces(context.Background(), request)
	if err != nil {
		return nil, err
	}

	spaces := (*allspacesResponse).Data

	for _, item := range spaces {

		//fmt.Println(item)

		asdf := Space{
			ID:    bson.ObjectIdHex(item.Id),
			Name:  item.Name,
			Image: item.Image,
			Path:  item.Path,
		}

		result = append(result, asdf)
	}

	return result, nil
}

func (s OfficeApiService) GetSpaceInfo(id string) (SpaceInfo, error) {
	return SpaceInfo{}, nil
}

func (s OfficeApiService) GetSpaceTimeline(id string) ([]MeetingInfo, error) {
	return []MeetingInfo{}, nil
}

func (s OfficeApiService) GetSpaceState(id string) (string, error) {
	return "", nil
}

//-----------------------------
// CALENDAR
//-----------------------------

// func (s OfficeApiService) GetSpaceCalendar(id string) ([]CalendarItem, error) {
// 	return []CalendarItem{}, nil
// }

// func (s OfficeApiService) GetDayInfo(spaceid string, year int, month int, day int) ([]MeetingInfo, error) {
// 	return []MeetingInfo{}, nil
// }

// func (s OfficeApiService) GetMeetingInfo(meetingid string) (MeetingInfo, error) {
// 	return MeetingInfo{}, nil
// }

// func (s OfficeApiService) AddNewMeeting(item MeetingInfo) error {
// 	return nil
// }

// func (s OfficeApiService) UpdateMeeting(item MeetingInfo) (MeetingInfo, error) {
// 	return MeetingInfo{}, nil
// }

// func (s OfficeApiService) DeleteMeeting(id string) error {
// 	return nil
// }

//-----------------------------
// RECEPTION
//-----------------------------

func (s OfficeApiService) CallForClean(spaceid string) error {
	return nil
}
func (s OfficeApiService) CallReception(spaceid string) error {
	return nil
}
func (s OfficeApiService) SomethingElse(spaceid string, text string) error {
	return nil
}
func (s OfficeApiService) GetSortiment(spaceid string) ([]CellarSortimentItem, error) {
	return []CellarSortimentItem{}, nil
}
func (s OfficeApiService) PlaceOrder(spaceid string, item CellarOrder) error {
	return nil
}

//-----------------------------
// USER
//-----------------------------

func (s OfficeApiService) ValidatePin(pin string) (bool, error) {
	return true, nil
}
