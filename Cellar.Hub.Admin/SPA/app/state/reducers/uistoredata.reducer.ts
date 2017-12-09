import * as _ from 'lodash';

import { Action } from "@ngrx/store";
import { StoreData } from '../state/store-data';
import { LOAD_CELLAR_SENZOR_SUCCESS, LoadCellarSenzorSuccessAction } from 'app/state/actions/actions';

export function storeData(state: StoreData, action: Action): StoreData {
    switch (action.type) {

        case LOAD_CELLAR_SENZOR_SUCCESS:
            return mapSenzorToState(state,<LoadCellarSenzorSuccessAction>action);

        default:
            return state;
    }
}


function mapSenzorToState(state: StoreData, action: LoadCellarSenzorSuccessAction): StoreData {
    return {
        ...state,
        selectedSenzor: action.payload
    };
}




