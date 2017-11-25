import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import { CellarDTO } from '../entities/http/CellarDTO';

import { environment } from '../../environments/environment';



@Injectable()
export class CdnService {
    isProduction = environment.production;
    isHttps = environment.https;

    private serverUrl: string = '';
    
    private url_upload: string;
    private url_uploadFullSmall: string;



    private headers: Headers;



    constructor(private http: Http) {
        if (this.isProduction == true && this.isHttps == true) {
            this.serverUrl = "https://cellar.hub.cdn:8884";
        }
        else if (this.isProduction == true && this.isHttps == false) {
            this.serverUrl = "http://cellar.hub.cdn:8884";
        }
        else if (this.isProduction == false && this.isHttps == true) {
            this.serverUrl = "https://localhost:8884";
        }
        else if (this.isProduction == false && this.isHttps == false) {
            this.serverUrl = "http://localhost:8884";
        }

        this.url_upload = this.serverUrl + '/Data/Upload';
        this.url_uploadFullSmall = this.serverUrl + '/Data/UploadFullSmall';
    }




    private setHeaders() {

        console.log('setHeaders started');

        this.headers = new Headers();
        // this.headers.append('Content-Type', 'multipart/form-data');
        this.headers.append('Accept', 'application/json');

        this.headers.append('Access-Control-Allow-Methods', '*');
        this.headers.append('Access-Control-Allow-Origin', '*');

        // let token = this._securityService.GetToken();
        // if (token !== '')
        // {
        //     let tokenValue = 'Bearer ' + token;
        //     console.log('tokenValue:' + tokenValue);
        //     this.headers.append('Authorization', tokenValue);
        // }
    }






    /**********************************************/
    /*              FILE UPLOAD                    */
    /**********************************************/
    upload(fileToUpload: any): Observable<CellarDTO>
    {
        let input = new FormData();
        input.append("file", fileToUpload);

        
        this.setHeaders();
        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_upload, input, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    uploadFullSmall(fileToUpload: any): Observable<CellarDTO>
    {
        let input = new FormData();
        input.append("file", fileToUpload);

        console.log(fileToUpload);

        this.setHeaders();
        this.headers.delete('Content-Type');
        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_uploadFullSmall, input, options)
            .map(this.extractData)
            .catch(this.handleError);
    }






    /**********************************************/
    /*              HELPERS                    */
    /**********************************************/
    private extractData(res: Response): any {
        let body = res.json();
        return body || {};
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

