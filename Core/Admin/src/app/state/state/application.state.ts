import {UiState, INITIAL_UI_STATE} from "./ui-state";
import {StoreData, INITIAL_STORE_DATA} from "./store-data";
import { RouterReducerState } from "@ngrx/router-store";
import { RouterStateUrl } from "app/state/router-settings";

export interface ApplicationState {
    router: RouterReducerState<RouterStateUrl>,
    uiState: UiState,
    storeData: StoreData
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  router: undefined,
  uiState: INITIAL_UI_STATE,
  storeData:INITIAL_STORE_DATA
};