import * as _ from 'lodash';

import { UiState, INITIAL_UI_STATE } from "../state/ui-state";
import { Action } from "@ngrx/store";


export function uiState(state: UiState = INITIAL_UI_STATE, action: any): UiState {
    switch (action.type) {

        default:
            return state;
    }

}






