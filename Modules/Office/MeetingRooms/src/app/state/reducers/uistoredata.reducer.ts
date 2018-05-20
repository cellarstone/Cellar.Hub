import * as _ from 'lodash';

import { Action } from "@ngrx/store";
import { StoreData } from '../state/store-data';
import { LoadAllMeetingRoomsSuccessAction, LOAD_ALL_MEETING_ROOMS_SUCCESS, LOAD_TIMELINE_BOOKINGS_SUCCESS, LoadTimelineBookingsSuccessAction, LoadCalendarBookingsSuccessAction, LOAD_CALENDAR_BOOKINGS_SUCCESS } from 'app/state/actions/application.actions';

export function storeData(state: StoreData, action: Action): StoreData {
    switch (action.type) {

        case LOAD_ALL_MEETING_ROOMS_SUCCESS:
            return mapMeetingRoomsToState(state, <LoadAllMeetingRoomsSuccessAction>action);

        case LOAD_TIMELINE_BOOKINGS_SUCCESS:
            return mapTimelineBookingsToState(state, <LoadTimelineBookingsSuccessAction>action);

        case LOAD_CALENDAR_BOOKINGS_SUCCESS:
            return mapCalendarBookingsToState(state, <LoadCalendarBookingsSuccessAction>action);

        default:
            return state;
    }
}


function mapMeetingRoomsToState(state: StoreData, action: LoadAllMeetingRoomsSuccessAction): StoreData {
    return {
        ...state,
        meetingRooms: action.payload
    };
}

function mapTimelineBookingsToState(state: StoreData, action: LoadTimelineBookingsSuccessAction): StoreData {
    return {
        ...state,
        timelineBookings: action.payload
    };
}

function mapCalendarBookingsToState(state: StoreData, action: LoadCalendarBookingsSuccessAction): StoreData {
    return {
        ...state,
        calendarBookings: action.payload
    };
}