import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Http, Headers, Response } from '@angular/http';
import { MeetingRoomVM } from '../models/MeetingRoomVM';
import { MeetingVM } from '../models/MeetingVM';
import { BehaviorSubject } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';



@Injectable()
export class SharedService {
    public state: string;
    public activeTab: string;

    
    public roomStatus$: Observable<any>;

    public selectedRoomStore = new BehaviorSubject<MeetingRoomVM>(new MeetingRoomVM());
    public selectedRoom$ = this.selectedRoomStore.asObservable();

    public actualMeetingsStore = new BehaviorSubject<Array<MeetingVM>>(new Array<MeetingVM>());
    public actualMeetings$ = this.actualMeetingsStore.asObservable();

    // public selectedRoom$: Observable<MeetingRoomVM>;
    //public actualMeetings$: Observable<Array<MeetingVM>>;

    constructor(private http: Http) {

    }

    // public getData() {
    //     this.roomStatus$ = Observable.interval(1000).take(5);
    //     return this.roomStatus$;
    // }

    // public saveData(data: any[]){
    //     const headers = new Headers({'Content-Type': 'application/json'});
    //     return this.http.post('https://iot-test-4e1b2.firebaseio.com/', data, {headers: headers});
    // }

}