package engine

import (
	"errors"
	"runtime"
	"runtime/debug"

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/triggers"
	"github.com/cellarstone/Cellar.Hub/Core/Workflow/workflows"
)

type Service interface {
	GetWorkflow(id string) (CellarWorkflow, error)
	GetWorkflows(senzorname string) ([]CellarWorkflow, error)
	GetAllWorkflows() ([]CellarWorkflow, error)
	RunWorkflow(id string) error
	RunAllWorkflows() error
	CheckWorkflow(id string) (string, error)
	CheckAllWorkflows() string
	CloseWorkflow(id string) error
	CloseAllWorkflows() error
	SaveWorkflow(workflowType string, workflowParams interface{}, tags []string, triggerType string, triggerParams interface{}) (CellarWorkflow, error)
	UpdateWorkflow(workflow CellarWorkflow) (CellarWorkflow, error)
	DeleteWorkflow(id string) error
}

type WorkflowEngineService struct {
	Mongourl          string
	Mqtturl           string
	Influxurl         string
	Websocketsurl     string
	WorkflowsInMemory []workflows.Workflow
}

func NewService(mongourl string, mqtturl string, influxurl string, websocketsurl string) *WorkflowEngineService {

	InitRepository()
	triggers.InitTriggers()
	workflows.InitWorkflows()

	return &WorkflowEngineService{
		Mongourl:      mongourl,
		Mqtturl:       mqtturl,
		Influxurl:     influxurl,
		Websocketsurl: websocketsurl,
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
	result, err = AddCellarWorkflow(&CellarWorkflow{
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

func (s *WorkflowEngineService) CloseAllWorkflows() error {
	for _, item := range s.WorkflowsInMemory {
		item.Close()
	}

	s.WorkflowsInMemory = s.WorkflowsInMemory[:0]

	runtime.GC()
	debug.FreeOSMemory()

	return nil
}

func (s *WorkflowEngineService) CloseWorkflow(id string) error {

	resultIndex := -1

	for index := 0; index < len(s.WorkflowsInMemory); index++ {
		if s.WorkflowsInMemory[index].GetId() == id {
			s.WorkflowsInMemory[index].Close()
			resultIndex = index
		}
	}

	s.WorkflowsInMemory = append(s.WorkflowsInMemory[:resultIndex], s.WorkflowsInMemory[resultIndex+1:]...)

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
