import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { CellarDTO } from '../entities/http/CellarDTO';

import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';



@Injectable()
export class CdnService {
    isProduction = environment.production;
    isHttps = environment.https;

    private serverUrl: string = '';
    
    private url_upload: string;
    private url_uploadFullSmall: string;



    private headers: HttpHeaders;



    constructor(private http: HttpClient) {
        if (this.isProduction == true && this.isHttps == true) {
            this.serverUrl = "https://cdn.cellarstone.hub";
        }
        else if (this.isProduction == true && this.isHttps == false) {
            this.serverUrl = "http://cdn.cellarstone.hub";
        }
        else if (this.isProduction == false && this.isHttps == true) {
            this.serverUrl = "https://localhost:44404";
        }
        else if (this.isProduction == false && this.isHttps == false) {
            this.serverUrl = "http://localhost:44404";
        }

        this.url_upload = this.serverUrl + '/upload';
        this.url_uploadFullSmall = this.serverUrl + '/Data/UploadFullSmall';
    }




    private setHeaders() {

        console.log('setHeaders started');

        let headerJson = {
            // 'Content-Type':'application/json',
            'Accept':'application/json',
            'Access-Control-Allow-Methods':'*',
            'Access-Control-Allow-Origin':'*'
            }
            
        this.headers = new HttpHeaders(headerJson );


        // this.headers = new HttpHeaders();
        // // this.headers.append('Content-Type', 'multipart/form-data');
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
    /*              FILE UPLOAD                    */
    /**********************************************/
    upload(fileToUpload: any): Observable<CellarDTO>
    {
        let input = new FormData();
        input.append("file", fileToUpload);

        
        this.setHeaders();
        let options = { headers: this.headers };

        return this.http.post(this.url_upload, input, options)
            .catch(this.handleError);
    }

    uploadFullSmall(fileToUpload: any): Observable<CellarDTO>
    {
        let input = new FormData();
        input.append("file", fileToUpload);

        console.log(fileToUpload);

        this.setHeaders();
        this.headers.delete('Content-Type');
        let options = { headers: this.headers };

        return this.http.post(this.url_uploadFullSmall, input, options)
            .catch(this.handleError);
    }






    /**********************************************/
    /*              HELPERS                    */
    /**********************************************/
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

