package clients

// ---------------------------------------
// MOCK
// ---------------------------------------
type MockWebsocketClient struct {
}

func NewMockWebsocketClient() (*MockWebsocketClient, error) {
	return &MockWebsocketClient{}, nil
}

func (c MockWebsocketClient) Send(value string) error {
	//do nothing
	return nil
}
