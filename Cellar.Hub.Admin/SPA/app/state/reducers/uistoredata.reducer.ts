import * as _ from 'lodash';

import { Action } from "@ngrx/store";
import { StoreData } from '../state/store-data';
import { LOAD_CELLAR_SENZOR_SUCCESS, LoadCellarSenzorSuccessAction, LOAD_CELLAR_SENZORS_SUCCESS, LoadCellarSenzorsSuccessAction } from 'app/state/actions/senzor.actions';
import { LoadCellarPlacesSuccessAction, LOAD_CELLAR_PLACES_SUCCESS } from 'app/state/actions/place.actions';
import { query } from '@angular/core/src/animation/dsl';

export function storeData(state: StoreData, action: Action): StoreData {
    switch (action.type) {

        case LOAD_CELLAR_PLACES_SUCCESS:
        return mapPlacesToState(state,<LoadCellarPlacesSuccessAction>action);


        case LOAD_CELLAR_SENZORS_SUCCESS:
        return mapSenzorsToState(state,<LoadCellarSenzorsSuccessAction>action);

        default:
            return state;
    }
}




function mapSenzorsToState(state: StoreData, action: LoadCellarSenzorsSuccessAction): StoreData {
    return {
        ...state,
        senzors: action.payload
    };
}


function mapPlacesToState(state: StoreData, action: LoadCellarPlacesSuccessAction): StoreData {
    return {
        ...state,
        places: action.payload
    };
}




