import { CellarSenzor } from "app/entities/CellarSenzor";
import { CellarPlace } from "app/entities/CellarPlace";
import { CellarSpace } from "app/entities/CellarSpace";
import { CellarWorkflow } from "app/entities/CellarWorkflow";


export interface UiState {
    selectedSenzor: CellarSenzor;
    selectedSpace: CellarSpace;
    selectedPlace: CellarPlace;
    selectedWorkflow: CellarWorkflow;

    actualStatus: string;

    error: string;
}


export const INITIAL_UI_STATE: UiState = {
    selectedSenzor: null,
    selectedSpace: null,
    selectedPlace: null,
    selectedWorkflow: null,
    actualStatus: "",
    error: ""
};