package engine

import (
	"context"
	"fmt"

	"github.com/go-kit/kit/endpoint"
)

type Endpoints struct {
	GetAllWorkflowsEndpoint   endpoint.Endpoint
	GetWorkflowsEndpoint      endpoint.Endpoint
	GetWorkflowEndpoint       endpoint.Endpoint
	RunAllWorkflowsEndpoint   endpoint.Endpoint
	RunWorkflowEndpoint       endpoint.Endpoint
	CheckAllWorkflowsEndpoint endpoint.Endpoint
	CheckWorkflowEndpoint     endpoint.Endpoint
	CloseAllWorkflowsEndpoint endpoint.Endpoint
	CloseWorkflowEndpoint     endpoint.Endpoint
	SaveWorkflowEndpoint      endpoint.Endpoint
	UpdateWorkflowEndpoint    endpoint.Endpoint
	DeleteWorkflowEndpoint    endpoint.Endpoint
}

//*************************
// GET ALL WORKFLOWS
//*************************

type GetAllWorkflowsRequest struct {
}

type GetAllWorkflowsResponse struct {
	Data []CellarWorkflow `json:"data"`
}

func MakeGetAllWorkflowsEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		//call service
		result, err := svc.GetAllWorkflows()
		if err != nil {
			return nil, err
		}

		return GetAllWorkflowsResponse{Data: result}, nil
	}
}

//*************************
// GET WORKFLOWS
//*************************

type GetWorkflowsRequest struct {
	SenzorName string `json:"senzorname"`
}

type GetWorkflowsResponse struct {
	Data []CellarWorkflow `json:"data"`
}

func MakeGetWorkflowsEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		req := request.(GetWorkflowsRequest)

		//call service
		result, err := svc.GetWorkflows(req.SenzorName)
		if err != nil {
			return nil, err
		}

		return GetWorkflowsResponse{Data: result}, nil
	}
}

//*************************
// GET WORKFLOW
//*************************

type GetWorkflowRequest struct {
	Id string `json:"id"`
}

type GetWorkflowResponse struct {
	Data CellarWorkflow `json:"data"`
}

func MakeGetWorkflowEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		req := request.(GetWorkflowRequest)

		//call service
		result, err := svc.GetWorkflow(req.Id)
		if err != nil {
			return nil, err
		}

		return GetWorkflowResponse{Data: result}, nil
	}
}

//*************************
// RUN ALL WORKFLOWS
//*************************

type RunAllWorkflowsRequest struct {
}

type RunAllWorkflowsResponse struct {
	Result string `json:"result"`
}

func MakeRunAllWorkflowsEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		//call service
		err := svc.RunAllWorkflows()
		if err != nil {
			return nil, err
		}

		return RunAllWorkflowsResponse{Result: "OK"}, nil
	}
}

//*************************
// RUN WORKFLOW
//*************************

type RunWorkflowRequest struct {
	Id string `json:"id"`
}

type RunWorkflowResponse struct {
	Result string `json:"result"`
}

func MakeRunWorkflowEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		req := request.(RunWorkflowRequest)

		//call service
		err := svc.RunWorkflow(req.Id)
		if err != nil {
			return nil, err
		}

		return RunWorkflowResponse{Result: "OK"}, nil
	}
}

//*************************
// CHECK ALL WORKFLOWS
//*************************

type CheckAllWorkflowsRequest struct {
}

type CheckAllWorkflowsResponse struct {
	Result string `json:"result"`
}

func MakeCheckAllWorkflowsEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		//call service
		result2 := svc.CheckAllWorkflows()

		return CheckAllWorkflowsResponse{Result: result2}, nil
	}
}

//*************************
// CHECK WORKFLOW
//*************************

type CheckWorkflowRequest struct {
	ID string `json:id`
}

type CheckWorkflowResponse struct {
	Result string `json:"result"`
}

func MakeCheckWorkflowEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		req := request.(CheckWorkflowRequest)

		//call service
		result, err := svc.CheckWorkflow(req.ID)
		if err != nil {
			return nil, err
		}

		return CheckWorkflowResponse{Result: result}, nil
	}
}

//*************************
// CLOSE ALL WORKFLOWS
//*************************

type CloseAllWorkflowsRequest struct {
}

type CloseAllWorkflowsResponse struct {
	Result string `json:"result"`
}

func MakeCloseAllWorkflowsEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		//call service
		err := svc.CloseAllWorkflows()
		if err != nil {
			return nil, err
		}

		return CloseAllWorkflowsResponse{Result: "OK"}, nil
	}
}

//*************************
// CLOSE WORKFLOW
//*************************

type CloseWorkflowRequest struct {
	ID string `json:"id"`
}

type CloseWorkflowResponse struct {
	Result string `json:"result"`
}

func MakeCloseWorkflowEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CloseWorkflowRequest)

		//call service
		err := svc.CloseWorkflow(req.ID)
		if err != nil {
			return nil, err
		}

		return CloseWorkflowResponse{Result: "OK"}, nil
	}
}

//*************************
// SAVE WORKFLOW
//*************************

type SaveWorkflowRequest struct {
	WorkflowType   string      `json:"workflowtype"`
	WorkflowParams interface{} `json:"workflowparams"`
	Tags           []string    `json:"tags"`
	TriggerType    string      `json:"triggertype"`
	TriggerParams  interface{} `json:"triggerparams"`
}

type SaveWorkflowResponse struct {
	Data CellarWorkflow `json:"data"`
}

func MakeSaveWorkflowEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		inttt := 4
		inttt = inttt

		fmt.Println(inttt)

		req := request.(SaveWorkflowRequest)

		//call service
		result, err := svc.SaveWorkflow(req.WorkflowType,
			req.WorkflowParams,
			req.Tags,
			req.TriggerType,
			req.TriggerParams)
		if err != nil {
			return nil, err
		}

		return SaveWorkflowResponse{Data: result}, nil
	}
}

//*************************
// UPDATE WORKFLOW
//*************************

type UpdateWorkflowRequest struct {
	Data CellarWorkflow `json:"data"`
}

type UpdateWorkflowResponse struct {
	Data CellarWorkflow `json:"data"`
}

func MakeUpdateWorkflowEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		req := request.(UpdateWorkflowRequest)

		//call service
		result, err := svc.UpdateWorkflow(req.Data)
		if err != nil {
			return nil, err
		}

		return SaveWorkflowResponse{Data: result}, nil
	}
}

//*************************
// DELETE WORKFLOW
//*************************

type DeleteWorkflowRequest struct {
	ID string `json:"id"`
}

type DeleteWorkflowResponse struct {
	Result string `json:"result"`
}

func MakeDeleteWorkflowEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {

		req := request.(DeleteWorkflowRequest)

		//call service
		err := svc.DeleteWorkflow(req.ID)
		if err != nil {
			return nil, err
		}

		return DeleteWorkflowResponse{Result: "OK"}, nil
	}
}
