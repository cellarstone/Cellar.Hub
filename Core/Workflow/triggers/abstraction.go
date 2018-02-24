package triggers

import "os"

type Trigger interface {
	Run()
}

type BaseTrigger struct {
	ChannelOut   chan string
	ChannelClose chan string
}

const (
	defaultMqttUrl = "localhost"
)

var (
	mqtturl string
)

func InitTriggers() {
	mqtturl = envString("MQTT_URL", defaultMqttUrl)
}

func envString(env, fallback string) string {
	e := os.Getenv(env)
	if e == "" {
		return fallback
	}
	return e
}
