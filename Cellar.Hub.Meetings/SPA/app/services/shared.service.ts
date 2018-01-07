import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SharedService {
    state: string;
    activeTab: string;

    roomStatus$: Observable<any>;

    constructor(private http: Http) {

    }

    getData() {
        this.roomStatus$ = Observable.interval(1000).take(5);
        return this.roomStatus$;
    }

    saveData(data: any[]){
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('https://iot-test-4e1b2.firebaseio.com/', data, {headers: headers});
    }

}