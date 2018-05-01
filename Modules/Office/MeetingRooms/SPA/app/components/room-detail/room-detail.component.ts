import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { K2ExchangeGraphqlService } from '../../services/k2exchange-graphql.service';
import { GetInfoInput } from '../../dto/GetInfoInput';
import { MeetingDTO } from '../../dto/MeetingDTO';

import * as moment from 'moment';
import { OfficeGraphqlService } from 'app/services/office-graphql.service';
import { MeetingRoomDTO } from 'app/dto/MeetingRoomDTO';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
import { LoadTimelineBookingsAction, LoadCalendarBookingsAction, SelectMeetingRoomAction, LoadMeetingRoomAction } from 'app/state/actions/application.actions';
import { LoadTimelineBookingsModel, LoadCalendarBookingsModel } from '../../state/models/application.models';

@Component({
  selector: 'app-room',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomComponent implements OnInit {

  selectedMeetingRoom$: Observable<MeetingRoomDTO>;

  constructor(private store: Store<ApplicationState>,
    private router: Router,
    private route: ActivatedRoute) {

    this.selectedMeetingRoom$ = this.store.select(store => store.uiState.selectedMeetingRoom);
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new LoadMeetingRoomAction(id));


    this.selectedMeetingRoom$
                  .subscribe((value: MeetingRoomDTO) => {

                    //console.log(value);

                    if (value != null) {

                      let start = moment().hours(0).minutes(0).seconds(0);
                      let end = moment().hours(0).minutes(0).seconds(0).add(1, 'days');

                      // console.log("this.store.dispatch(new LoadTimelineBookingsAction");
                      // console.log(value.email);
                      // console.log(start);
                      // console.log(end);
                      let vm = new LoadTimelineBookingsModel();
                      vm.email = value.email;
                      vm.start = start;
                      vm.end = end;
                      this.store.dispatch(new LoadTimelineBookingsAction(vm));

                      let start1 = moment().hours(0).minutes(0).seconds(0);
                      let end1 = moment().hours(0).minutes(0).seconds(0).add(1, 'days');

                      // console.log("this.store.dispatch(new LoadCalendarBookingsAction");
                      // console.log(value.email);
                      // console.log(start1);
                      // console.log(end1);
                      let vm2 = new LoadCalendarBookingsModel();
                      vm2.email = value.email;
                      vm2.start = start1;
                      vm2.end = end1;
                      this.store.dispatch(new LoadCalendarBookingsAction(vm2));

                    }

    });

    //this.router.navigate(['./home']);

    // console.log("ngOnInit");
    // let id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    // //moment.locale('cs');

    // //--------------------------------------------------
    // // GET Selected Meeting Room
    // //--------------------------------------------------
    // this.officeService.getMeetingRoomModel(id)
    //   .flatMap((values: MeetingRoomDTO[]) => {
    //     console.log("flatMap1");
    //     //Convert BSON ID to string
    //     let result = new Array<MeetingRoomDTO>();
    //     for (let index = 0; index < values.length; index++) {
    //       const item = values[index];
    //       let aaa = new MeetingRoomDTO().New(item);
    //       result.push(aaa);
    //     }
    //     console.log(result[0]);
    //     this.sharedService.selectedRoomStore.next(result[0]);
    //     // this.sharedService.selectedRoom$ = Observable.of(result[0]);
    //     return Observable.of(result[0]);
    //   })
    //   .flatMap((value: MeetingRoomDTO) => {
    //     console.log("flatMap2");
    //     //--------------------------------------------------
    //     // GET Actual meetings for this day for this Meeting Room
    //     //--------------------------------------------------

    //     let asdf = new GetInfoInput();
    //     asdf.attendeeMails.push(value.email);
    //     asdf.start = moment().format('YYYY-MM-DDTHH:mm:ss');
    //     asdf.end = moment().add(1, 'days').format('YYYY-MM-DDTHH:mm:ss');
    //     asdf.goodSuggestionThreshold = 49;
    //     asdf.maximumNonWorkHoursSuggestionsPerDay = 0;
    //     asdf.maximumSuggestionsPerDay = 48;
    //     asdf.meetingDuration = 60;
    //     asdf.minimumSuggestionQuality = 0;
    //     asdf.requestedFreeBusyView = 4;

    //     this.k2exchangeService.getInfo(asdf).subscribe((value) => {

    //       console.log(value);

    //       let items = <Array<MeetingDTO>>value;

    //       this.sharedService.actualMeetingsStore.next(items);
    //       //this.sharedService.actualMeetings$ = Observable.of(items);

    //       for (const item of items) {
    //         console.log('-------------------');
    //         console.log(item.status);
    //         console.log(item.subject);
    //         console.log(item.location);
    //         console.log(item.start);
    //         console.log(item.end);
    //         console.log('-------------------');
    //       }
    //     });











    //     return Observable.of(true);
    //   })
    //   .map(value => {
    //     console.log(value);
    //   }).subscribe();

    //let selected = this.sharedService.selectedRoom;



  }
}



function mapMeetingRoomFromState(state: ApplicationState): MeetingRoomDTO{
  if (state.uiState == undefined) {
      return undefined;
  }

  return state.uiState.selectedMeetingRoom;
} 