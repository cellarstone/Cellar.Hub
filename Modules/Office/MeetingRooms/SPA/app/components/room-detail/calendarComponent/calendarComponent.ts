//Angular
import { Component, OnInit, HostBinding } from '@angular/core';
//RxJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
//ngRX
import { Store } from '@ngrx/store';

import * as moment from 'moment';

//Cellarstone
import { CreateMeetingVM } from 'app/models/CreateMeetingVM';
import { DeleteMeetingVM } from 'app/models/DeleteMeetingVM';
import { BookingVM } from 'app/models/BookingVM';
import { CreateMeetingInput } from 'app/dto/CreateMeetingInput';
import { DeleteMeetingInput } from 'app/dto/DeleteMeetingInput';
import { MeetingRoomDTO } from 'app/dto/MeetingRoomDTO';

//Cellarstone state
import { CreateMeetingAction, DeleteMeetingAction, LoadCalendarBookingsAction, SetCreateMeetingStatusAction } from '../../../state/actions/application.actions';
import { ApplicationState } from 'app/state/state/application.state';
import { LoadCalendarBookingsModel } from 'app/state/models/application.models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MeetingStatusVM } from 'app/components/room-detail/calendarComponent/meeting-status-dialog/MeetingStatusVM';
import { MeetingStatusDialogComponent } from './meeting-status-dialog/meeting-status-dialog.component';


@Component({
  selector: 'calendar-component',
  templateUrl: './calendarComponent.html',
  styleUrls: ['./calendarComponent.scss']
})
export class CalendarComponent implements OnInit {

  meetingRoom$: Observable<MeetingRoomDTO>;
  bookings$: Observable<BookingVM[]>;
  createMeetingRoomStatus$: Observable<string>;

  selectedDate: moment.Moment;

  rebuildCalendar: Observable<number>;

  constructor(private store: Store<ApplicationState>,
    private dialog: MatDialog) {
    this.meetingRoom$ = this.store.select(state => state.uiState.selectedMeetingRoom);
    this.bookings$ = this.store.select(state => state.storeData.calendarBookings);
    this.createMeetingRoomStatus$ = this.store.select(state => state.uiState.createOrDeleteMeetingStatus);
  }

  ngOnInit() {
    this.selectedDate = moment().hour(0).minute(0).second(0).millisecond(0);
  }


  //--------------------------------------
  // BOOKING
  //--------------------------------------

  createMeeting(meeting: CreateMeetingVM) {

    console.log(meeting);

    //convert from VM to Input
    let result = new CreateMeetingInput();
    result.attendeeMails = meeting.attendeeMails;
    result.location = meeting.location;
    result.subject = meeting.subject;
    result.text = meeting.text;
    result.start = meeting.start.format();
    result.end = meeting.end.format();

    console.log(result);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '500px';

    let vm = new MeetingStatusVM();
    vm.status = this.store.select(store => store.uiState.createOrDeleteMeetingStatus);

    dialogConfig.data = vm;
    const dialogRef = this.dialog.open(MeetingStatusDialogComponent,
      dialogConfig);

    //!!!!!!!!!!!!!
    //Zkontroluj atendees mail !!!!!
    this.store.dispatch(new SetCreateMeetingStatusAction("Creating..."));
    this.store.dispatch(new CreateMeetingAction(result));
    //!!!!!!!!!!!!!

    dialogRef.afterClosed()
      .subscribe(value => {
        console.log(value);
      });

  }



  deleteMeeting(meeting: DeleteMeetingVM) {

    console.log(meeting);

    //convert from VM to Input
    let result = new DeleteMeetingInput();
    result.meetingRoomMail = meeting.meetingRoomMail;
    result.subject = meeting.subject;
    result.start = meeting.start.format();
    result.end = meeting.end.format();

    console.log(result);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '500px';

    let vm = new MeetingStatusVM();
    vm.status = this.store.select(store => store.uiState.createOrDeleteMeetingStatus);

    dialogConfig.data = vm;
    const dialogRef = this.dialog.open(MeetingStatusDialogComponent,
      dialogConfig);

    this.store.dispatch(new SetCreateMeetingStatusAction("Deleting..."));
    this.store.dispatch(new DeleteMeetingAction(result));

    dialogRef.afterClosed()
      .subscribe(value => {
        console.log(value);
      });
  }


  //--------------------------------------
  // CALENDAR
  //--------------------------------------

  // On click, display the selected day.
  selectDate(date: moment.Moment) {
    //console.log(date);

    this.selectedDate = moment(date);

    let mail = "";

    this.meetingRoom$.subscribe(value => {
      mail = value.email;
    })

    let start1 = moment(date);
    let end1 = moment(date).add(1, 'days');
    let vm = new LoadCalendarBookingsModel();
    vm.email = mail;
    vm.start = start1;
    vm.end = end1;

    //console.log(vm);
    this.store.dispatch(new LoadCalendarBookingsAction(vm));

  }



  // compare(a, b) {

  //   var startTime = moment(a, "HH:mm");
  //   var endTime = moment(b, "HH:mm");


  //   if (startTime.isBefore(endTime))
  //     return -1;
  //   if (startTime.isAfter(endTime))
  //     return 1;
  //   return 0;
  // }

}



