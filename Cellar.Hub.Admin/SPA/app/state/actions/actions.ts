import { Action } from "@ngrx/store";
import { CellarPlace } from "../../entities/CellarPlace";
import { CellarSenzor } from "app/entities/CellarSenzor";

export const LOAD_CELLAR_PLACES = '[CellarPlace] Load All';
export class LoadCellarPlacesAction implements Action {
    readonly type = LOAD_CELLAR_PLACES;
}

export const LOAD_CELLAR_PLACES_SUCCESS = '[CellarPlace] Load All success';
export class LoadCellarPlacesSuccessAction implements Action {
    readonly type = LOAD_CELLAR_PLACES_SUCCESS;
    constructor(public payload: CellarPlace[]){}
}





export const LOAD_CELLAR_SENZORS = '[CellarSenzor] Load All';
export class LoadCellarSenzorsAction implements Action {
    readonly type = LOAD_CELLAR_SENZORS;
}

export const LOAD_CELLAR_SENZORS_SUCCESS = '[CellarSenzor] Load All success';
export class LoadCellarSenzorsSuccessAction implements Action {
    readonly type = LOAD_CELLAR_SENZORS_SUCCESS;
    constructor(public payload: CellarSenzor[]){}
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

export const SAVE_CELLAR_SENZOR = '[CellarSenzor] Save';
export class SaveCellarSenzorAction implements Action {
    readonly type = SAVE_CELLAR_SENZOR;
    constructor(public payload: CellarSenzor){}
}

// export const SAVE_CELLAR_SENZOR_SUCCESS = '[CellarSenzor] Save success';
// export class SaveCellarSenzorSuccessAction implements Action {
//     readonly type = SAVE_CELLAR_SENZOR_SUCCESS;
//     constructor(public payload: CellarSenzor){}
// }

export const DELETE_CELLAR_SENZOR = '[CellarSenzor] Delete';
export class DeleteCellarSenzorAction implements Action {
    readonly type = DELETE_CELLAR_SENZOR;
    constructor(public payload: CellarSenzor){}
}