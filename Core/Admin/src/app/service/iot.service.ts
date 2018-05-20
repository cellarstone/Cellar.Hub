import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { CellarSenzor } from '../entities/CellarSenzor';
import { CellarSpace } from '../entities/CellarSpace';
import { CellarPlace } from '../entities/CellarPlace';
// import { CellarSpaceType } from '../entities/CellarSpaceType';


import { CellarDTO } from '../entities/http/CellarDTO';

import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';



@Injectable()
export class IoTService {
    private serverUrl: string = environment.iotUrl;

    private url_getAllCellarPlaces = this.serverUrl + '/iot/getallplaces';
    private url_getCellarPlace = this.serverUrl + '/iot/getplace';
    private url_addCellarPlace = this.serverUrl + '/iot/addplace';
    private url_removeCellarPlace = this.serverUrl + '/iot/removeplace';
    private url_updateCellarPlace = this.serverUrl + '/iot/updateplace';

    private url_getAllCellarSpaces = this.serverUrl + '/iot/getallspaces';
    private url_getCellarSpaces = this.serverUrl + '/iot/getspaces';
    private url_removeCellarSpaces = this.serverUrl + '/iot/removespaces';
    private url_getCellarSpace = this.serverUrl + '/iot/getspace';
    private url_addCellarSpace = this.serverUrl + '/iot/addspace';
    private url_removeCellarSpace = this.serverUrl + '/iot/removespace';
    private url_updateCellarSpace = this.serverUrl + '/iot/updatespace';

    private url_getAllCellarSenzors = this.serverUrl + '/iot/getallsenzors';
    private url_getCellarSenzors = this.serverUrl + '/iot/getsenzors';
    private url_removeCellarSenzors = this.serverUrl + '/iot/removesenzors';
    private url_getCellarSenzor = this.serverUrl + '/iot/getsenzor';
    private url_addCellarSenzor = this.serverUrl + '/iot/addsenzor';
    private url_removeCellarSenzor = this.serverUrl + '/iot/removesenzor';
    private url_updateCellarSenzor = this.serverUrl + '/iot/updatesenzor';


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
    /*                  PLACE                     */
    /**********************************************/


    public GetAllCellarPlaces(): Observable<CellarDTO> {
        console.log('IoTHubService GetAllCellarPlaces()');

        this.setHeaders();
        let options = { headers: this.headers };

        return this.http.get(this.url_getAllCellarPlaces, options)
            .pipe(
                map(res => res),
                catchError(this.handleError)
            );
    }

    public GetCellarPlace(id: string): Observable<CellarDTO> {
        console.log('IoTHubService GetCellarPlace()');

        this.setHeaders();

        let body = {
            id: id
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_getCellarPlace, body, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }


    public AddCellarPlace(item: CellarPlace): Observable<CellarPlace> {
        console.log('IoTHubService AddCellarPlace()');

        this.setHeaders();

        let body = {
            item: item
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_addCellarPlace, body, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    public RemoveCellarPlace(id: string): Observable<CellarDTO> {
        console.log('IoTHubService RemoveCellarPlace()');

        this.setHeaders();

        let body = {
            id: id
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_removeCellarPlace, body, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    public UpdateCellarPlace(item: CellarPlace): Observable<CellarPlace> {
        console.log('IoTHubService UpdateCellarPlace()');

        this.setHeaders();

        let body = {
            item: item
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_updateCellarPlace, body, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }




    /**********************************************/
    /*                  SPACE                     */
    /**********************************************/

    public GetAllCellarSpaces(): Observable<CellarDTO> {
        console.log('IoTHubService GetAllCellarSpaces()');

        this.setHeaders();
        let options = { headers: this.headers };

        return this.http.get(this.url_getAllCellarSpaces, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    public GetCellarSpaces(path: string): Observable<CellarDTO> {
        console.log('IoTHubService GetCellarSpaces()');

        this.setHeaders();


        let body = {
            path: path
        }


        let options = { headers: this.headers };

        return this.http.post(this.url_getCellarSpaces, body, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
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

            return of(res);
        }
        //editing existing senzor   
        else {

            this.setHeaders();

            let body = {
                id: id
            }

            let options = { headers: this.headers };

            return this.http.post(this.url_getCellarSpace, body, options)
            .pipe(
                map(res => res),
                catchError(this.handleError)
            );
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
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    public RemoveCellarSpace(id: string): Observable<CellarDTO> {
        console.log('IoTHubService RemoveCellarSpace()');

        this.setHeaders();

        let body = {
            id: id
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_removeCellarSpace, body, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    public RemoveCellarSpaces(path: string): Observable<CellarDTO> {
        console.log('IoTHubService RemoveCellarSpaces()');

        this.setHeaders();

        let body = {
            path: path
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_removeCellarSpaces, body, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    public UpdateCellarSpace(item: CellarSpace): Observable<CellarSpace> {
        console.log('IoTHubService UpdateCellarSpace()');

        this.setHeaders();

        let body = {
            item: item
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_updateCellarSpace, body, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
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
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    public GetCellarSenzors(path: string): Observable<CellarDTO> {
        console.log('IoTHubService GetCellarSenzors()');

        this.setHeaders();

        let body = {
            path: path
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_getCellarSenzors, body, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
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

            return of(res);
        }
        //editing existing senzor   
        else {

            this.setHeaders();

            let body = {
                id: id
            }

            let options = { headers: this.headers };

            return this.http.post(this.url_getCellarSenzor, body, options)
            .pipe(
                map(res => res),
                catchError(this.handleError)
            );
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
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    public RemoveCellarSenzor(id: string): Observable<CellarDTO> {
        console.log('IoTHubService RemoveCellarSenzor()');

        this.setHeaders();

        let body = {
            id: id
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_removeCellarSenzor, body, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    public RemoveCellarSenzors(path: string): Observable<CellarDTO> {
        console.log('IoTHubService RemoveCellarSenzor()');

        this.setHeaders();

        let body = {
            path: path
        }

        let options = { headers: this.headers };

        return this.http.post(this.url_removeCellarSenzors, body, options)
        .pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    public UpdateCellarSenzor(item: CellarSenzor): Observable<CellarSenzor> {
        console.log('IoTHubService UpdateCellarSenzor()');

        this.setHeaders();

        let body = {
            item: item
        }
        
        let options = { headers: this.headers };

        return this.http.post(this.url_updateCellarSenzor, body, options)
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

