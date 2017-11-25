import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import { CellarSenzor } from '../entities/CellarSenzor';
import { CellarSpace } from '../entities/CellarSpace';
// import { CellarSpaceType } from '../entities/CellarSpaceType';


import { CellarDTO } from '../entities/http/CellarDTO';

import { environment } from '../../environments/environment';



@Injectable()
export class IoTService {
    isProduction = environment.production;
    isHttps = environment.https;

    private serverUrl: string = '';
    
    private url_getCellarSpace: string;
    private url_addCellarSpace: string;
    private url_removeCellarSpace: string;
    private url_updateCellarSpace: string;

    private url_getCellarSenzors: string;
    private url_getCellarSenzor: string;
    private url_addCellarSenzor: string;
    private url_removeCellarSenzor: string;
    private url_updateCellarSenzor: string;


    private headers: Headers;



    constructor(private http: Http) {
        if (this.isProduction == true && this.isHttps == true) {
            this.serverUrl = "https://cellar.hub.api:5005";
        }
        else if (this.isProduction == true && this.isHttps == false) {
            this.serverUrl = "http://cellar.hub.api:5005";
        }
        else if (this.isProduction == false && this.isHttps == true) {
            this.serverUrl = "https://localhost:44392";
        }
        else if (this.isProduction == false && this.isHttps == false) {
            this.serverUrl = "http://localhost:8885";
        }

        this.url_getCellarSpace = this.serverUrl + '/Space/GetCellarSpace';
        this.url_addCellarSpace = this.serverUrl + '/Space/AddCellarSpace';
        this.url_removeCellarSpace = this.serverUrl + '/Space/RemoveCellarSpace';
        this.url_updateCellarSpace = this.serverUrl + '/Space/UpdateCellarSpace';

        this.url_getCellarSenzors = this.serverUrl + '/Space/GetCellarSenzors';
        this.url_getCellarSenzor = this.serverUrl + '/Space/GetCellarSenzor';
        this.url_addCellarSenzor = this.serverUrl + '/Space/AddCellarSenzor';
        this.url_removeCellarSenzor = this.serverUrl + '/Space/RemoveCellarSenzor';
        this.url_updateCellarSenzor = this.serverUrl + '/Space/UpdateCellarSenzor';

    }




    private setHeaders() {

        console.log('setHeaders started');

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
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
    /*       GET  COLLECTIONS                     */
    /**********************************************/

    public GetCellarSenzors(): Observable<CellarDTO> {
        console.log('IoTHubService GetCellarSenzors()');
        
                this.setHeaders();
                let options = new RequestOptions({ headers: this.headers, body: '' });
        
                return this.http.get(this.url_getCellarSenzors, options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }





    public GetCellarSpace(id: string): Observable<CellarDTO> {
        console.log('IoTHubService GetCellarSpace()');

        this.setHeaders();

        let body = JSON.stringify(id);

        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_getCellarSpace, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public GetCellarSenzor(id: string): Observable<CellarDTO> {
        console.log('IoTHubService GetCellarSenzor()');

        this.setHeaders();

        let body = JSON.stringify(id);

        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_getCellarSenzor, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }



    /**********************************************/
    /*              ADD ITEM                      */
    /**********************************************/

    public AddCellarSpace(item: CellarSpace): Observable<CellarDTO> {
        console.log('IoTHubService AddCellarSpace()');

        this.setHeaders();

        let body = JSON.stringify(item);

        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_addCellarSpace, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public AddCellarSenzor(item: CellarSenzor): Observable<CellarDTO> {
        console.log('IoTHubService AddCellarSenzor()');

        this.setHeaders();

        let body = JSON.stringify(item);

        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_addCellarSenzor, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }



    /**********************************************/
    /*              REMOVE ITEM                   */
    /**********************************************/

    public RemoveCellarSpace(id: number): Observable<CellarDTO> {
        console.log('IoTHubService RemoveCellarSpace()');
        
        this.setHeaders();

        let body = JSON.stringify({ id });

        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_removeCellarSpace, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public RemoveCellarSenzor(id: number): Observable<CellarDTO> {
        console.log('IoTHubService RemoveCellarSenzor()');
        
        this.setHeaders();

        let body = JSON.stringify({ id });

        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_removeCellarSenzor, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    /**********************************************/
    /*              UPDATE ITEM                   */
    /**********************************************/

    public UpdateCellarSpace(item: CellarSpace): Observable<CellarDTO> {
        console.log('IoTHubService UpdateCellarSpace()');
        
        this.setHeaders();
        
        let body = JSON.stringify(item);

        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_updateCellarSpace, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public UpdateCellarSenzor(item: CellarSenzor): Observable<CellarDTO> {
        console.log('IoTHubService UpdateCellarSenzor()');
        
        this.setHeaders();
        
        let body = JSON.stringify(item);

        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_updateCellarSenzor, body, options)
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

