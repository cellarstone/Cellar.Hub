import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { CellarDTO } from '../entities/http/CellarDTO';

import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';



@Injectable()
export class FileService {
    private serverUrl: string = environment.fileServerUrl;
    
    private url_upload= this.serverUrl + '/upload';
    private url_uploadFullSmall= this.serverUrl + '/Data/UploadFullSmall';



    private headers: HttpHeaders;



    constructor(private http: HttpClient) {
        console.log(this.serverUrl);
    }


    private setHeaders() {
        let headerJson = {
            // 'Content-Type':'application/json',
            'Accept':'application/json',
            'Access-Control-Allow-Methods':'*',
            'Access-Control-Allow-Origin':'*'
            }
            
        this.headers = new HttpHeaders(headerJson );
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
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
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
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }






    /**********************************************/
    /*              HELPERS                    */
    /**********************************************/
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

