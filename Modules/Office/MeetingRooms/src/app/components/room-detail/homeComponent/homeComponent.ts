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

  state: string= "";
  subject: string = "";
  isLoaded: boolean = false;

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



  loadTimelineBookings(){
    this.bookings$
    .subscribe((values) => {

      if(values == null){
        return
      }

      let isReserved = false;
      for (let meeting of values) {

        let actualTime = moment();
        let start = meeting.start;
        let end = meeting.end;
  
        let isActual = actualTime.isBetween(start,end);
        if(isActual){
          isReserved = true;
          this.subject = meeting.by;
        } 
      }

      if(isReserved){
        this.onReserved()
      } else {
        this.onAvailable();
      }

      this.isLoaded = true;
    });
  }



  onReserved() {
    $("body").css("background-color", "#F44336");
    $('.status').text('Reserved');
    $('.homeBody').css({ 'color': 'white' });
    this.state = "Reserved";
  }

  onAvailable() {
    $("body").css('background-color', "#4CAF50");
    $('.status').text('Available');
    $('.homeBody').css({ 'color': 'white' });
    this.state = "Available";
  }

  onMaintenance() {
    $("body").css('background-color', "#FFEB3B");
    $('.status').text('Maintenance');
    $('.homeBody').css({ 'color': 'black' });
    this.state = "Maintenance";
  }


}
