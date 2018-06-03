import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { showEditButtonsTrigger } from './booking-section.animation';
import { BookingVM } from 'app/models/BookingVM';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateMeetingInput } from 'app/dto/CreateMeetingInput';
import { AddMeetingDialogComponent } from 'app/components/room-detail/calendarComponent/add-meeting-dialog/add-meeting-dialog.component';
import { CreateMeetingVM } from 'app/models/CreateMeetingVM';
import { DeleteMeetingVM } from 'app/models/DeleteMeetingVM';
import * as moment from 'moment';
import { MeetingStatusVM } from 'app/components/room-detail/calendarComponent/meeting-status-dialog/MeetingStatusVM';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-booking-section',
  templateUrl: './booking-section.component.html',
  styleUrls: ['./booking-section.component.scss'],
  animations: [
    showEditButtonsTrigger
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingSectionComponent implements OnInit, OnDestroy {

  @Input()
  meetingRoomEmail: string;

  @Input()
  selectedDate: moment.Moment;

  @Input()
  bookedMeetings: BookingVM[] = [];

  @Output() onCreateMeeting = new EventEmitter<CreateMeetingVM>();
  @Output() onDeleteMeeting = new EventEmitter<DeleteMeetingVM>();
  
  public showEditButtons: boolean = false;

  actualDateTime = new Date();

  private unsubscribe$ = new Subject();
  
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.bookedMeetings);
    setInterval(() => {
      this.actualDateTime = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createMeeting(meeting: BookingVM){
    // console.log(this.bookedMeetings);
    // console.log(meeting);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '500px';

    let vm = new CreateMeetingVM();
    vm.attendeeMails.push(this.meetingRoomEmail);
    if (this.meetingRoomEmail == "jednacka.butan@alza.cz") {
      vm.location = "Jednačka Butan 10";
    } else if (this.meetingRoomEmail == "jednacka.zero@alza.cz") {
      vm.location = "Jednačka Zero 20 (Projektor)"; //
    } else if (this.meetingRoomEmail == "jednacka.propan@alza.cz") {
      vm.location = "Jednačka Propan 10"; //
    } else if (this.meetingRoomEmail == "jednacka.septima@alza.cz") {
      vm.location = "Jednačka Septima 6"; //
    } else if (this.meetingRoomEmail == "jednacka.k2@alza.cz") {
      vm.location = "Jednačka K2 10 (Projektor) nízké sezení"; //
    }
    vm.start = meeting.start;
    vm.end = meeting.end;

    // console.log(vm);

    dialogConfig.data = vm;

    const dialogRef = this.dialog.open(AddMeetingDialogComponent,
      dialogConfig);


    dialogRef.afterClosed()
    .takeUntil(this.unsubscribe$)
    .subscribe(value => {
      if(value != null){
        let valueObj = <CreateMeetingVM>value;
        console.log(valueObj);
        this.onCreateMeeting.emit(valueObj);
      }
    });
  }

  deleteMeeting(meeting: BookingVM) {

    console.log(meeting);

    let adf = new DeleteMeetingVM();
    adf.meetingRoomMail = this.meetingRoomEmail;
    adf.subject = meeting.subject;
    adf.start = meeting.start;
    adf.end = meeting.end;

    this.onDeleteMeeting.emit(adf);

  }


  onEditButton() {
    this.showEditButtons = !this.showEditButtons;
  }

}
