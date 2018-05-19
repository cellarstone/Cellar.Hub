import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { OfficeGraphqlService } from 'app/service/office-graphql.service';
import { LOAD_ALL_CELLAR_MEETING_ROOMS, LoadAllCellarMeetingRoomsSuccessAction, LOAD_CELLAR_MEETING_ROOM, LoadCellarMeetingRoomSuccessAction, SAVE_CELLAR_MEETING_ROOM, SaveCellarMeetingRoomSuccessAction, DELETE_CELLAR_MEETING_ROOM, DeleteCellarMeetingRoomSuccessAction } from '../actions/office.actions';
import { CellarMeetingRoom } from '../../entities/CellarMeetingRoom';

@Injectable()
export class OfficeEffects {

  constructor(private actions$: Actions, 
              private officeservice: OfficeGraphqlService) { }

  @Effect() loadAllMeetingRoomsEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_ALL_CELLAR_MEETING_ROOMS)
    .switchMap(() => this.officeservice.getMeetingRoom(""))
    .map(items => {
        console.log("ASDFASDF");
        console.log(items);
        return new LoadAllCellarMeetingRoomsSuccessAction(<CellarMeetingRoom[]>items)
    });

  @Effect() loadMeetingRoomEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_CELLAR_MEETING_ROOM)
    .map(toPayload)
    .switchMap((payload) => {
        console.log("ASDFASDF22221");
        console.log(payload);
        return this.officeservice.getMeetingRoom(payload);
    })
    .map(items => {
        console.log("ASDFASDF22222");
        console.log(items);
        //Convert BSON ID to string
        let result = new Array<CellarMeetingRoom>();
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            let aaa = new CellarMeetingRoom().New(item);
            result.push(aaa);
        }
       return new LoadCellarMeetingRoomSuccessAction(<CellarMeetingRoom>result[0])
    });

  @Effect() saveMeetingRoomEffect$: Observable<Action> = this.actions$
    .ofType(SAVE_CELLAR_MEETING_ROOM)
    .map(toPayload)
    .switchMap((payload) => {

      //SAVE INTO DB
      let item = <CellarMeetingRoom>payload;

       return this.officeservice.getMeetingRoom(item.id)
                                .switchMap((value) => {

                                    if(value.length > 0 && value[0].id != ""){
                                        return this.officeservice.updateMeetingRoom(item);
                                    }
                                    else
                                    {
                                        return this.officeservice.addMeetingRoom(item);
                                    }
                                    
                                });

    })
    .map(item => {
      let temp = <CellarMeetingRoom>item;

      return new SaveCellarMeetingRoomSuccessAction(temp)
    });

  @Effect() deleteMeetingRoomEffect$: Observable<Action> = this.actions$
    .ofType(DELETE_CELLAR_MEETING_ROOM)
    .map(toPayload)
    .switchMap((payload) => {
      let item = <string>payload;
      return this.officeservice.deleteMeetingRoom(item);
    })
    .map(item => {
        return new DeleteCellarMeetingRoomSuccessAction()
    });


}
