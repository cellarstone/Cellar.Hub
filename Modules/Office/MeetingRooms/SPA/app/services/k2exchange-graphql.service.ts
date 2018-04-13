import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MeetingVM } from '../models/MeetingVM';
import { GetInfoVM } from '../models/GetInfoVM';
import { CreateMeetingVM } from '../models/CreateMeetingVM';
import { DeleteMeetingVM } from '../models/DeleteMeetingVM';

//QUERIES object ----------------------------------

export type Query = {
  info: MeetingVM[];
}


//SERVICE ------------------------------------------

@Injectable()
export class K2ExchangeGraphqlService {


  constructor(private apollo: Apollo) { }

  readonly serviceGraphqlName = 'k2exchange';


  //-----------------------------------------
  // --------------- QUERIES ----------------
  //-----------------------------------------

  getInfo(input: GetInfoVM): Observable<MeetingVM[]> {
    return this.apollo.use(this.serviceGraphqlName).watchQuery<Query>({
      query: gql`
      query GetInfoMethod($in: GetInfoInput!) {
        info(input: $in){
           status,
          subject,
          location,
          start,
          end
        }
      }
      `,
      variables: {
        in: {
          attendeeMails: input.attendeeMails,
          start: input.start,
          end: input.end,
          goodSuggestionThreshold: input.goodSuggestionThreshold,
          maximumNonWorkHoursSuggestionsPerDay: input.maximumNonWorkHoursSuggestionsPerDay,
          maximumSuggestionsPerDay: input.maximumSuggestionsPerDay,
          meetingDuration: input.meetingDuration,
          minimumSuggestionQuality: input.minimumSuggestionQuality,
          requestedFreeBusyView: input.requestedFreeBusyView
        },
      },
      fetchPolicy: 'network-only'
    })
      .valueChanges
      .map(({ data }) => {
          console.log(data);
          let result = <MeetingVM[]>data.info;
          return result;
      })
      .catch(data => {
        console.log(data);
        let aa = new MeetingVM();
        let bb = new Array<MeetingVM>();
        bb.push(aa);
        return Observable.of(bb);
      });
  }

  //-----------------------------------------
  // ------------- MUTATIONS ----------------
  //-----------------------------------------


  createMeeting(item: CreateMeetingVM) {
    return this.apollo.use(this.serviceGraphqlName).mutate({
      mutation: gql`
      mutation CreateMeetingMethod($in: CreateMeetingInput!) {
        createMeeting(input: $in)
      }
    `,
      variables: {
        in: {
          attendeeMails: item.attendeeMails,
          start: item.start,
          end: item.end,
          location: item.location,
          subject: item.subject,
          text: item.text
        }
      }
    })
  }

  deleteMeeting(item: DeleteMeetingVM) {
    return this.apollo.use(this.serviceGraphqlName).mutate({
      mutation: gql`
      mutation DeleteMeetingMethod($in: DeleteMeetingInput!) {
        deleteMeeting(input: $in)
      }
    `,
      variables: {
        in: {
          meetingRoomMail: item.meetingRoomMail,
          subject: item.subject,
          start: item.start,
          end: item.end
        }
      }
    })
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
