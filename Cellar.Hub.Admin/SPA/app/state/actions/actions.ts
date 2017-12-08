import { Action } from "@ngrx/store";
import { CellarPlace } from "../../entities/CellarPlace";

export const LOAD_CELLAR_PLACES = '[CellarPlace] Load';
export class LoadCellarPlacesAction implements Action {
    readonly type = LOAD_CELLAR_PLACES;
}

export const LOAD_CELLAR_PLACES_SUCCESS = '[CellarPlace] Load success';
export class LoadCellarPlacesSuccessAction implements Action {
    readonly type = LOAD_CELLAR_PLACES_SUCCESS;
    constructor(public payload: CellarPlace[]){}
}
