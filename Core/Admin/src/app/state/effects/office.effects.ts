import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import { OfficeGraphqlService } from 'app/service/office-graphql.service';
import { LOAD_ALL_CELLAR_MEETING_ROOMS, LoadAllCellarMeetingRoomsSuccessAction, LOAD_CELLAR_MEETING_ROOM, LoadCellarMeetingRoomSuccessAction, SAVE_CELLAR_MEETING_ROOM, SaveCellarMeetingRoomSuccessAction, DELETE_CELLAR_MEETING_ROOM, DeleteCellarMeetingRoomSuccessAction, LoadCellarMeetingRoomAction, SaveCellarMeetingRoomAction, DeleteCellarMeetingRoomAction } from '../actions/office.actions';
import { CellarMeetingRoom } from '../../entities/CellarMeetingRoom';
import { Effect, Actions, ofType } from '@ngrx/effects';

@Injectable()
export class OfficeEffects {

  constructor(private actions$: Actions, 
              private officeservice: OfficeGraphqlService) { }

  @Effect() 
  loadAllMeetingRoomsEffect$ = this.actions$.pipe(
    ofType(LOAD_ALL_CELLAR_MEETING_ROOMS),
    switchMap(() => this.officeservice.getMeetingRoom("")),
    map(items => new LoadAllCellarMeetingRoomsSuccessAction(<CellarMeetingRoom[]>items))
  );
    
  @Effect() 
  loadMeetingRoomEffect$ = this.actions$.pipe(
    ofType(LOAD_CELLAR_MEETING_ROOM),
    map((action: LoadCellarMeetingRoomAction) => action.payload),
    switchMap((payload) => {
        return this.officeservice.getMeetingRoom(payload);
    }),
    map(items => {
        //Convert BSON ID to string
        let result = new Array<CellarMeetingRoom>();
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            let aaa = new CellarMeetingRoom().New(item);
            result.push(aaa);
        }
       return new LoadCellarMeetingRoomSuccessAction(<CellarMeetingRoom>result[0])
    })
  );

  @Effect() saveMeetingRoomEffect$ = this.actions$.pipe(
    ofType(SAVE_CELLAR_MEETING_ROOM),
    map((action: SaveCellarMeetingRoomAction) => action.payload),
    switchMap((payload) => {

        //SAVE INTO DB
        let item = <CellarMeetingRoom>payload;
  
         return this.officeservice.getMeetingRoom(item.id).pipe(
            switchMap((value) => {
  
                if(value.length > 0 && value[0].id != ""){
                    return this.officeservice.updateMeetingRoom(item);
                }
                else
                {
                    return this.officeservice.addMeetingRoom(item);
                }
                
            })
         );
  
      }),
      map(item => {
        let temp = <CellarMeetingRoom>item;
  
        return new SaveCellarMeetingRoomSuccessAction(temp)
      })
  );
    
  @Effect() deleteMeetingRoomEffect$ = this.actions$.pipe(
    ofType(DELETE_CELLAR_MEETING_ROOM),
    map((action: DeleteCellarMeetingRoomAction) => action.payload),
    switchMap((payload) => {
        let item = <string>payload;
        return this.officeservice.deleteMeetingRoom(item);
    }),
    map(item => {
        return new DeleteCellarMeetingRoomSuccessAction()
    })
  );

}
