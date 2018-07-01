import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { homeSlideStateTrigger } from '../../../shared/route-animations';
import { MeetingRoomDTO } from 'app/dto/MeetingRoomDTO';

declare var $: any;
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';

import { BookingVM } from 'app/models/BookingVM';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'home-component',
  templateUrl: './homeComponent.html',
  styleUrls: ['./homeComponent.scss'],
  animations: [
    homeSlideStateTrigger
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  meetingRoom$: Observable<MeetingRoomDTO>;
  bookings$: Observable<BookingVM[]>;

  state = '';
  subject = '';
  isLoaded = false;

  rebuildStatus: Observable<number>;

  private unsubscribe$ = new Subject();

  constructor(private store: Store<ApplicationState>) {
    this.meetingRoom$ = this.store.select(state => state.uiState.selectedMeetingRoom);
    this.bookings$ = this.store.select(state => state.storeData.timelineBookings);
  }

  ngOnInit() {

    this.loadTimelineBookings();

    this.rebuildStatus = Observable.interval(30000);
    this.rebuildStatus
      .takeUntil(this.unsubscribe$)
      .subscribe(i => {
        this.loadTimelineBookings();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }



  loadTimelineBookings() {
    this.bookings$
      .takeUntil(this.unsubscribe$)
      .subscribe((values) => {

        if (values == null) {
          return;
        }

        this.subject = '';

        let isReserved = false;
        for (let meeting of values) {

          const actualTime = moment();
          const start = meeting.start;
          const end = meeting.end;

          const isActual = actualTime.isBetween(start, end);
          if (isActual) {
            isReserved = true;
            this.subject = meeting.subject;
          }
        }

        if (isReserved) {
          this.onReserved();
        } else {
          this.onAvailable();
        }

        this.isLoaded = true;
      });
  }

  onReserved() {
    this.state = 'Reserved';
    $('body').addClass(this.state.toLowerCase());
  }

  onAvailable() {
    this.state = 'Available';
    $('body').addClass(this.state.toLowerCase());
  }

  onMaintenance() {
    this.state = 'Maintenance';
    $('body').addClass(this.state.toLowerCase());
  }
}
