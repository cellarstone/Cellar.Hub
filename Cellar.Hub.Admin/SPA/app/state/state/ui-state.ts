import { CellarSenzor } from "app/entities/CellarSenzor";
import { CellarPlace } from "app/entities/CellarPlace";


export interface UiState {
    selectedSenzor: CellarSenzor;
    selectedPlace: CellarPlace;
}


export const INITIAL_UI_STATE: UiState = {
    selectedSenzor: undefined,
    selectedPlace: undefined
};