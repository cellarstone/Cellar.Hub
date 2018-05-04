import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { homeSlideStateTrigger } from '../../../shared/route-animations';
import { MeetingRoomDTO } from 'app/dto/MeetingRoomDTO';

declare var $: any;
declare var vis: any;
// import * as vis from 'vis';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { BookingVM } from 'app/models/BookingVM';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';

@Component({
  selector: 'home-component',
  templateUrl: './homeComponent.html',
  styleUrls: ['./homeComponent.scss'],
  animations: [
    homeSlideStateTrigger
  ]
})
export class HomeComponent implements OnInit {

  meetingRoom$: Observable<MeetingRoomDTO>;
  bookings$: Observable<BookingVM[]>;

  state: string= "";
  subject: string = "";
  isLoaded: boolean = false;

  rebuildStatus: Observable<number>;

  constructor(private store: Store<ApplicationState>) { 
    this.meetingRoom$ = this.store.select(state => state.uiState.selectedMeetingRoom);
    this.bookings$ = this.store.select(state => state.storeData.timelineBookings);
  }

  ngOnInit() {

    this.loadTimelineBookings();

    this.rebuildStatus = Observable.interval(30000);
    this.rebuildStatus
      .subscribe(i => { 
          this.loadTimelineBookings();
      });
    
  }



  loadTimelineBookings(){
    this.bookings$
    .subscribe((values) => {

      // console.log(values);
      if(values == null){
        return
      }

      let isReserved = false;
      for (let meeting of values) {

        let actualTime = moment();
        let start = meeting.start;
        let end = meeting.end;
  
        
        // console.log(actualTime);
        // console.log(start);
        // console.log(end);
        let isActual = actualTime.isBetween(start,end);
        // console.log(isActual);
        if(isActual){
          // console.log('-------------------');
          // console.log(meeting.status);
          // console.log(meeting.subject);
          // console.log(meeting.location);
          // console.log(meeting.start);
          // console.log(meeting.end);
          // console.log('-------------------');

          isReserved = true;
          this.subject = meeting.by;
          // if (this.item.state == "Reserved") {
            
          // } else if (this.item.state == "Available") {
            
          // } else if (this.item.state == "Maintenance") {
          //   this.onMaintenance();
          // } else {
          //   this.onAvailable();
          // }
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
    // $('.presenter').children('span').text('by');
    // $('.presenter').children('div').text('Jan Novák');
    this.state = "Reserved";
  }

  onAvailable() {
    $("body").css('background-color', "#4CAF50");
    $('.status').text('Available');
    $('.homeBody').css({ 'color': 'white' });
    // $('.presenter').children('span').text('');
    // $('.presenter').children('div').text('');
    this.state = "Available";
  }

  onMaintenance() {
    $("body").css('background-color', "#FFEB3B");
    $('.status').text('Maintenance');
    $('.homeBody').css({ 'color': 'black' });
    // $('.presenter').children('span').text('');
    // $('.presenter').children('div').text('');
    this.state = "Maintenance";
  }


}
