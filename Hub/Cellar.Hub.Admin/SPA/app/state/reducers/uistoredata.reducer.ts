import * as _ from 'lodash';

import { Action } from "@ngrx/store";
import { StoreData } from '../state/store-data';
import { LOAD_CELLAR_SENZOR_SUCCESS, LoadCellarSenzorSuccessAction, LOAD_ALL_CELLAR_SENZORS_SUCCESS, LoadAllCellarSenzorsSuccessAction, LOAD_CELLAR_SENZORS_SUCCESS, LoadCellarSenzorsSuccessAction } from 'app/state/actions/senzor.actions';
import { LOAD_ALL_CELLAR_PLACES_SUCCESS, LoadAllCellarPlacesSuccessAction } from 'app/state/actions/place.actions';
import { query } from '@angular/core/src/animation/dsl';
import { LoadCellarSpacesSuccessAction, LOAD_CELLAR_SPACES_SUCCESS, LOAD_ALL_CELLAR_SPACES_SUCCESS, LoadAllCellarSpacesSuccessAction } from 'app/state/actions/space.actions';
import { LoadRunningProcessesSuccessAction, LOAD_RUNNING_PROCESSES_SUCCESS, SetCLICommandAction, SET_CLI_COMMAND, GET_ACTUAL_DIRECTORY_SUCCESS, GetActualDirectoryActionSuccessAction, LOAD_ALL_CELLAR_WORKFLOWS_SUCCESS, LoadAllCellarWorkflowsSuccessAction, LOAD_CELLAR_WORKFLOWS_SUCCESS, LoadCellarWorkflowsSuccessAction, RunAllCellarWorkflowsSuccessAction, RUN_ALL_CELLAR_WORKFLOWS_SUCCESS, STOP_ALL_CELLAR_WORKFLOWS_SUCCESS, StopAllCellarWorkflowsSuccessAction } from 'app/state/actions/workflow.actions';

export function storeData(state: StoreData, action: Action): StoreData {
    switch (action.type) {

        case LOAD_ALL_CELLAR_PLACES_SUCCESS:
            return mapPlacesToState(state, <LoadAllCellarPlacesSuccessAction>action);

        case LOAD_CELLAR_SPACES_SUCCESS:
            return mapSpacesToState(state, <LoadCellarSpacesSuccessAction>action);

        case LOAD_ALL_CELLAR_SPACES_SUCCESS:
            return mapSpacesToState(state, <LoadAllCellarSpacesSuccessAction>action);

        case LOAD_CELLAR_SENZORS_SUCCESS:
            return mapSenzorsToState(state, <LoadCellarSenzorsSuccessAction>action);

        case LOAD_ALL_CELLAR_SENZORS_SUCCESS:
            return mapSenzorsToState(state, <LoadAllCellarSenzorsSuccessAction>action);

        case LOAD_CELLAR_WORKFLOWS_SUCCESS:
            return mapWorkflowsToState(state, <LoadCellarWorkflowsSuccessAction>action);

        case LOAD_ALL_CELLAR_WORKFLOWS_SUCCESS:
            return mapWorkflowsToState(state, <LoadAllCellarWorkflowsSuccessAction>action);


        case SET_CLI_COMMAND:
            return mapCliCommandToState(state, <SetCLICommandAction>action);

        case LOAD_RUNNING_PROCESSES_SUCCESS:
            return mapCliResultToState(state, <LoadRunningProcessesSuccessAction>action);

        case GET_ACTUAL_DIRECTORY_SUCCESS:
            return mapCliResultToState(state, <GetActualDirectoryActionSuccessAction>action);

        case RUN_ALL_CELLAR_WORKFLOWS_SUCCESS:
            return mapCliResultToState(state, <RunAllCellarWorkflowsSuccessAction>action);

        case STOP_ALL_CELLAR_WORKFLOWS_SUCCESS:
            return mapCliResultToState(state, <StopAllCellarWorkflowsSuccessAction>action);


        default:
            return state;
    }
}


function mapSenzorsToState(state: StoreData, action: any): StoreData {

    console.log(action.payload);

    return {
        ...state,
        senzors: action.payload
    };
}

function mapSpacesToState(state: StoreData, action: any): StoreData {

    console.log(action.payload);

    return {
        ...state,
        spaces: action.payload
    };
}

function mapPlacesToState(state: StoreData, action: LoadAllCellarPlacesSuccessAction): StoreData {
    return {
        ...state,
        places: action.payload
    };
}

function mapWorkflowsToState(state: StoreData, action: any): StoreData {
    return {
        ...state,
        workflows: action.payload
    };
}

function mapCliResultToState(state: StoreData, action: any): StoreData {
    return {
        ...state,
        cli_result: action.payload
    };
}


function mapCliCommandToState(state: StoreData, action: SetCLICommandAction): StoreData {
    return {
        ...state,
        cli_command: action.payload
    };
}




