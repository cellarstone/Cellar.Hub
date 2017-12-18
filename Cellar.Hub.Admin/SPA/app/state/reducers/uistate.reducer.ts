import * as _ from 'lodash';

import { UiState, INITIAL_UI_STATE } from "../state/ui-state";
import { Action } from "@ngrx/store";
import { LOAD_CELLAR_SENZOR_SUCCESS, LoadCellarSenzorSuccessAction, LoadCellarSenzorAction, LOAD_CELLAR_SENZOR } from 'app/state/actions/senzor.actions';
import { LoadCellarPlaceSuccessAction, LOAD_CELLAR_PLACE_SUCCESS, LoadCellarPlaceAction, LOAD_CELLAR_PLACE } from 'app/state/actions/place.actions';
import { LoadCellarSpaceAction, LoadCellarSpaceSuccessAction, LOAD_CELLAR_SPACE, LOAD_CELLAR_SPACE_SUCCESS } from 'app/state/actions/space.actions';


export function uiState(state: UiState = INITIAL_UI_STATE, action: any): UiState {
    switch (action.type) {
        
        case LOAD_CELLAR_PLACE:
        return mapPlaceToState2(state,<LoadCellarPlaceAction>action);

        case LOAD_CELLAR_PLACE_SUCCESS:
        return mapPlaceToState(state,<LoadCellarPlaceSuccessAction>action);

        case LOAD_CELLAR_SENZOR:
        return mapSenzorToState2(state,<LoadCellarSenzorAction>action);

        case LOAD_CELLAR_SENZOR_SUCCESS:
        return mapSenzorToState(state,<LoadCellarSenzorSuccessAction>action);

        case LOAD_CELLAR_SPACE:
        return mapSpaceToState2(state,<LoadCellarSpaceAction>action);

        case LOAD_CELLAR_SPACE_SUCCESS:
        return mapSpaceToState(state,<LoadCellarSpaceSuccessAction>action);


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




