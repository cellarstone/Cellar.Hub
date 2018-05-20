import * as moment from 'moment';

export class LoadTimelineBookingsModel {
    public email: string;
    public start: moment.Moment;
    public end: moment.Moment;
}

export class LoadCalendarBookingsModel {
    public email: string;
    public start: moment.Moment;
    public end: moment.Moment;
}

export class CreateMeetingTestingSuccessModel {
    public email: string;
    public start: moment.Moment;
    public end: moment.Moment;
}

export class CreateMeetingTestingModel {
    public email: string;
    public start: moment.Moment;
    public end: moment.Moment;
    public subject: string;
}


export class DeleteMeetingTestingSuccessModel {
    public email: string;
    public start: moment.Moment;
    public end: moment.Moment;
}

export class DeleteMeetingTestingModel {
    public email: string;
    public start: moment.Moment;
    public end: moment.Moment;
    public subject: string;
}