import { Moment } from "moment";

export class Booking {
    public name: string;
    public by: string;
    public subject: string;
    public from: any;
    public fromFullDateTime: Moment;
    public to: any;
    public toFullDateTime: Moment;
    public duration: string;
    public status: string;
}