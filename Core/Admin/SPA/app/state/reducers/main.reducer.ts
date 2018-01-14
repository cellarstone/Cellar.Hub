import { routerReducer } from '@ngrx/router-store';
import { uiState } from './uistate.reducer';
import { storeData } from './uistoredata.reducer';

export const reducers = {
    routerReducer: routerReducer,
    uiState: uiState,
    storeData: storeData
};