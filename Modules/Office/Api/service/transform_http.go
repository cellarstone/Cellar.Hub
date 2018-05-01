package service

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"

	kitlog "github.com/go-kit/kit/log"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
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

	//-----------------------------
	// SPACE
	//-----------------------------

	r.Path("/spaces").Handler(httptransport.NewServer(
		endpoint.GetAllSpacesEndpoint,
		decodeGetAllSpacesRequest,
		encodeResponse,
		options...,
	))

	return r
}

func encodeResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {

	if e, ok := response.(errorer); ok && e.error() != nil {
		encodeError(ctx, e.error(), w)
		return nil
	}

	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//-----------------------------
// SPACE
//-----------------------------

func decodeGetAllSpacesRequest(_ context.Context, r *http.Request) (interface{}, error) {
	return GetAllSpacesRequest{}, nil
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
