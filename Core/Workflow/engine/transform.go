package engine

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

	r.Path("/engine/workflows").Handler(httptransport.NewServer(
		endpoint.GetAllWorkflowsEndpoint,
		decodeGetAllWorkflowsRequest,
		encodeGetAllWorkflowsResponse,
		options...,
	)).Methods("GET")

	r.Path("/engine/workflows/{senzorname}").Handler(httptransport.NewServer(
		endpoint.GetWorkflowsEndpoint,
		decodeGetWorkflowsRequest,
		encodeGetWorkflowsResponse,
		options...,
	)).Methods("GET")

	r.Path("/engine/workflow").Handler(httptransport.NewServer(
		endpoint.SaveWorkflowEndpoint,
		decodeSaveWorkflowRequest,
		encodeSaveWorkflowResponse,
		options...,
	)).Methods("PUT")

	r.Path("/engine/workflow/{id}").Handler(httptransport.NewServer(
		endpoint.GetWorkflowEndpoint,
		decodeGetWorkflowRequest,
		encodeGetWorkflowResponse,
		options...,
	)).Methods("GET")

	r.Path("/engine/workflow/{id}").Handler(httptransport.NewServer(
		endpoint.UpdateWorkflowEndpoint,
		decodeUpdateWorkflowRequest,
		encodeUpdateWorkflowResponse,
		options...,
	)).Methods("PATCH")

	r.Path("/engine/workflow/{id}").Handler(httptransport.NewServer(
		endpoint.DeleteWorkflowEndpoint,
		decodeDeleteWorkflowRequest,
		encodeDeleteWorkflowResponse,
		options...,
	)).Methods("DELETE")

	// engine/workflows/run
	r.Path("/engine/runallworkflows").Handler(httptransport.NewServer(
		endpoint.RunAllWorkflowsEndpoint,
		decodeRunAllWorkflowsRequest,
		encodeRunAllWorkflowsResponse,
		options...,
	)).Methods("GET")

	// engine/workflow/{id}/run
	r.Path("/engine/workflow/{id}/run").Handler(httptransport.NewServer(
		endpoint.RunWorkflowEndpoint,
		decodeRunWorkflowRequest,
		encodeRunWorkflowResponse,
		options...,
	)).Methods("GET")

	// engine/workflows/check
	r.Path("/engine/checkallworkflows").Handler(httptransport.NewServer(
		endpoint.CheckAllWorkflowsEndpoint,
		decodeCheckAllWorkflowsRequest,
		encodeCheckAllWorkflowsResponse,
		options...,
	)).Methods("GET")

	// engine/workflows/{id}/check
	r.Path("/engine/workflow/{id}/check").Handler(httptransport.NewServer(
		endpoint.CheckWorkflowEndpoint,
		decodeCheckWorkflowRequest,
		encodeCheckWorkflowResponse,
		options...,
	)).Methods("GET")

	// engine/workflows/stop
	r.Path("/engine/stopallworkflows").Handler(httptransport.NewServer(
		endpoint.CloseAllWorkflowsEndpoint,
		decodeCloseAllWorkflowsRequest,
		encodeCloseAllWorkflowsResponse,
		options...,
	)).Methods("GET")

	// engine/workflow/{id or name}/stop
	r.Path("/engine/workflow/{id}/stop").Handler(httptransport.NewServer(
		endpoint.CloseWorkflowEndpoint,
		decodeCloseWorkflowRequest,
		encodeCloseWorkflowResponse,
		options...,
	)).Methods("GET")

	return r
}

//*************************
// GET ALL WORKFLOWS
//*************************

// decode url path variables into request
func decodeGetAllWorkflowsRequest(_ context.Context, r *http.Request) (interface{}, error) {

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

	item := &GetAllWorkflowsRequest{}
	parseErr := json.Unmarshal(jsonBytes, item)
	if parseErr != nil {
		fmt.Println("JSON Error")
		fmt.Println(parseErr)
	}

	return *item, nil
}

// encode response from endpoint
func encodeGetAllWorkflowsResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//*************************
// GET WORKFLOWS
//*************************

// decode url path variables into request
func decodeGetWorkflowsRequest(_ context.Context, r *http.Request) (interface{}, error) {

	vars := mux.Vars(r)
	senzorname, ok := vars["senzorname"]
	if !ok {
		return nil, errors.New("bad route")
	}

	item := &GetWorkflowsRequest{
		SenzorName: senzorname,
	}

	return *item, nil
}

