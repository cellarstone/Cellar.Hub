package clients

// ---------------------------------------
// MOCK
// ---------------------------------------
type MockFluentdClient struct {
}

func NewMockFluentdClient() (*MockFluentdClient, error) {
	return &MockFluentdClient{}, nil
}

func (c MockFluentdClient) Post(tag string, message interface{}) {
	//do nothing
}
