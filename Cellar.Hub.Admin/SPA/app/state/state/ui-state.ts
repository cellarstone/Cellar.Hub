import { CellarSenzor } from "app/entities/CellarSenzor";
import { CellarPlace } from "app/entities/CellarPlace";
import { CellarSpace } from "app/entities/CellarSpace";


export interface UiState {
    selectedSenzor: CellarSenzor;
    selectedSpace: CellarSpace;
    selectedPlace: CellarPlace;
    error: string;
}


export const INITIAL_UI_STATE: UiState = {
    selectedSenzor: null,
    selectedSpace: null,
    selectedPlace: null,
    error: ""
};