// encode response from endpoint
func encodeGetWorkflowsResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//*************************
// GET WORKFLOW
//*************************

// decode url path variables into request
func decodeGetWorkflowRequest(_ context.Context, r *http.Request) (interface{}, error) {

	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return nil, errors.New("bad route")
	}

	item := &GetWorkflowRequest{
		Id: id,
	}

	return *item, nil
}

// encode response from endpoint
func encodeGetWorkflowResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//*************************
// RUN ALL WORKFLOWS
//*************************

// decode url path variables into request
func decodeRunAllWorkflowsRequest(_ context.Context, r *http.Request) (interface{}, error) {

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

	item := &RunAllWorkflowsRequest{}
	parseErr := json.Unmarshal(jsonBytes, item)
	if parseErr != nil {
		fmt.Println("JSON Error")
		fmt.Println(parseErr)
	}

	return *item, nil
}

// encode response from endpoint
func encodeRunAllWorkflowsResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//*************************
// RUN WORKFLOW
//*************************

// decode url path variables into request
func decodeRunWorkflowRequest(_ context.Context, r *http.Request) (interface{}, error) {

	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return nil, errors.New("bad route")
	}

	item := &RunWorkflowRequest{
		Id: id,
	}

	return *item, nil
}

// encode response from endpoint
func encodeRunWorkflowResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//*************************
// CHECK ALL WORKFLOWS
//*************************

// decode url path variables into request
func decodeCheckAllWorkflowsRequest(_ context.Context, r *http.Request) (interface{}, error) {
	return &CheckAllWorkflowsRequest{}, nil
}

// encode response from endpoint
func encodeCheckAllWorkflowsResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//*************************
// CHECK WORKFLOW
//*************************

// decode url path variables into request
func decodeCheckWorkflowRequest(_ context.Context, r *http.Request) (interface{}, error) {
	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return nil, errors.New("bad route")
	}

	item := &CheckWorkflowRequest{
		ID: id,
	}

	return *item, nil
}

// encode response from endpoint
func encodeCheckWorkflowResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//*************************
// CLOSE ALL WORKFLOWS
//*************************

// decode url path variables into request
func decodeCloseAllWorkflowsRequest(_ context.Context, r *http.Request) (interface{}, error) {

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

	item := &CloseAllWorkflowsRequest{}
	parseErr := json.Unmarshal(jsonBytes, item)
	if parseErr != nil {
		fmt.Println("JSON Error")
		fmt.Println(parseErr)
	}

	return *item, nil
}

// encode response from endpoint
func encodeCloseAllWorkflowsResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//*************************
// CLOSE WORKFLOW
//*************************

// decode url path variables into request
func decodeCloseWorkflowRequest(_ context.Context, r *http.Request) (interface{}, error) {

	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return nil, errors.New("bad route")
	}

	item := &CloseWorkflowRequest{
		ID: id,
	}

	return *item, nil
}

// encode response from endpoint
func encodeCloseWorkflowResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//*************************
// SAVE WORKFLOW
//*************************

// decode url path variables into request
func decodeSaveWorkflowRequest(_ context.Context, r *http.Request) (interface{}, error) {

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

	item := &SaveWorkflowRequest{}
	parseErr := json.Unmarshal(jsonBytes, item)
	if parseErr != nil {
		fmt.Println("JSON Error")
		fmt.Println(parseErr)
	}

	fmt.Println(item)
	fmt.Println(*item)

	return *item, nil
}

// encode response from endpoint
func encodeSaveWorkflowResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//*************************
// UPDATE WORKFLOW
//*************************

// decode url path variables into request
func decodeUpdateWorkflowRequest(_ context.Context, r *http.Request) (interface{}, error) {

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

	item := &UpdateWorkflowRequest{}
	parseErr := json.Unmarshal(jsonBytes, item)
	if parseErr != nil {
		fmt.Println("JSON Error")
		fmt.Println(parseErr)
	}

	fmt.Println(item)
	fmt.Println(*item)

	return *item, nil
}

// encode response from endpoint
func encodeUpdateWorkflowResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(response)
}

//*************************
// DELETE WORKFLOW
//*************************

// decode url path variables into request
func decodeDeleteWorkflowRequest(_ context.Context, r *http.Request) (interface{}, error) {

	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return nil, errors.New("bad route")
	}

	item := &DeleteWorkflowRequest{
		ID: id,
	}

	return *item, nil
}

// encode response from endpoint
func encodeDeleteWorkflowResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
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