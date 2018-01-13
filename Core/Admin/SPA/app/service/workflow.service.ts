import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { CellarDTO } from '../entities/http/CellarDTO';

import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';


@Injectable()
export class WorkflowService {
  isProduction = environment.production;
  isHttps = environment.https;

  private serverUrl: string = '';

  private url_processes: string;
  private url_actualDirectory: string;
  private url_getAllCellarWorkflows: string;
  private url_getCellarWorkflows: string;
  private url_CellarWorkflow: string;
  private url_RunCellarWorkflow: string;
  private url_RunAllCellarWorkflows: string;
  private url_StopCellarWorkflow: string;
  private url_StopAllCellarWorkflows: string;
  private url_CheckProcessCellarWorkflow: string;

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    if (this.isProduction == true && this.isHttps == true) {
      this.serverUrl = "https://cellar.hub.workflow:44405";
    }
    else if (this.isProduction == true && this.isHttps == false) {
      this.serverUrl = "http://cellar.hub.workflow:44405";
    }
    else if (this.isProduction == false && this.isHttps == true) {
      this.serverUrl = "https://localhost:44405";
    }
    else if (this.isProduction == false && this.isHttps == false) {
      this.serverUrl = "http://localhost:44405";
    }

    this.url_processes = this.serverUrl + '/api/processes';
    this.url_actualDirectory = this.serverUrl + '/api/actualdirectory';
    this.url_getAllCellarWorkflows = this.serverUrl + '/api/workflows';
    this.url_getCellarWorkflows = this.serverUrl + '/api/workflows';
    this.url_CellarWorkflow = this.serverUrl + '/api/workflow';
    this.url_RunCellarWorkflow = this.serverUrl + '/api/runworkflow';
    this.url_RunAllCellarWorkflows = this.serverUrl + '/api/runallworkflows';
    this.url_StopCellarWorkflow = this.serverUrl + '/api/stopworkflow';
    this.url_StopAllCellarWorkflows = this.serverUrl + '/api/stopallworkflows';
    this.url_CheckProcessCellarWorkflow = this.serverUrl + '/api/checkprocessworkflow';
  }

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
  /*                  WORKFLOW                     */
  /**********************************************/


  public GetAllCellarWorkflows(): Observable<CellarDTO> {
    console.log('WorkflowService GetAllCellarWorkflows()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_getAllCellarWorkflows, options)
      .catch(this.handleError);
  }

  public GetCellarWorkflows(senzorName: string): Observable<CellarDTO> {
    console.log('WorkflowService GetCellarWorkflows()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_getCellarWorkflows + "/" + senzorName, options)
      .catch(this.handleError);
  }

  public GetCellarWorkflow(id: string): Observable<CellarDTO> {
    console.log('WorkflowService GetCellarWorkflow()');

    //new workflow
    if (id == "0") {

      //create a new workflow
      var res = new CellarDTO();
      var aaa = new CellarWorkflow();

      //set workflow state
      aaa.state = "1";

      res.data = aaa;

      return Observable.of(res);
    }
    //get existing workflow   
    else {

      this.setHeaders();
      let options = { headers: this.headers };

      return this.http.get(this.url_CellarWorkflow + "/" + id, options)
        .catch(this.handleError);
    }
  }

  public AddCellarWorkflow(item: CellarWorkflow): Observable<CellarDTO> {
    console.log('WorkflowService AddCellarWorkflow()');


    //remove 0 id
    item.id = "";

    //create a DTO
    var res = new CellarDTO();
    res.data = item;



    this.setHeaders();

    let body = JSON.stringify(res);

    let options = { headers: this.headers };

    return this.http.put(this.url_CellarWorkflow, body, options)
      .catch(this.handleError);
  }

  public UpdateCellarWorkflow(item: CellarWorkflow): Observable<CellarDTO> {
    console.log('WorkflowService UpdateCellarWorkflow()');

    this.setHeaders();

    let body = JSON.stringify(item);

    let options = { headers: this.headers };

    return this.http.patch(this.url_CellarWorkflow + "/" + item.id, body, options)
      .catch(this.handleError);
  }

  public RemoveCellarWorkflow(id: string): Observable<CellarDTO> {
    console.log('WorkflowService RemoveCellarWorkflow()');

    this.setHeaders();

    let options = { headers: this.headers };

    return this.http.delete(this.url_CellarWorkflow + "/" + id, options)
      .catch(this.handleError);
  }





  //RUN
  public RunCellarWorkflow(id: string): Observable<CellarDTO> {
    console.log('WorkflowService RunCellarWorkflow()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_RunCellarWorkflow + "/" + id, options)
      .catch(this.handleError);
  }

  //STOP
  public StopCellarWorkflow(id: string): Observable<CellarDTO> {
    console.log('WorkflowService StopCellarWorkflow()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_StopCellarWorkflow + "/" + id, options)
      .catch(this.handleError);
  }

  //CHECK Process 
  public CheckProcessCellarWorkflow(pid: string): Observable<CellarDTO> {
    console.log('WorkflowService CheckProcessCellarWorkflow()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_CheckProcessCellarWorkflow + "/" + pid, options)
      .catch(this.handleError);
  }




  /**********************************************/
  /*            CLI METHODS                     */
  /**********************************************/


  public GetRunningProcesses(): Observable<CellarDTO> {
    console.log('WorkflowService GetRunningProcesses()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_processes, options)
      .catch(this.handleError);
  }

  public RunAllCellarWorkflows(): Observable<CellarDTO> {
    console.log('WorkflowService RunAllWorkflows()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_RunAllCellarWorkflows, options)
      .catch(this.handleError);
  }


  public StopAllCellarWorkflows(): Observable<CellarDTO> {
    console.log('WorkflowService StopAllCellarWorkflows()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_StopAllCellarWorkflows, options)
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
