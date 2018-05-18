import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { mapTo } from 'rxjs/operators';
import { map, switchMap, delay } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { OfficeGraphqlService } from 'app/services/office-graphql.service';
import { MeetingRoomDTO } from '../../dto/MeetingRoomDTO';
import { BookingVM } from 'app/models/BookingVM';
import { GetInfoInput } from 'app/dto/GetInfoInput';
import { MeetingDTO } from 'app/dto/MeetingDTO';
import { K2ExchangeGraphqlService } from '../../services/k2exchange-graphql.service';
import { CreateMeetingInput } from '../../dto/CreateMeetingInput';
import { DeleteMeetingInput } from '../../dto/DeleteMeetingInput';
import * as moment from 'moment';
import { LoadCalendarBookingsModel, CreateMeetingTestingModel, CreateMeetingTestingSuccessModel, DeleteMeetingTestingModel, DeleteMeetingTestingSuccessModel } from 'app/state/models/application.models';

import { LOAD_ALL_MEETING_ROOMS, 
  LoadAllMeetingRoomsSuccessAction, 
  LOAD_TIMELINE_BOOKINGS, 
  LOAD_CALENDAR_BOOKINGS, 
  LoadTimelineBookingsSuccessAction, 
  LoadCalendarBookingsSuccessAction, 
  CREATE_MEETING, 
  CreateMeetingTestingSuccessAction, 
  CreateMeetingTestingFailureAction, 
  DELETE_MEETING, 
  LOAD_MEETING_ROOM, 
  LoadMeetingRoomSuccessAction, 
  CreateMeetingTestingAction,
  CREATE_MEETING_TESTING,
  SetCreateMeetingStatusAction,
  CREATE_MEETING_TESTING_SUCCESS,
  LoadCalendarBookingsAction,
  DeleteMeetingTestingAction,
  DELETE_MEETING_TESTING,
  DeleteMeetingTestingSuccessAction,
  DeleteMeetingTestingFailureAction,
  DELETE_MEETING_TESTING_SUCCESS,
  SetDeleteMeetingStatusAction} from 'app/state/actions/application.actions';
import { forEachOf } from 'async';

@Injectable()
export class ApplicationEffects {

  constructor(private actions$: Actions,
    private officeservice: OfficeGraphqlService,
    private k2exchangeService: K2ExchangeGraphqlService) { }

  @Effect() loadAllMeetingRoomsEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_ALL_MEETING_ROOMS)
    .switchMap(() => {

      let result = new Array<MeetingRoomDTO>();

      this.officeservice.getMeetingRoomModel("").subscribe((values) => {
        //Convert BSON ID to string
        for (let index = 0; index < values.length; index++) {
          const item = values[index];
          let aaa = new MeetingRoomDTO().New(item);
          result.push(aaa);
        }
      })

      console.log("AAA");
      console.log(result);

      return Observable.of(result);
    })
    .map(items => new LoadAllMeetingRoomsSuccessAction(<MeetingRoomDTO[]>items));

  @Effect() loadMeetingRoomEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_MEETING_ROOM)
    .map(toPayload)
    .switchMap((id: string) => {
      return this.officeservice.getMeetingRoomModel(id)
        .map((values) => {
          let result = new Array<MeetingRoomDTO>();
          //Convert BSON ID to string
          for (let index = 0; index < values.length; index++) {
            const item = values[index];
            let aaa = new MeetingRoomDTO().New(item);
            result.push(aaa);
          }
          return result;
        })
    })
    .map(item => {
      let result = <MeetingRoomDTO[]>item;
      return new LoadMeetingRoomSuccessAction(result[0]);
    });

  @Effect() loadTimelineBookingsEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_TIMELINE_BOOKINGS)
    .map(toPayload)
    .switchMap((payload) => {

      console.log(payload);
      //--------------------------------------------------
      // GET Actual meetings for this day for this Meeting Room
      //--------------------------------------------------

      let asdf = new GetInfoInput();
      asdf.attendeeMails.push(payload.email);
      asdf.start = payload.start.format('YYYY-MM-DDTHH:mm:ss') + "Z"; // ???? right ???
      asdf.end = payload.end.format('YYYY-MM-DDTHH:mm:ss') + "Z"; // ???? right ???
      asdf.goodSuggestionThreshold = 49;
      asdf.maximumNonWorkHoursSuggestionsPerDay = 0;
      asdf.maximumSuggestionsPerDay = 48;
      asdf.meetingDuration = 60;
      asdf.minimumSuggestionQuality = 0;
      asdf.requestedFreeBusyView = 4;

      return this.k2exchangeService.getInfo(asdf);
    })
    .map((meetings: MeetingDTO[]) => {
      console.log(meetings);
      //--------------------------------------------------
      // Transform to BOOKING
      //--------------------------------------------------
      let result: BookingVM[] = [];
      //------------------------------------
      //calculate reserved times
      //------------------------------------
      for (let item of meetings) {
        let temp = new BookingVM();
        temp.status = "reserved";
        temp.start = moment(item.start); // ???? right ???
        temp.end = moment(item.end); // ???? right ???

        // console.log(item);

        // let tempArr = item.subject.split(' ');
        // if (item.subject.includes("KonzoleToExchange")) {
        //   temp.by = tempArr[0];
        // } else {
        //   temp.by = tempArr[0] + " " + tempArr[1];
        // }
        // temp.subject = item.subject.replace(temp.by + " ", '');

        // console.log(temp);

        temp.subject = item.subject;
        temp.by = item.subject;

        result.push(temp);
      }

      //------------------------------------
      //sort result meetings
      //------------------------------------
      result.sort((a, b): number => {
        var startTime = a.start;
        var endTime = b.start;
        if (startTime.isBefore(endTime))
          return -1;
        if (startTime.isAfter(endTime))
          return 1;
        return 0;
      });

      return result;
    })
    .map(items => new LoadTimelineBookingsSuccessAction(<BookingVM[]>items));


  @Effect() loadCalendarBookingsEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_CALENDAR_BOOKINGS)
    .map(toPayload)
    .switchMap((payload: LoadCalendarBookingsModel) => {
      console.log(payload);
      //--------------------------------------------------
      // GET Actual meetings for this day for this Meeting Room
      //--------------------------------------------------

      let asdf = new GetInfoInput();
      asdf.attendeeMails.push(payload.email);
      asdf.start = payload.start.format('YYYY-MM-DDTHH:mm:ss') + "Z"; // ???? right ???
      asdf.end = payload.end.format('YYYY-MM-DDTHH:mm:ss') + "Z"; // ???? right ???
      asdf.goodSuggestionThreshold = 49;
      asdf.maximumNonWorkHoursSuggestionsPerDay = 0;
      asdf.maximumSuggestionsPerDay = 48;
      asdf.meetingDuration = 60;
      asdf.minimumSuggestionQuality = 0;
      asdf.requestedFreeBusyView = 4;

      return this.k2exchangeService.getInfo(asdf).
                    map((values) => {
                      let result = new Array<{}>();
                      result.push(payload);
                      result.push(values);
                      return result;
                    });
    })
    .map((model) => {

      let payload = <LoadCalendarBookingsModel>model[0];
      let meetings = <MeetingDTO[]>model[1];

      
      console.log(meetings);
      let result = new Array<BookingVM>();

      //--------------------------------------------------
      // Transform to BOOKING
      //--------------------------------------------------

      // ALL DAY is FREE
      if (meetings.length == 0) {
        let temp = new BookingVM();
        temp.status = "available";
        temp.start = moment(payload.start).hours(0).minutes(0).seconds(0); // ???
        temp.end = moment(payload.end).add(1, 'days').hours(0).minutes(0).seconds(0); // ???
        temp.by = "Available";
        result.push(temp);
      }


      //------------------------------------
      //calculate reserved times
      //------------------------------------
      for (let item of meetings) {
        let temp = new BookingVM();
        temp.status = "reserved";
        temp.start = moment(item.start); // ???
        temp.end = moment(item.end); // ???

        // console.log(item);

        // let tempArr = item.subject.split(' ');
        // if (item.subject.includes("KonzoleToExchange")) {
        //   temp.by = tempArr[0];
        // } else {
        //   temp.by = tempArr[0] + " " + tempArr[1];
        // }
        // temp.subject = item.subject.replace(temp.by + " ", '');

        temp.subject = item.subject; //is needed ??
        temp.by = item.subject; //is needed ??

        console.log(item.status);

        result.push(temp);
      }

      //------------------------------------
      //calculate available times
      //------------------------------------
      let availableFrom = moment();
      let availableTo = moment();
      for (let index = 0; index < meetings.length; index++) {
        const item = meetings[index];
        //BEGIN
        if (index == 0) {

          //When converting from string (from K2 GraphQL)
          //must be removed 'Z' letter on the end 
          //let startRight = item.start.replace('Z','');

          let end = moment(item.start);
          let start = moment(end).startOf('day');

          let temp = new BookingVM();
          temp.status = "available";
          temp.start = moment(start); 
          temp.end = moment(end); 
          temp.by = "Available";
          // console.log(temp);
          result.push(temp);

          availableFrom = moment(item.end);
        }

        if (index != 0) {

          availableTo = moment(item.start);

          if (availableFrom.format("HH:mm") != availableTo.format("HH:mm")) {
            // Issue #50
            if(availableFrom.isBefore(availableTo)){
              let temp = new BookingVM();
              temp.status = "available";
              temp.start = moment(availableFrom);
              temp.end = moment(availableTo); 
              temp.by = "Available";
              // console.log(temp);
              result.push(temp);
            }
          }

          availableFrom = moment(item.end);
        }

        //END
        if (index == meetings.length - 1) {
          let start = moment(item.end);
          let end = moment(item.end).add(1, 'days').startOf('day');

          let temp = new BookingVM();
          temp.status = "available";
          temp.start = moment(start); 
          temp.end = moment(end); 
          temp.by = "Available";
          // console.log(temp);
          result.push(temp);
        }
      }

      console.log(result);

      //------------------------------------
      //sort result meetings
      //------------------------------------
      result.sort((a, b): number => {
        var startTime = moment(a.start, "HH:mm");
        var endTime = moment(b.start, "HH:mm");
        if (startTime.isBefore(endTime))
          return -1;
        if (startTime.isAfter(endTime))
          return 1;
        return 0;
      });

      // console.log(result);

      return result;
    })
    .map(items => new LoadCalendarBookingsSuccessAction(<BookingVM[]>items));


  // @Effect() save = this.actions$.pipe(
  //     map(action => action.payload),
  //     switchMap(payload => this.myService.save(payload)),
  //     switchMap(res => [
  //         new Notification('save success'),
  //         new SaveSuccess(res)
  //     ])
  //  );

  // @Effect() createMeetingEffect$ = this.actions$
  // .pipe(
  //   map(action => action.payload),
  //   switchMap((payload: CreateMeetingInput) => {
  //     return this.k2exchangeService.createMeeting(payload)
  //                       .pipe(mapTo(payload));
  //   }),
  //   switchMap(item => {
  //     console.log(item);
  //     //First value must be a room address !!!
  //     let roomMailAddress = item.attendeeMails[0];
  //     let vm = new CreateMeetingTestingModel();
  //     vm.email = roomMailAddress;
  //     vm.start = moment(item.start);
  //     vm.end = moment(item.end);
  //     vm.subject = item.subject;

  //     // return Observable.of(new CreateMeetingTestingAction(vm), new SetCreateMeetingStatusAction("Testing..."))
  //     return [
  //       new CreateMeetingTestingAction(vm),
  //       new SetCreateMeetingStatusAction("Testing...")
  //     ]
  //   }));

  @Effect() createMeetingEffect$ = this.actions$
    .ofType(CREATE_MEETING)
    .map(toPayload)
    .switchMap((payload: CreateMeetingInput) => {
      return this.k2exchangeService.createMeeting(payload)
                        .pipe(mapTo(payload));
    })
    .switchMap(item => {
      console.log(item);
      //First value must be a room address !!!
      let roomMailAddress = item.attendeeMails[0];
      let vm = new CreateMeetingTestingModel();
      vm.email = roomMailAddress;
      vm.start = moment(item.start);
      vm.end = moment(item.end);
      vm.subject = item.subject;

      // return Observable.of(new CreateMeetingTestingAction(vm), new SetCreateMeetingStatusAction("Testing..."))
      return [
        new CreateMeetingTestingAction(vm),
        new SetCreateMeetingStatusAction("Testing...")
      ]
    });

  @Effect() createMeetingTestingEffect$ = this.actions$
    .ofType(CREATE_MEETING_TESTING)
    .map(toPayload)
    .switchMap((payload: CreateMeetingTestingModel) => {
      console.log(payload);
      return Observable.of(payload).delay(5000);
    })
    .switchMap((payload: CreateMeetingTestingModel) => {
      console.log(payload);
      //--------------------------------------------------
      // GET Actual meetings for this day for this Meeting Room
      //--------------------------------------------------

      let asdf = new GetInfoInput();
      asdf.attendeeMails.push(payload.email);
      asdf.start = moment(payload.start).startOf('D').format('YYYY-MM-DDTHH:mm:ss') + "Z"; // ???? right ???
      asdf.end = moment(payload.end).add(1, 'days').startOf('D').format('YYYY-MM-DDTHH:mm:ss') + "Z"; // ???? right ???
      asdf.goodSuggestionThreshold = 49;
      asdf.maximumNonWorkHoursSuggestionsPerDay = 0;
      asdf.maximumSuggestionsPerDay = 48;
      asdf.meetingDuration = 60;
      asdf.minimumSuggestionQuality = 0;
      asdf.requestedFreeBusyView = 4;

      console.log(asdf);

      return this.k2exchangeService.getInfo(asdf)
                    .map((values) => {
                      let result = new Array<{}>();
                      result.push(payload);
                      result.push(values);
                      return result;
                    });

    }).map((model) => {
      console.log(model);
      let payload = <CreateMeetingTestingModel>model[0];
      let meetings = <MeetingDTO[]>model[1];
      let createdMeeting: MeetingDTO;
      let isExist = false;
      // console.log(meetings);
      for (const meeting of meetings) {

        // console.log(meeting.subject);
        // console.log(payload.subject);

        if(meeting.subject.includes(payload.subject)){

          let start = moment(meeting.start);
          let end = moment(meeting.end);

          // console.log(start);
          // console.log(payload.start);

          let startSame = payload.start.isSame(start);
          let endSame = payload.end.isSame(end);

          if(startSame && endSame){
            // console.log("isExist");
            isExist = true;
            createdMeeting = meeting;
          }
        }
      }

      if(isExist){

        let vm = new CreateMeetingTestingSuccessModel();
        vm.email = payload.email;
        vm.start = moment(payload.start).startOf('D'); // ???? right ???
        vm.end = moment(payload.end).add(1, 'days').startOf('D'); // ???? right ???

        // console.log(vm);

        return new CreateMeetingTestingSuccessAction(vm); 
      } else {
        return new CreateMeetingTestingFailureAction("I DONT KNOW");
      }
    });

  @Effect() createMeetingTestingSuccessEffect$ = this.actions$
    .ofType(CREATE_MEETING_TESTING_SUCCESS)
    .map(toPayload)
    .switchMap((payload: CreateMeetingTestingSuccessModel) => {

      // console.log(payload);

      let vm = new LoadCalendarBookingsModel();
      vm.email = payload.email;
      vm.start = payload.start;
      vm.end = payload.end;

      return [
        new LoadCalendarBookingsAction(vm),
        new SetCreateMeetingStatusAction("Created")
      ]
    });


    // ------------------------------------------------------------------
    // DELETE 
    // ------------------------------------------------------------------

  @Effect() deleteMeetingEffect$: Observable<Action> = this.actions$
    .ofType(DELETE_MEETING)
    .map(toPayload)
    .switchMap((payload: DeleteMeetingInput) => {
      return this.k2exchangeService.deleteMeeting(payload)
                        .pipe(mapTo(payload));
    })
    .switchMap(item => {
      // console.log(item);

      let roomMailAddress = item.meetingRoomMail;
      let vm = new DeleteMeetingTestingModel();
      vm.email = roomMailAddress;
      vm.start = moment(item.start);
      vm.end = moment(item.end);
      vm.subject = item.subject;

      // return Observable.of(new CreateMeetingTestingAction(vm), new SetCreateMeetingStatusAction("Testing..."))
      return [
        new DeleteMeetingTestingAction(vm),
        new SetDeleteMeetingStatusAction("Testing...")
      ]
    });

    @Effect() deleteMeetingTestingEffect$ = this.actions$
    .ofType(DELETE_MEETING_TESTING)
    .map(toPayload)
    .switchMap((payload: DeleteMeetingTestingModel) => {
      // console.log(payload);
      return Observable.of(payload).delay(5000);
    })
    .switchMap((payload: DeleteMeetingTestingModel) => {
      // console.log(payload);
      //--------------------------------------------------
      // GET Actual meetings for this day for this Meeting Room
      //--------------------------------------------------

      let asdf = new GetInfoInput();
      asdf.attendeeMails.push(payload.email);
      asdf.start = moment(payload.start).startOf('D').format('YYYY-MM-DDTHH:mm:ss') + "Z"; // ???? right ???
      asdf.end = moment(payload.end).add(1, 'days').startOf('D').format('YYYY-MM-DDTHH:mm:ss') + "Z"; // ???? right ???
      asdf.goodSuggestionThreshold = 49;
      asdf.maximumNonWorkHoursSuggestionsPerDay = 0;
      asdf.maximumSuggestionsPerDay = 48;
      asdf.meetingDuration = 60;
      asdf.minimumSuggestionQuality = 0;
      asdf.requestedFreeBusyView = 4;

      // console.log(asdf);

      return this.k2exchangeService.getInfo(asdf)
                    .map((values) => {
                      let result = new Array<{}>();
                      result.push(payload);
                      result.push(values);
                      return result;
                    });

    }).map((model) => {
      // console.log(model);
      let payload = <DeleteMeetingTestingModel>model[0];
      let meetings = <MeetingDTO[]>model[1];
      let createdMeeting: MeetingDTO;
      let isExist = false;
      // console.log(meetings);
      for (const meeting of meetings) {

        // console.log(meeting.subject);
        // console.log(payload.subject);

        if(meeting.subject.includes(payload.subject)){

          let start = moment(meeting.start);
          let end = moment(meeting.end);

          // console.log(start);
          // console.log(payload.start);

          let startSame = payload.start.isSame(start);
          let endSame = payload.end.isSame(end);

          if(startSame && endSame){
            // console.log("isExist");
            isExist = true;
            createdMeeting = meeting;
          }
        }
      }

      //If meeting doesn't exist, it is OK
      if(!isExist){

        let vm = new DeleteMeetingTestingSuccessModel();
        vm.email = payload.email;
        vm.start = moment(payload.start).startOf('D'); // ???? right ???
        vm.end = moment(payload.end).add(1, 'days').startOf('D'); // ???? right ???

        // console.log(vm);

        return new DeleteMeetingTestingSuccessAction(vm); 
      } else {
        return new DeleteMeetingTestingFailureAction("I DONT KNOW");
      }
    });

  @Effect() deleteMeetingTestingSuccessEffect$ = this.actions$
    .ofType(DELETE_MEETING_TESTING_SUCCESS)
    .map(toPayload)
    .switchMap((payload: DeleteMeetingTestingSuccessModel) => {

      // console.log(payload);

      let vm = new LoadCalendarBookingsModel();
      vm.email = payload.email;
      vm.start = payload.start;
      vm.end = payload.end;

      return [
        new LoadCalendarBookingsAction(vm),
        new SetDeleteMeetingStatusAction("Deleted")
      ]
    });
    


}
