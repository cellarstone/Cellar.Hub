import * as _ from 'lodash';

import { UiState, INITIAL_UI_STATE } from "../state/ui-state";
import { Action } from "@ngrx/store";
import { LOAD_CELLAR_SENZOR_SUCCESS, LoadCellarSenzorSuccessAction, LoadCellarSenzorAction, LOAD_CELLAR_SENZOR } from 'app/state/actions/senzor.actions';
import { LoadCellarPlaceSuccessAction, LOAD_CELLAR_PLACE_SUCCESS, LoadCellarPlaceAction, LOAD_CELLAR_PLACE, DeleteCellarPlaceFailureAction, DELETE_CELLAR_PLACE_FAILURE } from 'app/state/actions/place.actions';
import { LoadCellarSpaceAction, LoadCellarSpaceSuccessAction, LOAD_CELLAR_SPACE, LOAD_CELLAR_SPACE_SUCCESS, DELETE_CELLAR_SPACE_FAILURE, DeleteCellarSpaceFailureAction } from 'app/state/actions/space.actions';
import { LoadCellarWorkflowAction, LoadCellarWorkflowSuccessAction, LOAD_CELLAR_WORKFLOW, LOAD_CELLAR_WORKFLOW_SUCCESS, CHECK_CELLAR_WORKFLOW_SUCCESS, CheckCellarWorkflowSuccessAction, RUN_CELLAR_WORKFLOW_SUCCESS, RunCellarWorkflowSuccessAction, StopCellarWorkflowSuccessAction, STOP_CELLAR_WORKFLOW_SUCCESS } from 'app/state/actions/workflow.actions';


export function uiState(state: UiState = INITIAL_UI_STATE, action: any): UiState {
    switch (action.type) {

        case LOAD_CELLAR_PLACE:
            return mapPlaceToState2(state, <LoadCellarPlaceAction>action);

        case LOAD_CELLAR_PLACE_SUCCESS:
            return mapPlaceToState(state, <LoadCellarPlaceSuccessAction>action);

        case LOAD_CELLAR_SENZOR:
            return mapSenzorToState2(state, <LoadCellarSenzorAction>action);

        case LOAD_CELLAR_SENZOR_SUCCESS:
            return mapSenzorToState(state, <LoadCellarSenzorSuccessAction>action);

        case LOAD_CELLAR_SPACE:
            return mapSpaceToState2(state, <LoadCellarSpaceAction>action);

        case LOAD_CELLAR_SPACE_SUCCESS:
            return mapSpaceToState(state, <LoadCellarSpaceSuccessAction>action);

        case DELETE_CELLAR_SPACE_FAILURE:
            return mapErrorToState(state, <DeleteCellarSpaceFailureAction>action);

        case DELETE_CELLAR_PLACE_FAILURE:
            return mapErrorToState(state, <DeleteCellarPlaceFailureAction>action);

        case LOAD_CELLAR_WORKFLOW:
            return mapWorkflowToState2(state, <LoadCellarWorkflowAction>action);

        case LOAD_CELLAR_WORKFLOW_SUCCESS:
            return mapWorkflowToState(state, <LoadCellarWorkflowSuccessAction>action);

        case RUN_CELLAR_WORKFLOW_SUCCESS:
            return mapActualWorkflowStatusToState(state, <RunCellarWorkflowSuccessAction>action);

        case CHECK_CELLAR_WORKFLOW_SUCCESS:
            return mapActualWorkflowStatusToState(state, <CheckCellarWorkflowSuccessAction>action);

        case STOP_CELLAR_WORKFLOW_SUCCESS:
            return mapActualWorkflowStatusToState(state, <StopCellarWorkflowSuccessAction>action);


        default:
            return state;
    }

}


function mapSenzorToState2(state: UiState, action: LoadCellarSenzorAction): UiState {
    return {
        ...state,
        selectedSenzor: null
    };
}

function mapSenzorToState(state: UiState, action: LoadCellarSenzorSuccessAction): UiState {

    console.log(action.payload);

    return {
        ...state,
        selectedSenzor: action.payload
    };
}

function mapPlaceToState2(state: UiState, action: LoadCellarPlaceAction): UiState {
    return {
        ...state,
        selectedPlace: null
    };
}

function mapPlaceToState(state: UiState, action: LoadCellarPlaceSuccessAction): UiState {
    return {
        ...state,
        selectedPlace: action.payload
    };
}

function mapSpaceToState2(state: UiState, action: LoadCellarSpaceAction): UiState {
    return {
        ...state,
        selectedSpace: null
    };
}

function mapSpaceToState(state: UiState, action: LoadCellarSpaceSuccessAction): UiState {
    return {
        ...state,
        selectedSpace: action.payload
    };
}

function mapWorkflowToState2(state: UiState, action: LoadCellarWorkflowAction): UiState {
    return {
        ...state,
        selectedWorkflow: null
    };
}

function mapWorkflowToState(state: UiState, action: LoadCellarWorkflowSuccessAction): UiState {
    return {
        ...state,
        selectedWorkflow: action.payload
    };
}

function mapActualWorkflowStatusToState(state: UiState, action: any): UiState {

    return {
        ...state,
        actualStatus: action.payload
    };
}

function mapErrorToState(state: UiState, action: any): UiState {
    return {
        ...state,
        error: action.payload
    };
}




