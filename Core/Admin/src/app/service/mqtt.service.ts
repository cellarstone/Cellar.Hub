import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { CellarDTO } from '../entities/http/CellarDTO';

import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PublishToMqttModel } from 'app/models/publishToMqtt.model';



@Injectable()
export class MqttService {
    private serverUrl: string = environment.iotUrl;

    private url_publishToMqtt = this.serverUrl + '/iot/publishtomqtt';

    private headers: HttpHeaders;



    constructor(private http: HttpClient) {}




    private setHeaders() {

        let headerJson = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
        }

        this.headers = new HttpHeaders(headerJson);
    }



    /**********************************************/
    /*                  MQTT API                  */
    /**********************************************/


    public PublishToMqtt(vm: PublishToMqttModel): Observable<CellarDTO> {
        console.log('MqttService PublishToMqtt()');

        this.setHeaders();




        let body = JSON.stringify(vm);

        let options = { headers: this.headers };

        console.log(this.url_publishToMqtt);
        console.log(body);

        // return this.http.get(this.url_publishToMqtt, options)
        //     .catch(this.handleError);

        return this.http.post(this.url_publishToMqtt, body, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }



    /**********************************************/
    /*              HELPERS                    */
    /**********************************************/
    // private extractData(res: CellarDTO): any {
    //     return res || {};
    // }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

