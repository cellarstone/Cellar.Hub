import * as _ from 'lodash';

import { UiState, INITIAL_UI_STATE } from "../state/ui-state";
import { Action } from "@ngrx/store";
import { LOAD_CELLAR_SENZOR_SUCCESS, LoadCellarSenzorSuccessAction } from 'app/state/actions/senzor.actions';
import { LoadCellarPlaceSuccessAction, LOAD_CELLAR_PLACE_SUCCESS } from 'app/state/actions/place.actions';


export function uiState(state: UiState = INITIAL_UI_STATE, action: any): UiState {
    switch (action.type) {

        case LOAD_CELLAR_PLACE_SUCCESS:
        return mapPlaceToState(state,<LoadCellarPlaceSuccessAction>action);

        case LOAD_CELLAR_SENZOR_SUCCESS:
        return mapSenzorToState(state,<LoadCellarSenzorSuccessAction>action);


        default:
            return state;
    }

}


function mapSenzorToState(state: UiState, action: LoadCellarSenzorSuccessAction): UiState {
    return {
        ...state,
        selectedSenzor: action.payload
    };
}


function mapPlaceToState(state: UiState, action: LoadCellarPlaceSuccessAction): UiState {
    return {
        ...state,
        selectedPlace: action.payload
    };
}




