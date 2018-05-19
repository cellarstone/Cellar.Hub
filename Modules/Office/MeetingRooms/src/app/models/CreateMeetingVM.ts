import * as moment from 'moment';

export class CreateMeetingVM {

    public attendeeMails: string[] = [];
    public start: moment.Moment;
    public end: moment.Moment;
    public location: string = "";
    public subject: string = "";
    public text: string = "";

}
