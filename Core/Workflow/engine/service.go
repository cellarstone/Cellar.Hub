package engine

import (
	"context"
	"errors"
	"runtime"
	"runtime/debug"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/pb/externall"
	"github.com/cellarstone/Cellar.Hub/Core/Workflow/triggers"
	"github.com/cellarstone/Cellar.Hub/Core/Workflow/workflows"
	"google.golang.org/grpc"
)

type Service interface {
	GetAllWorkflows() ([]CellarWorkflow, error)
	RunAllWorkflows() error
	CheckAllWorkflows() string
	StopAllWorkflows() error

	GetWorkflows(senzorname string) ([]CellarWorkflow, error)
	DeleteWorkflows(senzorname string) error
	RunWorkflows(senzorname string) error
	CheckWorkflows(senzorname string) (string, error)
	StopWorkflows(senzorname string) error

	CreateAndRunDefaultSenzorWorkflows(senzorid string) error
	StopAndDeleteDefaultSenzorWorkflows(senzorid string) error

	GetWorkflow(id string) (CellarWorkflow, error)
	SaveWorkflow(workflowType string, workflowParams interface{}, tags []string, triggerType string, triggerParams interface{}) (CellarWorkflow, error)
	UpdateWorkflow(workflow CellarWorkflow) (CellarWorkflow, error)
	DeleteWorkflow(id string) error
	RunWorkflow(id string) error
	CheckWorkflow(id string) (string, error)
	StopWorkflow(id string) error
}

type WorkflowEngineService struct {
	Mongourl           string
	Mqtturl            string
	Influxurl          string
	Websocketsurl      string
	Cellarstoneapisurl string
	WorkflowsInMemory  []workflows.Workflow
}

func NewService(mongourl string, mqtturl string, influxurl string, websocketsurl string, cellarstoneapisurl string) *WorkflowEngineService {

	InitRepository()
	triggers.InitTriggers()
	workflows.InitWorkflows()

	return &WorkflowEngineService{
		Mongourl:           mongourl,
		Mqtturl:            mqtturl,
		Influxurl:          influxurl,
		Websocketsurl:      websocketsurl,
		Cellarstoneapisurl: cellarstoneapisurl,
	}
}

func (s *WorkflowEngineService) DeleteWorkflow(id string) (err error) {

	//save into db
	err = RemoveCellarWorkflow(id)

	return err
}
func (s *WorkflowEngineService) UpdateWorkflow(workflow CellarWorkflow) (result CellarWorkflow, err error) {

	//save into db
	result, err = UpdateCellarWorkflow(&workflow)

	return result, err
}
func (s *WorkflowEngineService) SaveWorkflow(workflowType string, workflowParams interface{}, tags []string, triggerType string, triggerParams interface{}) (result CellarWorkflow, err error) {

	// if s.isWorkflowInMemory(workflowName) {
	// 	return nil
	// }

	// if workflowType == "test1" {
	// 	//run workflow
	// 	result := workflows.CreateAndRun_Test1Workflow(workflowName, workflowParams, tags)
	// 	//Add and Run trigger
	// 	if triggerType == "time" {
	// 		result.Trigger_channelClose = triggers.RunNewTimeRepeaterTrigger(result.Ct1_channelIn, triggerParams)
	// 	} else if triggerType == "mqtt" {
	// 		result.Trigger_channelClose = triggers.RunNewMqttTrigger(result.Ct1_channelIn, triggerParams)
	// 	}
	// 	s.WorkflowsInMemory = append(s.WorkflowsInMemory, result)
	// } else if workflowType == "rand2mqtt" {
	// 	result := workflows.CreateAndRun_Rand2MqttWorkflow(workflowName, workflowParams, tags)
	// 	//Add and Run trigger
	// 	if triggerType == "time" {
	// 		result.Trigger_channelClose = triggers.RunNewTimeRepeaterTrigger(result.Ct1_channelIn, triggerParams)
	// 	} else if triggerType == "mqtt" {
	// 		result.Trigger_channelClose = triggers.RunNewMqttTrigger(result.Ct1_channelIn, triggerParams)
	// 	}
	// 	s.WorkflowsInMemory = append(s.WorkflowsInMemory, result)
	// } else if workflowType == "testexception" {
	// 	result := workflows.CreateAndRun_TestExceptionWorkflow(workflowName, workflowParams, tags)
	// 	//Add and Run trigger
	// 	if triggerType == "time" {
	// 		result.Trigger_channelClose = triggers.RunNewTimeRepeaterTrigger(result.Ct1_channelIn, triggerParams)
	// 	} else if triggerType == "mqtt" {
	// 		result.Trigger_channelClose = triggers.RunNewMqttTrigger(result.Ct1_channelIn, triggerParams)
	// 	}
	// 	s.WorkflowsInMemory = append(s.WorkflowsInMemory, result)
	// }

	// isExist, _ := IsExistCellarWorkflow(workflowName)
	// if isExist {
	// 	return errors.New("Workflow with this name is already exist in databases")
	// }

	//save into db
	result, err = AddCellarWorkflow(CellarWorkflow{
		WorkflowType:   workflowType,
		WorkflowParams: workflowParams,
		Tags:           tags,
		TriggerType:    triggerType,
		TriggerParams:  triggerParams,
	})

	return result, err
}

