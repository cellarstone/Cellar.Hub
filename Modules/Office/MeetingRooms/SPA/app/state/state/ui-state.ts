import { MeetingRoomDTO } from "app/dto/MeetingRoomDTO";
import * as moment from 'moment';

export interface UiState {
    selectedMeetingRoom: MeetingRoomDTO;
    createOrDeleteMeetingStatus: string;
}

export const INITIAL_UI_STATE: UiState = {
    selectedMeetingRoom: null,
    createOrDeleteMeetingStatus: ""
};