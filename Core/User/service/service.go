package service

import (
	"github.com/cellarstone/Cellar.Hub/Core/User/clients"
)

//-----------------------------
//-----------------------------
// SERVICE METHODS
//-----------------------------
//-----------------------------

type Service interface {
	//User
	GetAllUsers() ([]CellarUser, error)
}

type UserService struct {
	MongoUrl      string
	MongoDatabase string
	MongoClient   *clients.CellarMongoClient
}

func NewService(mongodburl string) (*UserService, error) {

	cl, err := clients.NewCellarMongoClient(mongodburl)
	if err != nil {
		return nil, err
	}

	return &UserService{
		MongoUrl:      mongodburl,
		MongoDatabase: "HubDatabase",
		MongoClient:   cl,
	}, nil
}

//-----------------------------
// USER
//-----------------------------

func (s UserService) GetAllUsers() ([]CellarUser, error) {
	sess := s.MongoClient.Session.Clone()
	defer sess.Close()

	//SELECT TABLE
	table := sess.DB(s.MongoDatabase).C("Users")

	//SELECT
	var result []CellarUser
	err := table.Find(nil).All(&result)
	if err != nil {
		return nil, err
	}

	return result, nil
}

//---------------------------------------------------------
//HELPERS -------------------------------------------------
//---------------------------------------------------------

// var src = rand.NewSource(time.Now().UnixNano())

// const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
// const (
// 	letterIdxBits = 6                    // 6 bits to represent a letter index
// 	letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
// 	letterIdxMax  = 63 / letterIdxBits   // # of letter indices fitting in 63 bits
// )

// func RandStringBytesMaskImprSrc(n int) string {
// 	b := make([]byte, n)
// 	// A src.Int63() generates 63 random bits, enough for letterIdxMax characters!
// 	for i, cache, remain := n-1, src.Int63(), letterIdxMax; i >= 0; {
// 		if remain == 0 {
// 			cache, remain = src.Int63(), letterIdxMax
// 		}
// 		if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
// 			b[i] = letterBytes[idx]
// 			i--
// 		}
// 		cache >>= letterIdxBits
// 		remain--
// 	}

// 	return string(b)
// }
