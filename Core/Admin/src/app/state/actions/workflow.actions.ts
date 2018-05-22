import { Action } from "@ngrx/store";
import { CellarWorkflow } from "app/entities/CellarWorkflow";


export const LOAD_ALL_CELLAR_WORKFLOWS = '[CellarWorkflows] Load All';
export class LoadAllCellarWorkflowsAction implements Action {
    readonly type = LOAD_ALL_CELLAR_WORKFLOWS;
}

export const LOAD_ALL_CELLAR_WORKFLOWS_SUCCESS = '[CellarWorkflows] Load All Success';
export class LoadAllCellarWorkflowsSuccessAction implements Action {
    readonly type = LOAD_ALL_CELLAR_WORKFLOWS_SUCCESS;
    constructor(public payload: CellarWorkflow[]){}
}


export const LOAD_CELLAR_WORKFLOWS = '[CellarWorkflows] Load';
export class LoadCellarWorkflowsAction implements Action {
    readonly type = LOAD_CELLAR_WORKFLOWS;
    constructor(public payload: string){}
}

export const LOAD_CELLAR_WORKFLOWS_SUCCESS = '[CellarWorkflows] Load Success';
export class LoadCellarWorkflowsSuccessAction implements Action {
    readonly type = LOAD_CELLAR_WORKFLOWS_SUCCESS;
    constructor(public payload: CellarWorkflow[]){}
}


export const LOAD_CELLAR_WORKFLOW = '[CellarWorkflow] Load';
export class LoadCellarWorkflowAction implements Action {
    readonly type = LOAD_CELLAR_WORKFLOW;
    constructor(public payload: string){}
}

export const LOAD_CELLAR_WORKFLOW_SUCCESS = '[CellarWorkflow] Load success';
export class LoadCellarWorkflowSuccessAction implements Action {
    readonly type = LOAD_CELLAR_WORKFLOW_SUCCESS;
    constructor(public payload: CellarWorkflow){}
}

export const SAVE_CELLAR_WORKFLOW = '[CellarWorkflow] Save';
export class SaveCellarWorkflowAction implements Action {
    readonly type = SAVE_CELLAR_WORKFLOW;
    constructor(public payload: CellarWorkflow){}
}

// export const SAVE_CELLAR_WORKFLOW_SUCCESS = '[CellarWorkflow] Save success';
// export class SaveCellarWorkflowSuccessAction implements Action {
//     readonly type = SAVE_CELLAR_WORKFLOW_SUCCESS;
//     constructor(public payload: CellarWorkflow){}
// }

export const DELETE_CELLAR_WORKFLOW = '[CellarWorkflow] Delete';
export class DeleteCellarWorkflowAction implements Action {
    readonly type = DELETE_CELLAR_WORKFLOW;
    constructor(public payload: string){}
}






export const CHECK_CELLAR_WORKFLOW = '[CellarWorkflow] Check status';
export class CheckCellarWorkflowAction implements Action {
    readonly type = CHECK_CELLAR_WORKFLOW;
    constructor(public payload: string){}
}

export const CHECK_CELLAR_WORKFLOW_SUCCESS = '[CellarWorkflow] Check status success';
export class CheckCellarWorkflowSuccessAction implements Action {
    readonly type = CHECK_CELLAR_WORKFLOW_SUCCESS;
    constructor(public payload: string){}
}

export const RUN_CELLAR_WORKFLOW = '[CellarWorkflow] Run';
export class RunCellarWorkflowAction implements Action {
    readonly type = RUN_CELLAR_WORKFLOW;
    constructor(public payload: string){}
}

export const RUN_CELLAR_WORKFLOW_SUCCESS = '[CellarWorkflow] Run success';
export class RunCellarWorkflowSuccessAction implements Action {
    readonly type = RUN_CELLAR_WORKFLOW_SUCCESS;
    constructor(public payload: string){}
}

export const STOP_CELLAR_WORKFLOW = '[CellarWorkflow] Stop';
export class StopCellarWorkflowAction implements Action {
    readonly type = STOP_CELLAR_WORKFLOW;
    constructor(public payload: string){}
}

export const STOP_CELLAR_WORKFLOW_SUCCESS = '[CellarWorkflow] Stop success';
export class StopCellarWorkflowSuccessAction implements Action {
    readonly type = STOP_CELLAR_WORKFLOW_SUCCESS;
    constructor(public payload: string){}
}




/*********************************************************************************/
/*                                  CLI                                          */
/*********************************************************************************/


export const SET_CLI_COMMAND = '[WorkflowManager] Set CLI command';
export class SetCLICommandAction implements Action {
    readonly type = SET_CLI_COMMAND;
    constructor(public payload: string){}
}

export const RUN_ALL_CELLAR_WORKFLOWS = '[CellarWorkflows] Run All';
export class RunAllCellarWorkflowsAction implements Action {
    readonly type = RUN_ALL_CELLAR_WORKFLOWS;
}

export const RUN_ALL_CELLAR_WORKFLOWS_SUCCESS = '[CellarWorkflows] Run All success';
export class RunAllCellarWorkflowsSuccessAction implements Action {
    readonly type = RUN_ALL_CELLAR_WORKFLOWS_SUCCESS;
    constructor(public payload: string[]){}
}

export const STOP_ALL_CELLAR_WORKFLOWS = '[CellarWorkflows] Stop All';
export class StopAllCellarWorkflowsAction implements Action {
    readonly type = STOP_ALL_CELLAR_WORKFLOWS;
}

export const STOP_ALL_CELLAR_WORKFLOWS_SUCCESS = '[CellarWorkflows] Stop All success';
export class StopAllCellarWorkflowsSuccessAction implements Action {
    readonly type = STOP_ALL_CELLAR_WORKFLOWS_SUCCESS;
    constructor(public payload: string[]){}
}