import { Action } from "@ngrx/store";
import { CellarMeetingRoom } from "../../entities/CellarMeetingRoom";


export const LOAD_ALL_CELLAR_MEETING_ROOMS = '[CellarMeetingRoom] Load All';
export class LoadAllCellarMeetingRoomAction implements Action {
    readonly type = LOAD_ALL_CELLAR_MEETING_ROOMS;
}

export const LOAD_ALL_CELLAR_MEETING_ROOMS_SUCCESS = '[CellarMeetingRoom] Load All success';
export class LoadAllCellarMeetingRoomsSuccessAction implements Action {
    readonly type = LOAD_ALL_CELLAR_MEETING_ROOMS_SUCCESS;
    constructor(public payload: CellarMeetingRoom[]){}
}


export const LOAD_CELLAR_MEETING_ROOM = '[CellarMeetingRoom] Load';
export class LoadCellarMeetingRoomAction implements Action {
    readonly type = LOAD_CELLAR_MEETING_ROOM;
    constructor(public payload: string){}
}

export const LOAD_CELLAR_MEETING_ROOM_SUCCESS = '[CellarMeetingRoom] Load success';
export class LoadCellarMeetingRoomSuccessAction implements Action {
    readonly type = LOAD_CELLAR_MEETING_ROOM_SUCCESS;
    constructor(public payload: CellarMeetingRoom){}
}

export const SAVE_CELLAR_MEETING_ROOM = '[CellarMeetingRoom] Save';
export class SaveCellarMeetingRoomAction implements Action {
    readonly type = SAVE_CELLAR_MEETING_ROOM;
    constructor(public payload: CellarMeetingRoom){}
}

export const SAVE_CELLAR_MEETING_ROOM_SUCCESS = '[CellarMeetingRoom] Save success';
export class SaveCellarMeetingRoomSuccessAction implements Action {
    readonly type = SAVE_CELLAR_MEETING_ROOM_SUCCESS;
    constructor(public payload: CellarMeetingRoom){}
}

export const DELETE_CELLAR_MEETING_ROOM = '[CellarMeetingRoom] Delete';
export class DeleteCellarMeetingRoomAction implements Action {
    readonly type = DELETE_CELLAR_MEETING_ROOM;
    constructor(public payload: string){}
}

export const DELETE_CELLAR_MEETING_ROOM_SUCCESS = '[CellarMeetingRoom] Delete success';
export class DeleteCellarMeetingRoomSuccessAction implements Action {
    readonly type = DELETE_CELLAR_MEETING_ROOM_SUCCESS;
}

export const DELETE_CELLAR_MEETING_ROOM_FAILURE = '[CellarMeetingRoom] Delete failure';
export class DeleteCellarMeetingRoomFailureAction implements Action {
    readonly type = DELETE_CELLAR_MEETING_ROOM_FAILURE;
    constructor(public payload: string){}
}



export const CLEAN_SELECTED_CELLAR_MEETING_ROOM = '[CellarMeetingRoom] Clean selected';
export class CleanSelectedCellarMeetingRoomAction implements Action {
    readonly type = CLEAN_SELECTED_CELLAR_MEETING_ROOM;
}