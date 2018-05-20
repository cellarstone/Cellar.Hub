import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { CellarDTO } from '../entities/http/CellarDTO';

import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';


@Injectable()
export class WorkflowService {
  private serverUrl: string = environment.workflowUrl;

  private url_getAllCellarWorkflows = this.serverUrl + '/engine/workflows';
  private url_RunAllCellarWorkflows = this.serverUrl + '/engine/workflows/run';
  private url_CheckAllCellarWorkflows = this.serverUrl + '/engine/workflows/check';
  private url_StopAllCellarWorkflows = this.serverUrl + '/engine/workflows/stop';

  private url_GetCellarWorkflows= this.serverUrl + '/engine/workflows/{senzorname}';
  private url_DeleteCellarWorkflows= this.serverUrl + '/engine/workflows/{senzorname}';
  private url_RunCellarWorkflows= this.serverUrl + '/engine/workflows/{senzorname}/run';
  private url_CheckCellarWorkflows = this.serverUrl + '/engine/workflows/{senzorname}/check';
  private url_StopCellarWorkflows= this.serverUrl + '/engine/workflows/{senzorname}/stop';

  private url_CellarWorkflow= this.serverUrl + '/engine/workflow';
  private url_RunCellarWorkflow = this.serverUrl + '/engine/workflow/{id}/run';
  private url_CheckCellarWorkflow= this.serverUrl + '/engine/workflow/{id}/check';
  private url_StopCellarWorkflow= this.serverUrl + '/engine/workflow/{id}/stop';
  
  private url_CreateAndRunDefaultSenzorWorkflows= this.serverUrl + '/engine/senzor/{id}/createandrundefault';
  private url_StopAndDeleteDefaultSenzorWorkflows= this.serverUrl + '/engine/senzor/{id}/stopanddeletedefault';

  // private url_processes: string;
  // private url_actualDirectory: string;
  
  
  
  
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
  /*                  WORKFLOW                     */
  /**********************************************/