func (s *WorkflowEngineService) RunWorkflow(id string) error {

	if s.isWorkflowInMemory(id) {
		return errors.New("Workflow is already in memory")
	}

	fromDB, _ := GetCellarWorkflow(id)

	if fromDB.WorkflowType == "test1" {
		//run workflow
		result := workflows.CreateAndRun_Test1Workflow(fromDB.WorkflowParams, fromDB.Tags)
		//Add and Run trigger
		if fromDB.TriggerType == "time" {
			result.Trigger_channelClose = triggers.RunNewTimeRepeaterTrigger(result.Ct1_channelIn, fromDB.TriggerParams)
		} else if fromDB.TriggerType == "mqtt" {
			result.Trigger_channelClose = triggers.RunNewMqttTrigger(result.Ct1_channelIn, fromDB.TriggerParams)
		}
		result.BaseWorkflow.Id = id
		s.WorkflowsInMemory = append(s.WorkflowsInMemory, *result)
	} else if fromDB.WorkflowType == "rand2mqtt" {
		result := workflows.CreateAndRun_Rand2MqttWorkflow(fromDB.WorkflowParams, fromDB.Tags)
		//Add and Run trigger
		if fromDB.TriggerType == "time" {
			result.Trigger_channelClose = triggers.RunNewTimeRepeaterTrigger(result.Ct1_channelIn, fromDB.TriggerParams)
		} else if fromDB.TriggerType == "mqtt" {
			result.Trigger_channelClose = triggers.RunNewMqttTrigger(result.Ct1_channelIn, fromDB.TriggerParams)
		}
		result.BaseWorkflow.Id = id
		s.WorkflowsInMemory = append(s.WorkflowsInMemory, *result)
	} else if fromDB.WorkflowType == "testexception" {
		result := workflows.CreateAndRun_TestExceptionWorkflow(fromDB.WorkflowParams, fromDB.Tags)
		//Add and Run trigger
		if fromDB.TriggerType == "time" {
			result.Trigger_channelClose = triggers.RunNewTimeRepeaterTrigger(result.Ct1_channelIn, fromDB.TriggerParams)
		} else if fromDB.TriggerType == "mqtt" {
			result.Trigger_channelClose = triggers.RunNewMqttTrigger(result.Ct1_channelIn, fromDB.TriggerParams)
		}
		result.BaseWorkflow.Id = id
		s.WorkflowsInMemory = append(s.WorkflowsInMemory, *result)
	} else if fromDB.WorkflowType == "defaultsenzor" {
		result := workflows.CreateAndRun_DefaultSenzorWorkflow(fromDB.WorkflowParams, fromDB.Tags)
		//Add and Run trigger
		if fromDB.TriggerType == "time" {
			result.Trigger_channelClose = triggers.RunNewTimeRepeaterTrigger(result.Ct1_channelIn, fromDB.TriggerParams)
		} else if fromDB.TriggerType == "mqtt" {
			result.Trigger_channelClose = triggers.RunNewMqttTrigger(result.Ct1_channelIn, fromDB.TriggerParams)
		}
		result.BaseWorkflow.Id = id
		s.WorkflowsInMemory = append(s.WorkflowsInMemory, *result)
	}

	// isExist, _ := IsExistCellarWorkflow(workflowName)
	// if isExist {
	// 	return nil
	// }

	// //save into db
	// AddCellarWorkflow(&CellarWorkflow{
	// 	WorkflowType:   workflowType,
	// 	WorkflowName:   workflowName,
	// 	WorkflowParams: workflowParams,
	// 	Tags:           tags,
	// 	TriggerType:    triggerType,
	// 	TriggerParams:  triggerParams,
	// })

	return nil
}

