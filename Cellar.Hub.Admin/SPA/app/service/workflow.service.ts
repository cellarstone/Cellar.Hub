import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { CellarDTO } from '../entities/http/CellarDTO';

import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable()
export class WorkflowService {
  isProduction = environment.production;
  isHttps = environment.https;

  private serverUrl: string = '';

  private url_processes: string;
  private url_actualDirectory: string;

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    if (this.isProduction == true && this.isHttps == true) {
      this.serverUrl = "https://cellar.hub.workflow:5000";
    }
    else if (this.isProduction == true && this.isHttps == false) {
      this.serverUrl = "http://cellar.hub.workflow:5000";
    }
    else if (this.isProduction == false && this.isHttps == true) {
      this.serverUrl = "https://localhost:5000";
    }
    else if (this.isProduction == false && this.isHttps == false) {
      this.serverUrl = "http://localhost:5000";
    }

    this.url_processes = this.serverUrl + '/api/processes';
    this.url_actualDirectory = this.serverUrl + '/api/actualdirectory';

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
  /*            API METHODS                     */
  /**********************************************/


  public GetRunningProcesses(): Observable<CellarDTO> {
    console.log('WorkflowService GetRunningProcesses()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_processes, options)
      .catch(this.handleError);
  }

  public GetActualDirectory(): Observable<CellarDTO> {
    console.log('WorkflowService GetActualDirectory()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_actualDirectory, options)
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