  public GetAllCellarWorkflows(): Observable<CellarDTO> {
    console.log('WorkflowService GetAllCellarWorkflows()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_getAllCellarWorkflows, options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }

  public GetCellarWorkflows(senzorName: string): Observable<CellarDTO> {
    console.log('WorkflowService GetCellarWorkflows()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_GetCellarWorkflows.replace("{senzorname}", senzorName), options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }


  public DeleteCellarWorkflows(senzorName: string): Observable<CellarDTO> {
    console.log('WorkflowService DeleteCellarWorkflows()');

    this.setHeaders();

    let options = { headers: this.headers };

    return this.http.delete(this.url_GetCellarWorkflows.replace("{senzorname}", senzorName), options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }


  public RunCellarWorkflows(senzorName: string): Observable<CellarDTO> {
    console.log('WorkflowService RunCellarWorkflows()');

    this.setHeaders();

    let options = { headers: this.headers };

    return this.http.get(this.url_RunCellarWorkflows.replace("{senzorname}", senzorName), options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }


  public CheckCellarWorkflows(senzorName: string): Observable<CellarDTO> {
    console.log('WorkflowService CheckCellarWorkflows()');

    this.setHeaders();

    let options = { headers: this.headers };

    return this.http.get(this.url_CheckCellarWorkflows.replace("{senzorname}", senzorName), options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }


  public StopCellarWorkflows(senzorName: string): Observable<CellarDTO> {
    console.log('WorkflowService StopCellarWorkflows()');

    this.setHeaders();

    let options = { headers: this.headers };

    return this.http.get(this.url_StopCellarWorkflows.replace("{senzorname}", senzorName), options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }


  public GetCellarWorkflow(id: string): Observable<CellarDTO> {
    console.log('WorkflowService GetCellarWorkflow()');

    //new workflow
    if (id == "0") {

      //create a new workflow
      var res = new CellarDTO();
      var aaa = new CellarWorkflow();

      //set workflow state
      //aaa.state = "1";

      res.data = aaa;

      console.log(res)
      console.log(res.data)

      return of(res);
    }
    //get existing workflow   
    else {

      this.setHeaders();
      let options = { headers: this.headers };

      return this.http.get(this.url_CellarWorkflow + "/" + id, options)
        .pipe(
          switchMap((value)=> {

            console.log(value)
  
            return of(value)
  
          }),
          map(res => res),
          catchError(this.handleError)
      );
    }
  }

  public AddCellarWorkflow(item: CellarWorkflow): Observable<CellarDTO> {
    console.log('WorkflowService AddCellarWorkflow()');


    //remove 0 id
    item.id = "";

    //create a DTO
    // var res = new CellarDTO();
    // res.data = item;

    console.log(item)

    this.setHeaders();

    let body = JSON.stringify(item);

    let options = { headers: this.headers };

    console.log(item)
    console.log(body)

    return this.http.put(this.url_CellarWorkflow, body, options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }

  public UpdateCellarWorkflow(item: CellarWorkflow): Observable<CellarDTO> {
    console.log('WorkflowService UpdateCellarWorkflow()');

    this.setHeaders();

    //create a DTO
    var res = new CellarDTO();
    res.data = item;
    let body = JSON.stringify(res);

    let options = { headers: this.headers };

    return this.http.patch(this.url_CellarWorkflow + "/" + item.id, body, options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }

  public RemoveCellarWorkflow(id: string): Observable<CellarDTO> {
    console.log('WorkflowService RemoveCellarWorkflow()');

    this.setHeaders();

    let options = { headers: this.headers };

    return this.http.delete(this.url_CellarWorkflow + "/" + id, options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }





  //RUN
  public RunCellarWorkflow(id: string): Observable<CellarDTO> {
    console.log('WorkflowService RunCellarWorkflow()');

    this.setHeaders();
    let options = { headers: this.headers };

    let realAddress = this.url_RunCellarWorkflow.replace("{id}", id)

    return this.http.get(realAddress, options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }

  //STOP
  public StopCellarWorkflow(id: string): Observable<CellarDTO> {
    console.log('WorkflowService StopCellarWorkflow()');

    this.setHeaders();
    let options = { headers: this.headers };

    let realAddress = this.url_StopCellarWorkflow.replace("{id}", id)

    return this.http.get(realAddress, options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }

  //CHECK Process 
  public CheckCellarWorkflow(id: string): Observable<CellarDTO> {
    console.log('WorkflowService CheckCellarWorkflow()');

    this.setHeaders();
    let options = { headers: this.headers };

    let realAddress = this.url_CheckCellarWorkflow.replace("{id}", id)

    return this.http.get(realAddress, options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }


  //CREATE AND RUN DEFAULT SENZOR WORKFLOWS
  public CreateAndRunDefaultSenzorWorkflows(senzorid: string): Observable<CellarDTO> {
    console.log('WorkflowService CreateAndRunDefaultSenzorWorkflows()');

    this.setHeaders();
    let options = { headers: this.headers };

    let realAddress = this.url_CreateAndRunDefaultSenzorWorkflows.replace("{id}", senzorid)

    console.log(realAddress);

    return this.http.get(realAddress, options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }


  //STOP AND DELETE DEFAULT SENZOR WORKFLOWS
  public StopAndDeleteDefaultSenzorWorkflows(senzorid: string): Observable<CellarDTO> {
    console.log('WorkflowService StopAndDeleteDefaultSenzorWorkflows()');

    this.setHeaders();
    let options = { headers: this.headers };

    let realAddress = this.url_StopAndDeleteDefaultSenzorWorkflows.replace("{id}", senzorid)

    console.log(realAddress);

    return this.http.get(realAddress, options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }




  /**********************************************/
  /*            CLI METHODS                     */
  /**********************************************/


  // public GetRunningProcesses(): Observable<CellarDTO> {
  //   console.log('WorkflowService GetRunningProcesses()');

  //   this.setHeaders();
  //   let options = { headers: this.headers };

  //   return this.http.get(this.url_processes, options)
  //     .catch(this.handleError);
  // }

  public RunAllCellarWorkflows(): Observable<CellarDTO> {
    console.log('WorkflowService RunAllWorkflows()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_RunAllCellarWorkflows, options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }


  public StopAllCellarWorkflows(): Observable<CellarDTO> {
    console.log('WorkflowService StopAllCellarWorkflows()');

    this.setHeaders();
    let options = { headers: this.headers };

    return this.http.get(this.url_StopAllCellarWorkflows, options)
    .pipe(
      map(res => res),
      catchError(this.handleError)
  );
  }

  // public GetActualDirectory(): Observable<CellarDTO> {
  //   console.log('WorkflowService GetActualDirectory()');

  //   this.setHeaders();
  //   let options = { headers: this.headers };

  //   return this.http.get(this.url_actualDirectory, options)
  //     .catch(this.handleError);
  // }





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
