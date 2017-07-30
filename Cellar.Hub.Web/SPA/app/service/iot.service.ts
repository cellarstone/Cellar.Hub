import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import { CellarSenzor } from '../entities/CellarSenzor';
import { CellarSenzorSettings } from '../entities/CellarSenzorSettings';
import { CellarSpace } from '../entities/CellarSpace';
import { CellarSpaceType } from '../entities/CellarSpaceType';


import { CellarDTO } from '../entities/http/CellarDTO';

import { environment } from '../../environments/environment';



@Injectable()
export class IoTService
{
    isProduction = environment.production;
    isHttps = environment.https;

    private serverUrl: string = '';
    private url_getCellarSpace: string;
    
    private url_addCellarSpace: string;

    private url_removeCellarSpace: string;

    private url_updateCellarSpace: string;




    private headers: Headers;



    constructor(private http: Http)
    {
        if (this.isProduction == true && this.isHttps == true)
        {
            this.serverUrl = "https://api.internetaveci.cz";
        }
        else if (this.isProduction == true && this.isHttps == false)
        {
            this.serverUrl = "http://api.internetaveci.cz";
        }
        else if (this.isProduction == false && this.isHttps == true)
        {
            this.serverUrl = "https://localhost:44392";
        }
        else if (this.isProduction == false && this.isHttps == false)
        {
            this.serverUrl = "http://localhost:50713";
        }

        this.url_getCellarSpace = this.serverUrl + '/api/GetCellarSpace';

        this.url_addCellarSpace = this.serverUrl + '/api/AddCellarSpace';

        this.url_removeCellarSpace = this.serverUrl + '/api/RemoveCellarSpace';

        this.url_updateCellarSpace = this.serverUrl + '/api/UpdateCellarSpace';
    }

    

    /**********************************************/
    /*       GET  COLLECTIONS                     */
    /**********************************************/
    
    public GetCellarSpace(spaceId: number): Observable<CellarDTO>
    {
        console.log('IoTHubService GetCellarSpace()');

        let body = JSON.stringify({ spaceId });

        let options = new RequestOptions({ headers: this.headers, body: body });

        return this.http.get(this.url_getCellarSpace, options)
            .map(this.extractData)
            .catch(this.handleError);
    }



    /**********************************************/
    /*              ADD ITEM                      */
    /**********************************************/

    public AddCellarSpace(item: CellarSpace): Observable<CellarDTO>
    {
        console.log('IoTHubService AddCellarSpace()');


        let body = JSON.stringify(item);

        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_addCellarSpace, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }




    /**********************************************/
    /*              REMOVE ITEM                   */
    /**********************************************/

    public RemoveCellarSpace(spaceId: number): Observable<CellarDTO>
    {
        console.log('IoTHubService RemoveCellarSpace()');

        let body = JSON.stringify({ spaceId });

        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_removeCellarSpace, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    /**********************************************/
    /*              UPDATE ITEM                   */
    /**********************************************/

    public UpdateCellarSpace(item: CellarSpace): Observable<CellarDTO>
    {
        console.log('IoTHubService UpdateCellarSpace()');

        let body = JSON.stringify(item);

        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url_updateCellarSpace, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }










    /**********************************************/
    /*              HELPERS                    */
    /**********************************************/
    private extractData(res: Response): any
    {
        let body = res.json();
        return body || {};
    }
    private handleError(error: any): Promise<any>
    {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

