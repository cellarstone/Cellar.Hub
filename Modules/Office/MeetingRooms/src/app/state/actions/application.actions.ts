import { Action } from "@ngrx/store";
import { MeetingRoomDTO } from "../../dto/MeetingRoomDTO";
import { BookingVM } from "../../models/BookingVM";
import * as moment from 'moment';
import { MeetingDTO } from "../../dto/MeetingDTO";
import { CreateMeetingInput } from "../../dto/CreateMeetingInput";
import { DeleteMeetingInput } from "../../dto/DeleteMeetingInput";
import {LoadCalendarBookingsModel, LoadTimelineBookingsModel, CreateMeetingTestingModel, CreateMeetingTestingSuccessModel, DeleteMeetingTestingModel, DeleteMeetingTestingSuccessModel} from "../models/application.models"


//------------------------
// MEETING ROOMS
//------------------------


export const LOAD_ALL_MEETING_ROOMS = '[MeetingRoomDTO] Load All';
export class LoadAllMeetingRoomsAction implements Action {
    readonly type = LOAD_ALL_MEETING_ROOMS;
}

export const LOAD_ALL_MEETING_ROOMS_SUCCESS = '[MeetingRoomDTO] Load All success';
export class LoadAllMeetingRoomsSuccessAction implements Action {
    readonly type = LOAD_ALL_MEETING_ROOMS_SUCCESS;
    constructor(public payload: MeetingRoomDTO[]){}
}

export const LOAD_MEETING_ROOM = '[MeetingRoomDTO] Load';
export class LoadMeetingRoomAction implements Action {
    readonly type = LOAD_MEETING_ROOM;
    constructor(public payload: string){}
}

export const LOAD_MEETING_ROOM_SUCCESS = '[MeetingRoomDTO] Load success';
export class LoadMeetingRoomSuccessAction implements Action {
    readonly type = LOAD_MEETING_ROOM_SUCCESS;
    constructor(public payload: MeetingRoomDTO){}
}

export const SELECT_MEETING_ROOM = '[MeetingRoomDTO] Selected';
export class SelectMeetingRoomAction implements Action {
    readonly type = SELECT_MEETING_ROOM;
    constructor(public payload: MeetingRoomDTO){}
}

export const CLEAN_SELECTED_MEETING_ROOM = '[MeetingRoomDTO] Clean selected';
export class CleanSelectedMeetingRoomAction implements Action {
    readonly type = CLEAN_SELECTED_MEETING_ROOM;
}


//------------------------
// BOOKINGS
//------------------------

export const LOAD_CALENDAR_BOOKINGS = '[BookingVM] Load for Calendar';
export class LoadCalendarBookingsAction implements Action {
    readonly type = LOAD_CALENDAR_BOOKINGS;
    constructor(public payload: LoadCalendarBookingsModel){}
}

export const LOAD_CALENDAR_BOOKINGS_SUCCESS = '[BookingVM] Load for Calendar success';
export class LoadCalendarBookingsSuccessAction implements Action {
    readonly type = LOAD_CALENDAR_BOOKINGS_SUCCESS;
    constructor(public payload: BookingVM[]){}
}


export const LOAD_TIMELINE_BOOKINGS = '[BookingVM] Load for Timeline';
export class LoadTimelineBookingsAction implements Action {
    readonly type = LOAD_TIMELINE_BOOKINGS;
    constructor(public payload: LoadTimelineBookingsModel){}
}

export const LOAD_TIMELINE_BOOKINGS_SUCCESS = '[BookingVM] Load for Timeline success';
export class LoadTimelineBookingsSuccessAction implements Action {
    readonly type = LOAD_TIMELINE_BOOKINGS_SUCCESS;
    constructor(public payload: BookingVM[]){}
}


//------------------------
// MEETINGS
//------------------------


export const CREATE_MEETING = '[MeetingDTO] Create';
export class CreateMeetingAction implements Action {
    readonly type = CREATE_MEETING;
    constructor(public payload: CreateMeetingInput){}
}

export const CREATE_MEETING_FAILURE = '[MeetingDTO] Create Failure';
export class CreateMeetingFailureAction implements Action {
    readonly type = CREATE_MEETING_FAILURE;
    constructor(public payload: string){}
}

export const CREATE_MEETING_TESTING = '[MeetingDTO] Create Testing';
export class CreateMeetingTestingAction implements Action {
    readonly type = CREATE_MEETING_TESTING;
    constructor(public payload: CreateMeetingTestingModel){}
}

export const CREATE_MEETING_TESTING_SUCCESS = '[MeetingDTO] Create Testing success';
export class CreateMeetingTestingSuccessAction implements Action {
    readonly type = CREATE_MEETING_TESTING_SUCCESS;
    constructor(public payload: CreateMeetingTestingSuccessModel){}
}

export const CREATE_MEETING_TESTING_FAILURE = '[MeetingDTO] Create Testing failure';
export class CreateMeetingTestingFailureAction implements Action {
    readonly type = CREATE_MEETING_TESTING_FAILURE;
    constructor(public payload: string){}
}

export const SET_CREATE_MEETING_STATUS = '[MeetingDTO] Set Create Testing Status';
export class SetCreateMeetingStatusAction implements Action {
    readonly type = SET_CREATE_MEETING_STATUS;
    constructor(public payload: string){}
}


export const DELETE_MEETING = '[MeetingDTO] Delete';
export class DeleteMeetingAction implements Action {
    readonly type = DELETE_MEETING;
    constructor(public payload: DeleteMeetingInput){}
}

export const DELETE_MEETING_TESTING = '[MeetingDTO] Delete Testing';
export class DeleteMeetingTestingAction implements Action {
    readonly type = DELETE_MEETING_TESTING;
    constructor(public payload: DeleteMeetingTestingModel){}
}

export const DELETE_MEETING_TESTING_SUCCESS = '[MeetingDTO] Delete Testing success';
export class DeleteMeetingTestingSuccessAction implements Action {
    readonly type = DELETE_MEETING_TESTING_SUCCESS;
    constructor(public payload: DeleteMeetingTestingSuccessModel){}
}

export const DELETE_MEETING_TESTING_FAILURE = '[MeetingDTO] Delete Testing failure';
export class DeleteMeetingTestingFailureAction implements Action {
    readonly type = DELETE_MEETING_TESTING_FAILURE;
    constructor(public payload: string){}
}

export const SET_DELETE_MEETING_STATUS = '[MeetingDTO] Set Delete Testing Status';
export class SetDeleteMeetingStatusAction implements Action {
    readonly type = SET_DELETE_MEETING_STATUS;
    constructor(public payload: string){}
}

