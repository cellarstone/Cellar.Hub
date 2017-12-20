import { Action } from "@ngrx/store";

export const SET_CLI_COMMAND = '[WorkflowManager] Set CLI command';
export class SetCLICommandAction implements Action {
    readonly type = SET_CLI_COMMAND;
    constructor(public payload: string){}
}

export const LOAD_RUNNING_PROCESSES = '[WorkflowManager] Load running processes';
export class LoadRunningProcessesAction implements Action {
    readonly type = LOAD_RUNNING_PROCESSES;
}

export const LOAD_RUNNING_PROCESSES_SUCCESS = '[WorkflowManager] Load running processes success';
export class LoadRunningProcessesSuccessAction implements Action {
    readonly type = LOAD_RUNNING_PROCESSES_SUCCESS;
    constructor(public payload: string[]){}
}

export const GET_ACTUAL_DIRECTORY = '[WorkflowManager] Get Actual directory';
export class GetActualDirectoryAction implements Action {
    readonly type = GET_ACTUAL_DIRECTORY;
}

export const GET_ACTUAL_DIRECTORY_SUCCESS = '[WorkflowManager] Get Actual directory success';
export class GetActualDirectoryActionSuccessAction implements Action {
    readonly type = GET_ACTUAL_DIRECTORY_SUCCESS;
    constructor(public payload: string[]){}
}