import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MeetingRoomDTO } from 'app/dto/MeetingRoomDTO';

//QUERIES object ----------------------------------

export type Query = {
  meetingroommodel: MeetingRoomDTO[];
}


//SERVICE ------------------------------------------

@Injectable()
export class OfficeGraphqlService {


  constructor(private apollo: Apollo) { }

  readonly serviceGraphqlName = 'office';


  //-----------------------------------------
  // --------------- QUERIES ----------------
  //-----------------------------------------

  getMeetingRoomModel(id: String): Observable<MeetingRoomDTO[]> {
    return this.apollo.use(this.serviceGraphqlName).watchQuery<Query>({
      query: gql`
          query GetMeetingRoomModel($id: String) {
            meetingroommodel(id: $id){
              id,
              name,
              path,
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
          // console.log("GRAPHQL map")
          // console.log(data);
            let result = <MeetingRoomDTO[]>data.meetingroommodel;
            return result;
        }),
        catchError(data => {
          console.log(data);
          let aa = new MeetingRoomDTO();
          let bb = new Array<MeetingRoomDTO>();
          bb.push(aa);
          return of(bb);
        })
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
