import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers }       from '@angular/http';
 
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
// import { Person } from '../entities/person';
 
@Injectable()
export class DataService {
 
  constructor(private http: Http) {}
 
  // search(): Observable<Person[]> {

  //   var aaa = this.http
  //              .get(`https://jsonplaceholder.typicode.com/users`)
  //              .map(response => response.json() as Person[]);



  //   return aaa;

  // }

  // sendPerson(): Observable<Response> {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({ headers: headers });

  //       var aaa = this.http
  //                  .post(`https://jsonplaceholder.typicode.com/posts`, `{
  //                   "userId": 1,
  //                   "id": 1,
  //                   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  //                   "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  //                 }`,options)
  //                  .map(response => response.json().data as Response);
    
    


                   
    
  //       return aaa;
    
  //     }
}