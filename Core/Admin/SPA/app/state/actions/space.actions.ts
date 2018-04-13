import { Action } from "@ngrx/store";
import { CellarSpace } from "app/entities/CellarSpace";

export const LOAD_ALL_CELLAR_SPACES = '[CellarSpaces] Load All';
export class LoadAllCellarSpacesAction implements Action {
    readonly type = LOAD_ALL_CELLAR_SPACES;
}

export const LOAD_ALL_CELLAR_SPACES_SUCCESS = '[CellarSpaces] Load All Success';
export class LoadAllCellarSpacesSuccessAction implements Action {
    readonly type = LOAD_ALL_CELLAR_SPACES_SUCCESS;
    constructor(public payload: CellarSpace[]){}
}

export const LOAD_CELLAR_SPACES = '[CellarSpaces] Load';
export class LoadCellarSpacesAction implements Action {
    readonly type = LOAD_CELLAR_SPACES;
    constructor(public payload: string){}
}

export const LOAD_CELLAR_SPACES_SUCCESS = '[CellarSpaces] Load Success';
export class LoadCellarSpacesSuccessAction implements Action {
    readonly type = LOAD_CELLAR_SPACES_SUCCESS;
    constructor(public payload: CellarSpace[]){}
}



export const LOAD_CELLAR_SPACE = '[CellarSpace] Load';
export class LoadCellarSpaceAction implements Action {
    readonly type = LOAD_CELLAR_SPACE;
    constructor(public payload: string){}
}

export const LOAD_CELLAR_SPACE_SUCCESS = '[CellarSpace] Load success';
export class LoadCellarSpaceSuccessAction implements Action {
    readonly type = LOAD_CELLAR_SPACE_SUCCESS;
    constructor(public payload: CellarSpace){}
}

export const SAVE_CELLAR_SPACE = '[CellarSpace] Save';
export class SaveCellarSpaceAction implements Action {
    readonly type = SAVE_CELLAR_SPACE;
    constructor(public payload: CellarSpace){}
}


export const DELETE_CELLAR_SPACE = '[CellarSpace] Delete';
export class DeleteCellarSpaceAction implements Action {
    readonly type = DELETE_CELLAR_SPACE;
    constructor(public payload: CellarSpace){}
}

export const DELETE_CELLAR_SPACE_SUCCESS = '[CellarSpace] Delete success';
export class DeleteCellarSpaceSuccessAction implements Action {
    readonly type = DELETE_CELLAR_SPACE_SUCCESS;
}

export const DELETE_CELLAR_SPACE_FAILURE = '[CellarSpace] Delete failure';
export class DeleteCellarSpaceFailureAction implements Action {
    readonly type = DELETE_CELLAR_SPACE_FAILURE;
    constructor(public payload: string){}
}