func (s *WorkflowEngineService) RunAllWorkflows() error {

	workflows, err := GetAllCellarWorkflows()
	if err != nil {
		return err
	}

	for _, item := range workflows {

		err = s.RunWorkflow(string(item.ID))
	}

	return err
}

func (s *WorkflowEngineService) GetAllWorkflows() ([]CellarWorkflow, error) {
	workflows, err := GetAllCellarWorkflows()
	if err != nil {
		return []CellarWorkflow{}, err
	}
	return workflows, nil
}

func (s *WorkflowEngineService) GetWorkflows(senzorname string) ([]CellarWorkflow, error) {

	workflows, err := GetCellarWorkflows(senzorname)
	if err != nil {
		return []CellarWorkflow{}, err
	}
	return workflows, nil
}

func (s *WorkflowEngineService) DeleteWorkflows(senzorname string) (err error) {

	//save into db
	err = DeleteCellarWorkflows(senzorname)

	return err
}

func (s *WorkflowEngineService) RunWorkflows(senzorname string) (err error) {

	workflows, err := GetCellarWorkflows(senzorname)
	if err != nil {
		return err
	}

	for _, item := range workflows {
		err := s.RunWorkflow(string(item.ID))
		if err != nil {
			return err
		}
	}

	return nil
}

func (s *WorkflowEngineService) CheckWorkflows(senzorname string) (result string, err error) {

	workflows, err := GetCellarWorkflows(senzorname)
	if err != nil {
		return "", err
	}

	result = ""
	for _, item := range workflows {
		temp, _ := s.CheckWorkflow(string(item.ID))
		result += temp
	}

	return result, nil
}

func (s *WorkflowEngineService) StopWorkflows(senzorname string) (err error) {

	workflows, err := GetCellarWorkflows(senzorname)
	if err != nil {
		return err
	}

	for _, item := range workflows {
		err := s.StopWorkflow(string(item.ID))
		if err != nil {
			return err
		}
	}

	return nil
}

func (s *WorkflowEngineService) StopAndDeleteDefaultSenzorWorkflows(senzorid string) (err error) {

	// gRPC -----------------------------------
	conn, err := grpc.Dial(s.Cellarstoneapisurl, grpc.WithInsecure())
	if err != nil {
		return err
	}
	defer conn.Close()

	client := pb.NewIoTServiceClient(conn)

	request := &pb.GetSenzorRequest{
		Id: senzorid,
	}

	senzorResponse, err := client.GetSenzor(context.Background(), request)
	if err != nil {
		return err
	}

	senzor := *senzorResponse.Data

	// WORKFLOWS ---------------------------------
	workflows, err := GetCellarWorkflows(senzor.Name)
	if err != nil {
		return err
	}

	//have any other workflows then "defaultsenzor" ?
	haveOtherWorkflows := false
	for _, item := range workflows {
		if item.WorkflowType != "defaultsenzor" {
			haveOtherWorkflows = true
		}
	}

	if haveOtherWorkflows {
		return errors.New("senzor have active workflows, please resolve this before delete senzor")
	}

	// Stop all default workflows ------------------
	for _, item := range workflows {
		err := s.StopWorkflow(item.ID.Hex())
		if err != nil {
			return err
		}
	}

	// Remove all default workflows ------------------
	for _, item := range workflows {
		err := s.DeleteWorkflow(item.ID.Hex())
		if err != nil {
			return err
		}
	}

	return nil
}

