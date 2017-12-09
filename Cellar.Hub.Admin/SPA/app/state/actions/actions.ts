import { Action } from "@ngrx/store";
import { CellarPlace } from "../../entities/CellarPlace";
import { CellarSenzor } from "app/entities/CellarSenzor";

export const LOAD_CELLAR_PLACES = '[CellarPlace] Load';
export class LoadCellarPlacesAction implements Action {
    readonly type = LOAD_CELLAR_PLACES;
}

export const LOAD_CELLAR_PLACES_SUCCESS = '[CellarPlace] Load success';
export class LoadCellarPlacesSuccessAction implements Action {
    readonly type = LOAD_CELLAR_PLACES_SUCCESS;
    constructor(public payload: CellarPlace[]){}
}


export const LOAD_CELLAR_SENZOR = '[CellarSenzor] Load';
export class LoadCellarSenzorAction implements Action {
    readonly type = LOAD_CELLAR_SENZOR;
    constructor(public payload: string){}
}

export const LOAD_CELLAR_SENZOR_SUCCESS = '[CellarSenzor] Load success';
export class LoadCellarSenzorSuccessAction implements Action {
    readonly type = LOAD_CELLAR_SENZOR_SUCCESS;
    constructor(public payload: CellarSenzor){}
}