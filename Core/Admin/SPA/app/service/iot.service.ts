import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { CellarSenzor } from '../entities/CellarSenzor';
import { CellarSpace } from '../entities/CellarSpace';
import { CellarPlace } from '../entities/CellarPlace';
// import { CellarSpaceType } from '../entities/CellarSpaceType';


import { CellarDTO } from '../entities/http/CellarDTO';

import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';



@Injectable()
export class IoTService {
    isProduction = environment.production;
    isHttps = environment.https;

    private serverUrl: string = '';

    private url_getAllCellarPlaces: string;
    private url_getCellarPlace: string;
    private url_addCellarPlace: string;
    private url_removeCellarPlace: string;
    private url_updateCellarPlace: string;

    private url_getRootCellarSpaces: string;
    private url_getAllCellarSpaces: string;
    private url_getCellarSpaces: string;
    private url_removeCellarSpaces: string;
    private url_getCellarSpace: string;
    private url_addCellarSpace: string;
    private url_removeCellarSpace: string;
    private url_updateCellarSpace: string;

    private url_getAllCellarSenzors: string;
    private url_getCellarSenzors: string;
    private url_removeCellarSenzors: string;
    private url_getCellarSenzor: string;
    private url_addCellarSenzor: string;
    private url_removeCellarSenzor: string;
    private url_updateCellarSenzor: string;


    private headers: HttpHeaders;



