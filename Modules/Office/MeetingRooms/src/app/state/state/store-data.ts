import { MeetingRoomDTO } from "app/dto/MeetingRoomDTO";
import { MeetingDTO } from "app/dto/MeetingDTO";
import { BookingVM } from "app/models/BookingVM";

export interface StoreData {
    meetingRooms: MeetingRoomDTO[];
    timelineBookings: BookingVM[];
    calendarBookings: BookingVM[];
}

export const INITIAL_STORE_DATA: StoreData = {
    meetingRooms: null,
    timelineBookings: null,
    calendarBookings: null
};