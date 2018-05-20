import { Action } from "@ngrx/store";
import { CellarPlace } from "../../entities/CellarPlace";


export const LOAD_ALL_CELLAR_PLACES = '[CellarPlace] Load All';
export class LoadAllCellarPlacesAction implements Action {
    readonly type = LOAD_ALL_CELLAR_PLACES;
}

export const LOAD_ALL_CELLAR_PLACES_SUCCESS = '[CellarPlace] Load All success';
export class LoadAllCellarPlacesSuccessAction implements Action {
    readonly type = LOAD_ALL_CELLAR_PLACES_SUCCESS;
    constructor(public payload: CellarPlace[]){}
}


export const LOAD_CELLAR_PLACE = '[CellarPlace] Load';
export class LoadCellarPlaceAction implements Action {
    readonly type = LOAD_CELLAR_PLACE;
    constructor(public payload: string){}
}

export const LOAD_CELLAR_PLACE_SUCCESS = '[CellarPlace] Load success';
export class LoadCellarPlaceSuccessAction implements Action {
    readonly type = LOAD_CELLAR_PLACE_SUCCESS;
    constructor(public payload: CellarPlace){}
}

export const SAVE_CELLAR_PLACE = '[CellarPlace] Save';
export class SaveCellarPlaceAction implements Action {
    readonly type = SAVE_CELLAR_PLACE;
    constructor(public payload: CellarPlace){}
}

// export const SAVE_CELLAR_PLACE_SUCCESS = '[CellarPlace] Save success';
// export class SaveCellarPlaceSuccessAction implements Action {
//     readonly type = SAVE_CELLAR_PLACE_SUCCESS;
//     constructor(public payload: CellarPlace){}
// }

export const DELETE_CELLAR_PLACE = '[CellarPlace] Delete';
export class DeleteCellarPlaceAction implements Action {
    readonly type = DELETE_CELLAR_PLACE;
    constructor(public payload: CellarPlace){}
}

export const DELETE_CELLAR_PLACE_SUCCESS = '[CellarPlace] Delete success';
export class DeleteCellarPlaceSuccessAction implements Action {
    readonly type = DELETE_CELLAR_PLACE_SUCCESS;
}

export const DELETE_CELLAR_PLACE_FAILURE = '[CellarPlace] Delete failure';
export class DeleteCellarPlaceFailureAction implements Action {
    readonly type = DELETE_CELLAR_PLACE_FAILURE;
    constructor(public payload: string){}
}
