package clients

import "github.com/fluent/fluent-logger-golang/fluent"

// ---------------------------------------
// INTERFACE
// ---------------------------------------
type FluentdClient interface {
	Post(tag string, message interface{})
}

// ---------------------------------------
// REAL IMPLEMENTATION
// ---------------------------------------
type CellarFluentdClient struct {
	Client *fluent.Fluent
}

func NewCellarFluentdClient(url string) (*CellarFluentdClient, error) {

	fluentLogger, errtemp := fluent.New(fluent.Config{FluentPort: 24224, FluentHost: url})
	if errtemp != nil {
		//stop program
		return nil, errtemp
	}

	return &CellarFluentdClient{
		Client: fluentLogger,
	}, nil
}

func (c CellarFluentdClient) Post(tag string, message interface{}) error {
	err := c.Client.Post(tag, message)
	if err != nil {
		return err
	}
	return nil
}
