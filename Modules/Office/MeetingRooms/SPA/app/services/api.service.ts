import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { CellarSpace } from '../entities/CellarSpace';

import { CellarDTO } from '../entities/http/CellarDTO';

import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';



@Injectable()
export class ApiService {
    isProduction = true;
    isHttps = false;

    private serverUrl: string = '';

    private url_getAllCellarSpaces: string;

    private headers: HttpHeaders;



    constructor(private http: HttpClient) {
        if (this.isProduction == true && this.isHttps == true) {
            this.serverUrl = "https://officeapi.cellarstone.hub";
        }
        else if (this.isProduction == true && this.isHttps == false) {
            this.serverUrl = "http://officeapi.cellarstone.hub";
        }
        else if (this.isProduction == false && this.isHttps == true) {
            this.serverUrl = "https://localhost:44513";
        }
        else if (this.isProduction == false && this.isHttps == false) {
            this.serverUrl = "http://localhost:44513";
        }

        console.log(this.serverUrl);
        
        this.url_getAllCellarSpaces = this.serverUrl + '/spaces';

    }




    private setHeaders() {

        let headerJson = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
        }

        this.headers = new HttpHeaders(headerJson);

        // this.headers = new HttpHeaders();
        // this.headers.append('Content-Type', 'application/json');
        // this.headers.append('Accept', 'application/json');

        // this.headers.append('Access-Control-Allow-Methods', '*');
        // this.headers.append('Access-Control-Allow-Origin', '*');

        // let token = this._securityService.GetToken();
        // if (token !== '')
        // {
        //     let tokenValue = 'Bearer ' + token;
        //     console.log('tokenValue:' + tokenValue);
        //     this.headers.append('Authorization', tokenValue);
        // }
    }




    /**********************************************/
    /*                  SPACE                     */
    /**********************************************/

    public GetAllCellarSpaces(): Observable<CellarDTO> {
        console.log('ApiService GetAllCellarSpaces()');

        this.setHeaders();
        let options = { headers: this.headers };

        return this.http.get(this.url_getAllCellarSpaces, options)
            .catch(this.handleError);
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

