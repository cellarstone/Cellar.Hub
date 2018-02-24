package clients

// ---------------------------------------
// MOCK
// ---------------------------------------
type MockInfluxClient struct {
}

func NewMockInfluxClient() (*MockInfluxClient, error) {
	return &MockInfluxClient{}, nil
}

func (c MockInfluxClient) Insert(name string, tags map[string]string, fields map[string]interface{}) {
	//do nothing
}
