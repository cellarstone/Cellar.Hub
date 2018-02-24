package clients

// ---------------------------------------
// MOCK
// ---------------------------------------
type MockPrometheusClient struct {
}

func NewMockPrometheusClient() (*MockPrometheusClient, error) {
	return &MockPrometheusClient{}, nil
}

func (c MockPrometheusClient) Publish(tag string, value string) error {
	//do nothing
	return nil
}
