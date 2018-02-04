package mqtt

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	kitlog "github.com/go-kit/kit/log"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
	"github.com/tidwall/gjson"
)

var (
	// ErrBadRouting is returned when an expected path variable is missing.
	ErrBadRouting = errors.New("inconsistent mapping between route and handler (programmer error)")
)

func MakeHttpHandler(ctx context.Context, endpoint Endpoints, logger kitlog.Logger) http.Handler {

	r := mux.NewRouter()
	options := []httptransport.ServerOption{
		httptransport.ServerErrorLogger(logger),
		httptransport.ServerErrorEncoder(encodeError),
	}

	r.Methods("POST").Path("/publishtomqtt").Handler(httptransport.NewServer(
		endpoint.PublishToMqttEndpoint,
		decodePublishToMqttRequest,
		encodePublishToMqttResponse,
		options...,
	))

	return r
}

//*************************
// PLUS
//*************************

// decode url path variables into request
func decodePublishToMqttRequest(_ context.Context, r *http.Request) (interface{}, error) {

	//PARSING JSON
	defer r.Body.Close()

	htmlData, err := ioutil.ReadAll(r.Body) //<--- here!
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	m, ok := gjson.Parse(string(htmlData)).Value().(map[string]interface{})
	if !ok {
		fmt.Println("Error")
	}

	jsonBytes, err := json.Marshal(m)
	if err != nil {
		fmt.Println(err)
	}

	item := &PublishToMqttRequest{}
	parseErr := json.Unmarshal(jsonBytes, item)
	if parseErr != nil {
		fmt.Println("JSON Error")
		fmt.Println(parseErr)
	}

	return item, nil
}

// encode response from endpoint
func encodePublishToMqttResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}

	// fmt.Println(ctx)
	// fmt.Println(response)

	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//*************************
// ERROR
//*************************

// errorer is implemented by all concrete response types that may contain
// errors. It allows us to change the HTTP response code without needing to
// trigger an endpoint (transport-level) error.
type errorer interface {
	error() error
}

// encode error
func encodeError(_ context.Context, err error, w http.ResponseWriter) {
	if err == nil {
		panic("encodeError with nil error")
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusInternalServerError)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"error": err.Error(),
	})
}
