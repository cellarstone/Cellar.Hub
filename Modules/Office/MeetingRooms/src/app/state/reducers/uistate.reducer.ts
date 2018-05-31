import * as _ from 'lodash';

import { UiState, INITIAL_UI_STATE } from "../state/ui-state";
import { Action } from "@ngrx/store";
import { SelectMeetingRoomAction, CleanSelectedMeetingRoomAction, CLEAN_SELECTED_MEETING_ROOM, SELECT_MEETING_ROOM, LOAD_MEETING_ROOM_SUCCESS, LoadMeetingRoomAction, LoadMeetingRoomSuccessAction, SET_CREATE_MEETING_STATUS, SetCreateMeetingStatusAction, CREATE_MEETING_TESTING_SUCCESS, CreateMeetingTestingSuccessAction, CREATE_MEETING_TESTING_FAILURE, DELETE_MEETING_TESTING_FAILURE, SET_DELETE_MEETING_STATUS, SetDeleteMeetingStatusAction, CREATE_MEETING_FAILURE } from 'app/state/actions/application.actions';


export function uiState(state: UiState = INITIAL_UI_STATE, action: any): UiState {
    switch (action.type) {

        case SELECT_MEETING_ROOM:
            return mapMeetingRoomToState(state, <SelectMeetingRoomAction>action);

        case CLEAN_SELECTED_MEETING_ROOM:
            return unmapMeetingRoomToState(state, <CleanSelectedMeetingRoomAction>action);

        case LOAD_MEETING_ROOM_SUCCESS:
            return mapMeetingRoomToState(state, <LoadMeetingRoomSuccessAction>action);

        case SET_CREATE_MEETING_STATUS:
            return mapMeetingStatusToState(state, <SetCreateMeetingStatusAction>action);
        
        case SET_DELETE_MEETING_STATUS:
            return mapMeetingStatusToState(state, <SetDeleteMeetingStatusAction>action);

        case CREATE_MEETING_FAILURE:
            return {...state, createOrDeleteMeetingStatus: "Failed"};

        case CREATE_MEETING_TESTING_FAILURE:
            return {...state, createOrDeleteMeetingStatus: "Failed"};

        case DELETE_MEETING_TESTING_FAILURE:
            return {...state, createOrDeleteMeetingStatus: "Failed"};

        default:
            return state;
    }

}


function mapMeetingRoomToState(state: UiState, action: any): UiState {
    return {
        ...state,
        selectedMeetingRoom: action.payload
    };
}

function unmapMeetingRoomToState(state: UiState, action: CleanSelectedMeetingRoomAction): UiState {
    return {
        ...state,
        selectedMeetingRoom: null
    };
}

function mapMeetingStatusToState(state: UiState, action: any): UiState {
    return {
        ...state,
        createOrDeleteMeetingStatus: action.payload
    };
}




