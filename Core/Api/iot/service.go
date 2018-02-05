package iot

import (
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

//-----------------------------
//-----------------------------
// ENTITIES
//-----------------------------
//-----------------------------

type CellarSpace struct {
	ID    bson.ObjectId `json:"_id" bson:"_id,omitempty"`
	Name  string        `json:"name" bson:"name"`
	State string        `json:"state" bson:"state"`
	Image string        `json:"image" bson:"image"`
	Path  string        `json:"path" bson:"path"`
}

type CellarPlace struct {
	ID         bson.ObjectId `json:"_id" bson:"_id,omitempty"`
	Name       string        `json:"name" bson:"name"`
	State      string        `json:"state" bson:"state"`
	Path       string        `json:"path" bson:"path"`
	Country    string        `json:"country" bson:"country"`
	City       string        `json:"city" bson:"city"`
	Street     string        `json:"street" bson:"street"`
	Zipcode    string        `json:"zipcode" bson:"zipcode"`
	Latitude   string        `json:"latitude" bson:"latitude"`
	Longtitude string        `json:"longtitude" bson:"longtitude"`
}

type CellarSenzor struct {
	ID           bson.ObjectId `json:"_id" bson:"_id,omitempty"`
	Name         string        `json:"name" bson:"name"`
	State        string        `json:"state" bson:"state"`
	Path         string        `json:"path" bson:"path"`
	Type         string        `json:"type" bson:"type"`
	Firmware     string        `json:"firmware" bson:"firmware"`
	IpAddress    string        `json:"ipaddress" bson:"ipaddress"`
	WifiSSID     string        `json:"wifiSSID" bson:"wifiSSID"`
	WifiPassword string        `json:"wifiPassword" bson:"wifiPassword"`
	MQTTUrl      string        `json:"mqttUrl" bson:"mqttUrl"`
}

//-----------------------------
//-----------------------------
// SERVICE METHODS
//-----------------------------
//-----------------------------

type Service interface {
	//Space
	GetAllSpaces() ([]CellarSpace, error)
	GetRootSpaces() ([]CellarSpace, error)
	GetSpaces(path string) ([]CellarSpace, error)
	RemoveSpaces(path string) error
	GetSpace(path string) (CellarSpace, error)
	AddSpace(item CellarSpace) error
	RemoveSpace(id string) error
	UpdateSpace(item CellarSpace) error
	//Senzor
	GetAllSenzors() ([]CellarSenzor, error)
	GetSenzors(path string) ([]CellarSenzor, error)
	RemoveSenzors(path string) error
	GetSenzor(id string) (CellarSenzor, error)
	AddSenzor(item CellarSenzor) error
	RemoveSenzor(id string) error
	UpdateSenzor(item CellarSenzor) error
	//Place
	GetAllPlaces() ([]CellarPlace, error)
	GetPlace(id string) (CellarPlace, error)
	AddPlace(item CellarPlace) error
	RemovePlace(id string) error
	UpdatePlace(item CellarPlace) error
}

type IotService struct {
	MongoDbUrl string
}

var Database = "HubDatabase"

func NewService(mongodburl string) *IotService {
	return &IotService{
		MongoDbUrl: mongodburl,
	}
}

//-----------------------------
// SPACE
//-----------------------------

func (s IotService) GetAllSpaces() ([]CellarSpace, error) {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return nil, err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Spaces")

	//SELECT
	var result []CellarSpace
	err = table.Find(nil).All(&result)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s IotService) GetRootSpaces() ([]CellarSpace, error) {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return nil, err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Spaces")

	// var bsonQuery = "{path: /^\/[A-Za-z0-9]*$/ }"

	//SELECT
	var result []CellarSpace
	err = table.Find(bson.M{"path": bson.M{"$regex": bson.RegEx{`^\/[A-Za-z0-9]*$`, ""}}}).All(&result)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s IotService) GetSpaces(path string) ([]CellarSpace, error) {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return nil, err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Spaces")

	//SELECT
	var result []CellarSpace
	err = table.Find(bson.M{"path": bson.M{"$regex": bson.RegEx{`^` + path + `/`, ""}}}).All(&result)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s IotService) RemoveSpaces(path string) error {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Spaces")

	//SELECT
	_, err = table.RemoveAll(bson.M{"path": bson.M{"$regex": bson.RegEx{`^` + path + `/`, ""}}})
	if err != nil {
		return err
	}

	return nil
}

func (s IotService) GetSpace(path string) (CellarSpace, error) {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return CellarSpace{}, err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Spaces")

	//SELECT
	var result CellarSpace
	err = table.Find(bson.M{"path": path}).One(&result)
	if err != nil {
		return CellarSpace{}, err
	}

	return result, nil
}

func (s IotService) AddSpace(item CellarSpace) error {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Spaces")

	//SELECT
	err = table.Insert(&item)
	if err != nil {
		return err
	}

	return nil
}

func (s IotService) RemoveSpace(id string) error {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Spaces")

	//SELECT
	err = table.Remove(bson.M{"_id": id})
	if err != nil {
		return err
	}

	return nil
}

func (s IotService) UpdateSpace(item CellarSpace) error {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Spaces")

	// Update
	colQuerier := bson.M{"_id": item.ID}
	err = table.Update(colQuerier, item)
	if err != nil {
		panic(err)
	}

	return nil
}

//-----------------------------
// SENZOR
//-----------------------------

func (s IotService) GetAllSenzors() ([]CellarSenzor, error) {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return nil, err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Senzors")

	//SELECT
	var result []CellarSenzor
	err = table.Find(nil).All(&result)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s IotService) GetSenzors(path string) ([]CellarSenzor, error) {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return nil, err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Senzors")

	//SELECT
	var result []CellarSenzor
	err = table.Find(bson.M{"path": bson.M{"$regex": bson.RegEx{`^` + path + `/`, ""}}}).All(&result)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s IotService) RemoveSenzors(path string) error {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Senzors")

	//SELECT
	_, err = table.RemoveAll(bson.M{"path": bson.M{"$regex": bson.RegEx{`^` + path + `/`, ""}}})
	if err != nil {
		return err
	}

	return nil
}

func (s IotService) GetSenzor(path string) (CellarSenzor, error) {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return CellarSenzor{}, err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Senzors")

	//SELECT
	var result CellarSenzor
	err = table.Find(bson.M{"path": path}).One(&result)
	if err != nil {
		return CellarSenzor{}, err
	}

	return result, nil
}

func (s IotService) AddSenzor(item CellarSenzor) error {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Senzors")

	//SELECT
	err = table.Insert(&item)
	if err != nil {
		return err
	}

	return nil
}

func (s IotService) RemoveSenzor(id string) error {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Senzors")

	//SELECT
	err = table.Remove(bson.M{"_id": id})
	if err != nil {
		return err
	}

	return nil
}

func (s IotService) UpdateSenzor(item CellarSenzor) error {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Senzors")

	// Update
	colQuerier := bson.M{"_id": item.ID}
	err = table.Update(colQuerier, item)
	if err != nil {
		panic(err)
	}

	return nil
}

//-----------------------------
// PLACE
//-----------------------------

func (s IotService) GetAllPlaces() ([]CellarPlace, error) {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return nil, err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Places")

	//SELECT
	var result []CellarPlace
	err = table.Find(nil).All(&result)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s IotService) GetPlace(path string) (CellarPlace, error) {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return CellarPlace{}, err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Places")

	//SELECT
	var result CellarPlace
	err = table.Find(bson.M{"path": path}).One(&result)
	if err != nil {
		return CellarPlace{}, err
	}

	return result, nil
}

func (s IotService) AddPlace(item CellarPlace) error {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Places")

	//SELECT
	err = table.Insert(&item)
	if err != nil {
		return err
	}

	return nil
}

func (s IotService) RemovePlace(id string) error {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Places")

	//SELECT
	err = table.Remove(bson.M{"_id": id})
	if err != nil {
		return err
	}

	return nil
}

func (s IotService) UpdatePlace(item CellarPlace) error {
	session, err := mgo.Dial(s.MongoDbUrl)
	if err != nil {
		return err
	}
	defer session.Close()

	//SELECT TABLE
	table := session.DB(Database).C("Places")

	// Update
	colQuerier := bson.M{"_id": item.ID}
	err = table.Update(colQuerier, item)
	if err != nil {
		panic(err)
	}

	return nil
}
