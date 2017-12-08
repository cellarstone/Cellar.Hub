import * as _ from 'lodash';

import { Action } from "@ngrx/store";
import { StoreData } from '../state/store-data';

export function storeData(state: StoreData, action: Action): StoreData {
    switch (action.type) {

        default:
            return state;
    }
}





