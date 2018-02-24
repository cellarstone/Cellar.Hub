package clients

import (
	"fmt"
	"log"
	"time"

	influx "github.com/influxdata/influxdb/client/v2"
)

const (
	database = "HubDatabase"
	username = "test"
	password = "test"
)

type InfluxClient interface {
	Insert(name string, tags map[string]string, fields map[string]interface{})
	QueryDB(cmd string) (res []influx.Result, err error)
}

type CellarInfluxClient struct {
	Client *influx.Client
}

func NewCellarInfluxClient(url string) (*CellarInfluxClient, error) {
	tempclient, err := influx.NewHTTPClient(influx.HTTPConfig{
		Addr:     url,
		Username: username,
		Password: password,
	})
	if err != nil {
		return nil, err
	}
	defer tempclient.Close()

	myclient := &CellarInfluxClient{
		Client: &tempclient,
	}

	//********************************
	//CREATE DATABASE
	//********************************
	_, err = myclient.QueryDB(fmt.Sprintf("CREATE DATABASE %s", database))
	if err != nil {
		log.Fatal(err)
	}

	return myclient, nil
}

func (c *CellarInfluxClient) QueryDB(cmd string) (res []influx.Result, err error) {
	q := influx.Query{
		Command:  cmd,
		Database: database,
	}
	if response, err := (*c.Client).Query(q); err == nil {
		if response.Error() != nil {
			return res, response.Error()
		}
		res = response.Results
	} else {
		return res, err
	}
	return res, nil
}

var bp influx.BatchPoints
var pt *influx.Point

func (c *CellarInfluxClient) Insert(name string, tags map[string]string, fields map[string]interface{}) {

	// Create a new point batch
	bp, err = influx.NewBatchPoints(influx.BatchPointsConfig{
		Database:  database,
		Precision: "s",
	})
	if err != nil {
		log.Fatal(err)
	}

	pt, err = influx.NewPoint(name, tags, fields, time.Now())
	if err != nil {
		log.Fatal(err)
	}
	bp.AddPoint(pt)

	// Write the batch
	if err := (*c.Client).Write(bp); err != nil {
		log.Fatal(err)
	}
}
