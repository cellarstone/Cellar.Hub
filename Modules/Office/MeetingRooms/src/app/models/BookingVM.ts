import * as moment from 'moment';

export class BookingVM {
    public name: string;
    public by: string;
    public subject: string;
    public start: moment.Moment;
    public end: moment.Moment;
    public duration: string;
    public status: string;
}