func (s *WorkflowEngineService) CreateAndRunDefaultSenzorWorkflows(senzorid string) (err error) {

	// gRPC -----------------------------------
	conn, err := grpc.Dial(s.Cellarstoneapisurl, grpc.WithInsecure())
	if err != nil {
		return err
	}
	defer conn.Close()

	client := pb.NewIoTServiceClient(conn)

	request := &pb.GetSenzorRequest{
		Id: senzorid,
	}

	senzorResponse, err := client.GetSenzor(context.Background(), request)
	if err != nil {
		return err
	}

	senzor := *senzorResponse.Data

	if senzor.Type == "CellarSenzor Temperature v1.0" {

		//temperature
		err = s.runSenzorDefaultWorkflow(senzor.Name, "temperature")
		if err != nil {
			return err
		}

		//humidity
		err = s.runSenzorDefaultWorkflow(senzor.Name, "humidity")
		if err != nil {
			return err
		}

	} else if senzor.Type == "CellarSenzor Motion v1.0" {

		//pir
		err = s.runSenzorDefaultWorkflow(senzor.Name, "pir")
		if err != nil {
			return err
		}

	} else if senzor.Type == "CellarSenzor Power v1.0" {

		//pir
		err = s.runSenzorDefaultWorkflow(senzor.Name, "relay")
		if err != nil {
			return err
		}

	}

	return nil
}

func (s *WorkflowEngineService) runSenzorDefaultWorkflow(senzorName string, measurement string) error {
	workflowParams := workflows.Params_DefaultSenzorWorkflow{
		WebsocketRoom: senzorName + measurement,
		InfluxTopic:   senzorName + measurement,
	}

	triggerParams := triggers.Params_MqttTrigger{
		Topic: senzorName + "/" + measurement,
	}

	workflow, err := s.SaveWorkflow("defaultsenzor", workflowParams, []string{senzorName}, "mqtt", triggerParams)
	if err != nil {
		return err
	}

	// fmt.Println(workflow.ID)
	// fmt.Println(workflow.ID.String())
	// fmt.Println(workflow.ID.Hex())
	// fmt.Println(string(workflow.ID))

	err = s.RunWorkflow(workflow.ID.Hex())
	if err != nil {
		return err
	}
	return nil
}

func (s *WorkflowEngineService) GetWorkflow(id string) (CellarWorkflow, error) {

	workflow, err := GetCellarWorkflow(id)
	if err != nil {
		return CellarWorkflow{}, err
	}
	return workflow, nil
}

func (s *WorkflowEngineService) CheckAllWorkflows() string {

	result := ""

	for _, item := range s.WorkflowsInMemory {
		result += " ||| " + item.GetId() + " | " + item.Check() + " ||| "
	}

	return result
}

func (s *WorkflowEngineService) CheckWorkflow(id string) (result string, err error) {

	result = ""

	for _, item := range s.WorkflowsInMemory {

		if item.GetId() == id {

			result += item.GetId() + " | " + item.Check()

		}
	}

	return result, nil
}

func (s *WorkflowEngineService) StopAllWorkflows() error {
	for _, item := range s.WorkflowsInMemory {
		item.Close()
	}

	s.WorkflowsInMemory = s.WorkflowsInMemory[:0]

	runtime.GC()
	debug.FreeOSMemory()

	return nil
}

func (s *WorkflowEngineService) StopWorkflow(id string) error {

	resultIndex := -1

	for index := 0; index < len(s.WorkflowsInMemory); index++ {
		if s.WorkflowsInMemory[index].GetId() == id {
			s.WorkflowsInMemory[index].Close()
			resultIndex = index
		}
	}

	if resultIndex != -1 {
		s.WorkflowsInMemory = append(s.WorkflowsInMemory[:resultIndex], s.WorkflowsInMemory[resultIndex+1:]...)
	}

	return nil
}

// -------------------------------------------------
//HELPERS
// -------------------------------------------------
func (s *WorkflowEngineService) isWorkflowInMemory(id string) bool {
	for _, item := range s.WorkflowsInMemory {
		if item.GetId() == id {
			return true
		}
	}
	return false
}
