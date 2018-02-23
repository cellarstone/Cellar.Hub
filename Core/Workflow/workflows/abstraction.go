package workflows

import (
	"fmt"
	"os"
)

type Workflow interface {
	Check() string
	Close()
	GetType() string
	GetId() string
}

type BaseWorkflow struct {
	Id     string
	Params interface{}
	Tags   []string
}

const (
	defaultMongoUrl      = "localhost"
	defaultMqttUrl       = "localhost"
	defaultInfluxUrl     = "http://localhost:8086"
	defaultWebsocketsUrl = "localhost:44406"
)

var (
	mongourl      string
	mqtturl       string
	influxurl     string
	websocketsurl string
)

func init() {
	mongourl = envString("MONGO_URL", defaultMongoUrl)
	mqtturl = envString("MQTT_URL", defaultMqttUrl)
	influxurl = envString("INFLUX_URL", defaultInfluxUrl)
	websocketsurl = envString("WEBSOCKETS_URL", defaultWebsocketsUrl)
}

//Error handling
func recoverPanic(workflowname string) {
	if rec := recover(); rec != nil {
		err := rec.(error)
		fmt.Println(workflowname + " - [PANIC] - " + err.Error())
	}
}

func envString(env, fallback string) string {
	e := os.Getenv(env)
	if e == "" {
		return fallback
	}
	return e
}
