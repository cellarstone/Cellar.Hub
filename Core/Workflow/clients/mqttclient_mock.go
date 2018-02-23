package clients

// ---------------------------------------
// MOCK
// ---------------------------------------
type MockMqttClient struct {
}

func NewMockMqttClient() (*MockMqttClient, error) {
	return &MockMqttClient{}, nil
}

func (c MockMqttClient) Publish(topic string, message string) error {
	//do nothing
	return nil
}
