import { Action } from "@ngrx/store";
import { CellarSenzor } from "app/entities/CellarSenzor";

export const LOAD_ALL_CELLAR_SENZORS = '[CellarSenzors] Load All';
export class LoadAllCellarSenzorsAction implements Action {
    readonly type = LOAD_ALL_CELLAR_SENZORS;
}

export const LOAD_ALL_CELLAR_SENZORS_SUCCESS = '[CellarSenzors] Load All success';
export class LoadAllCellarSenzorsSuccessAction implements Action {
    readonly type = LOAD_ALL_CELLAR_SENZORS_SUCCESS;
    constructor(public payload: CellarSenzor[]){}
}

export const LOAD_CELLAR_SENZORS = '[CellarSenzors] Load';
export class LoadCellarSenzorsAction implements Action {
    readonly type = LOAD_CELLAR_SENZORS;
    constructor(public payload: string){}
}

export const LOAD_CELLAR_SENZORS_SUCCESS = '[CellarSenzors] Load Success';
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