import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  selectedMeetingRoom$: Observable<MeetingRoomDTO>;

  private unsubscribe$ = new Subject();

  constructor(private store: Store<ApplicationState>,
    private router: Router,
    private route: ActivatedRoute) {

    this.selectedMeetingRoom$ = this.store.select(store => store.uiState.selectedMeetingRoom);
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new LoadMeetingRoomAction(id));


    this.selectedMeetingRoom$
      .takeUntil(this.unsubscribe$)
      .subscribe((value: MeetingRoomDTO) => {

        if (value != null) {

          let start = moment().hours(0).minutes(0).seconds(0);
          let end = moment().hours(0).minutes(0).seconds(0).add(1, 'days');

          let vm = new LoadTimelineBookingsModel();
          vm.email = value.email;
          vm.start = start;
          vm.end = end;
          this.store.dispatch(new LoadTimelineBookingsAction(vm));

          let start1 = moment().hours(0).minutes(0).seconds(0);
          let end1 = moment().hours(0).minutes(0).seconds(0).add(1, 'days');

          let vm2 = new LoadCalendarBookingsModel();
          vm2.email = value.email;
          vm2.start = start1;
          vm2.end = end1;
          this.store.dispatch(new LoadCalendarBookingsAction(vm2));

        }

      });

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}



function mapMeetingRoomFromState(state: ApplicationState): MeetingRoomDTO {
  if (state.uiState == undefined) {
    return undefined;
  }

  return state.uiState.selectedMeetingRoom;
} 