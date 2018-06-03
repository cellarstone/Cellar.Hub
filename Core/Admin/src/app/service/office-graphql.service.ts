import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CellarMeetingRoom } from '../entities/CellarMeetingRoom';

//QUERIES object ----------------------------------

export type Query = {
  cellarmeetingroom: CellarMeetingRoom[];
}


//SERVICE ------------------------------------------

@Injectable()
export class OfficeGraphqlService {


  constructor(private apollo: Apollo) { }

  readonly serviceGraphqlName = 'office';


  //-----------------------------------------
  // --------------- QUERIES ----------------
  //-----------------------------------------

  getMeetingRoom(id: String): Observable<CellarMeetingRoom[]> {
    return this.apollo.use(this.serviceGraphqlName).watchQuery<Query>({
      query: gql`
        query GetMeetingRoom($id: String) {
          cellarmeetingroom(id: $id){
            id,
            email
          }
        }
      `,
      variables: {
        id: id,
      },
      fetchPolicy: 'network-only'
    })
      .valueChanges
      .pipe(
        map(({ data }) => {
          let result = <CellarMeetingRoom[]>data.cellarmeetingroom;
          return result;
        }),
        catchError(data => {
          console.log(data);
          let aa = new CellarMeetingRoom();
          let bb = new Array<CellarMeetingRoom>();
          bb.push(aa);
          return of(bb);
        })
      );
  }

  //-----------------------------------------
  // ------------- MUTATIONS ----------------
  //-----------------------------------------


  addMeetingRoom(item: CellarMeetingRoom) {
    return this.apollo.use(this.serviceGraphqlName).mutate({
      mutation: gql`
      mutation CreateMeetingRoom($id: String!, 
                                $email: String!) {
                        createCellarMeetingRoom(id: $id, 
                                                email: $email) {
                                      id
                                      email
                        }
      }
    `,
      variables: {
        id: item.id,
        email: item.email
      }
    })
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }


  deleteMeetingRoom(id: string) {
    return this.apollo.use(this.serviceGraphqlName).mutate({
      mutation: gql`
      mutation DeleteMeetingRoom($id: String!) {
        deleteCellarMeetingRoom(id: $id)
      }
    `,
      variables: {
        id: id
      }
    })
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updateMeetingRoom(item: CellarMeetingRoom) {
    return this.apollo.use(this.serviceGraphqlName).mutate({
      mutation: gql`
      mutation UpdateMeetingRoom($id: String!, 
                                $email: String!) {
          updateCellarMeetingRoom(id: $id,
                                 email: $email) {
                        id
                        email
          }
        }
    `,
      variables: {
        id: item.id,
        email: item.email
      }
    })
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

  public getId(objectid: string): string {
    let asdf = objectid.replace("ObjectIdHex(\"","").replace("\")","");
    console.log("asdf");
    console.log(asdf);
    return asdf;
  }
}