    constructor(private http: HttpClient) {
        if (this.isProduction == true && this.isHttps == true) {
            this.serverUrl = "https://api.cellarstone.hub";
        }
        else if (this.isProduction == true && this.isHttps == false) {
            this.serverUrl = "http://api.cellarstone.hub";
        }
        else if (this.isProduction == false && this.isHttps == true) {
            this.serverUrl = "https://localhost:44403";
        }
        else if (this.isProduction == false && this.isHttps == false) {
            this.serverUrl = "http://localhost:44403";
        }

        this.url_getAllCellarPlaces = this.serverUrl + '/iot/getallplaces';
        this.url_getCellarPlace = this.serverUrl + '/iot/getplace';
        this.url_addCellarPlace = this.serverUrl + '/iot/addplace';
        this.url_removeCellarPlace = this.serverUrl + '/iot/removeplace';
        this.url_updateCellarPlace = this.serverUrl + '/iot/updateplace';

        this.url_getAllCellarSpaces = this.serverUrl + '/iot/getallspaces';
        this.url_getCellarSpaces = this.serverUrl + '/iot/getspaces';
        this.url_removeCellarSpaces = this.serverUrl + '/iot/removespaces';
        this.url_getCellarSpace = this.serverUrl + '/iot/getspace';
        this.url_addCellarSpace = this.serverUrl + '/iot/addspace';
        this.url_removeCellarSpace = this.serverUrl + '/iot/removespace';
        this.url_updateCellarSpace = this.serverUrl + '/iot/updatespace';

        this.url_getAllCellarSenzors = this.serverUrl + '/iot/getallsenzors';
        this.url_getCellarSenzors = this.serverUrl + '/iot/getsenzors';
        this.url_removeCellarSenzors = this.serverUrl + '/iot/removesenzors';
        this.url_getCellarSenzor = this.serverUrl + '/iot/getsenzor';
        this.url_addCellarSenzor = this.serverUrl + '/iot/addsenzor';
        this.url_removeCellarSenzor = this.serverUrl + '/iot/removesenzor';
        this.url_updateCellarSenzor = this.serverUrl + '/iot/updatesenzor';

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
    /*                  PLACE                     */
    /**********************************************/


    public GetAllCellarPlaces(): Observable<CellarDTO> {
        console.log('IoTHubService GetAllCellarPlaces()');

        this.setHeaders();
        let options = { headers: this.headers };

        return this.http.get(this.url_getAllCellarPlaces, options)
            .catch(this.handleError);
    }

    public GetCellarPlace(id: string): Observable<CellarDTO> {
        console.log('IoTHubService GetCellarPlace()');

        this.setHeaders();

        let body = {
            id: id
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_getCellarPlace, body, options)
            .catch(this.handleError);
    }


    public AddCellarPlace(item: CellarPlace): Observable<CellarPlace> {
        console.log('IoTHubService AddCellarPlace()');

        this.setHeaders();

        let body = {
            item: item
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_addCellarPlace, body, options)
            .catch(this.handleError);
    }

    public RemoveCellarPlace(id: string): Observable<CellarDTO> {
        console.log('IoTHubService RemoveCellarPlace()');

        this.setHeaders();

        let body = {
            id: id
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_removeCellarPlace, body, options)
            .catch(this.handleError);
    }

    public UpdateCellarPlace(item: CellarPlace): Observable<CellarPlace> {
        console.log('IoTHubService UpdateCellarPlace()');

        this.setHeaders();

        let body = {
            item: item
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_updateCellarPlace, body, options)
            .catch(this.handleError);
    }




    /**********************************************/
    /*                  SPACE                     */
    /**********************************************/

    public GetAllCellarSpaces(): Observable<CellarDTO> {
        console.log('IoTHubService GetAllCellarSpaces()');

        this.setHeaders();
        let options = { headers: this.headers };

        return this.http.get(this.url_getAllCellarSpaces, options)
            .catch(this.handleError);
    }

    public GetCellarSpaces(path: string): Observable<CellarDTO> {
        console.log('IoTHubService GetCellarSpaces()');

        this.setHeaders();


        let body = {
            path: path
        }


        let options = { headers: this.headers };

        return this.http.post(this.url_getCellarSpaces, body, options)
            .catch(this.handleError);
    }

    public GetCellarSpace(id: string): Observable<CellarDTO> {
        console.log('IoTHubService GetCellarSpace()');

        //new senzor
        if (id == "0") {

            //create a new senzor
            var res = new CellarDTO();
            var aaa = new CellarSpace();

            //set senzor state
            aaa.state = "1";

            res.data = aaa;

            return Observable.of(res);
        }
        //editing existing senzor   
        else {

            this.setHeaders();

            let body = {
                id: id
            }

            let options = { headers: this.headers };

            return this.http.post(this.url_getCellarSpace, body, options)
                .catch(this.handleError);
        }
    }

    public AddCellarSpace(item: CellarSpace): Observable<CellarSpace> {
        console.log('IoTHubService AddCellarSpace()');

        this.setHeaders();

        let body = {
            item: item
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_addCellarSpace, body, options)
            .catch(this.handleError);
    }

    public RemoveCellarSpace(id: string): Observable<CellarDTO> {
        console.log('IoTHubService RemoveCellarSpace()');

        this.setHeaders();

        let body = {
            id: id
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_removeCellarSpace, body, options)
            .catch(this.handleError);
    }

    public RemoveCellarSpaces(path: string): Observable<CellarDTO> {
        console.log('IoTHubService RemoveCellarSpaces()');

        this.setHeaders();

        let body = {
            path: path
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_removeCellarSpaces, body, options)
            .catch(this.handleError);
    }

    public UpdateCellarSpace(item: CellarSpace): Observable<CellarSpace> {
        console.log('IoTHubService UpdateCellarSpace()');

        this.setHeaders();

        let body = {
            item: item
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_updateCellarSpace, body, options)
            .catch(this.handleError);
    }








    /**********************************************/
    /*                   SENZOR                   */
    /**********************************************/


    public GetAllCellarSenzors(): Observable<CellarDTO> {
        console.log('IoTHubService GetAllCellarSenzors()');

        this.setHeaders();
        let options = { headers: this.headers };

        console.log(this.url_getAllCellarSenzors);

        return this.http.get(this.url_getAllCellarSenzors, options)
            .catch(this.handleError);
    }

    public GetCellarSenzors(path: string): Observable<CellarDTO> {
        console.log('IoTHubService GetCellarSenzors()');

        this.setHeaders();

        let body = {
            path: path
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_getCellarSenzors, body, options)
            .catch(this.handleError);
    }

    public GetCellarSenzor(id: string): Observable<CellarDTO> {
        console.log('IoTHubService GetCellarSenzor()');

        console.log(id);

        //new senzor
        if (id == "0") {

            //create a new senzor
            var res = new CellarDTO();
            var aaa = new CellarSenzor();

            //set senzor state
            aaa.state = "1";

            res.data = aaa;

            return Observable.of(res);
        }
        //editing existing senzor   
        else {

            this.setHeaders();

            let body = {
                id: id
            }

            let options = { headers: this.headers };

            return this.http.post(this.url_getCellarSenzor, body, options)
                .catch(this.handleError);
        }

    }

    public AddCellarSenzor(item: CellarSenzor): Observable<CellarSenzor> {
        console.log('IoTHubService AddCellarSenzor()');

        this.setHeaders();

        let body = {
            item: item
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_addCellarSenzor, body, options)
            .catch(this.handleError);
    }

    public RemoveCellarSenzor(id: string): Observable<CellarDTO> {
        console.log('IoTHubService RemoveCellarSenzor()');

        this.setHeaders();

        let body = {
            id: id
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_removeCellarSenzor, body, options)
            .catch(this.handleError);
    }

    public RemoveCellarSenzors(path: string): Observable<CellarDTO> {
        console.log('IoTHubService RemoveCellarSenzor()');

        this.setHeaders();

        let body = {
            path: path
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_removeCellarSenzors, body, options)
            .catch(this.handleError);
    }

    public UpdateCellarSenzor(item: CellarSenzor): Observable<CellarSenzor> {
        console.log('IoTHubService UpdateCellarSenzor()');

        this.setHeaders();

        let body = {
            item: item
        }
        
        let options = { headers: this.headers };

        return this.http.post(this.url_updateCellarSenzor, body, options)
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

