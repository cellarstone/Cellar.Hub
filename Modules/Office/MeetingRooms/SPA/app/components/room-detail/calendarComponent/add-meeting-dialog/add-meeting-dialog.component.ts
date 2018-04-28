import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from "@angular/material";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { CreateMeetingVM } from '../../../../models/CreateMeetingVM';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Moment } from 'moment';

@Component({
  selector: 'app-add-meeting-dialog',
  templateUrl: './add-meeting-dialog.component.html',
  styleUrls: ['./add-meeting-dialog.component.scss']
})
export class AddMeetingDialogComponent implements OnInit {

  form: FormGroup;

  //chips
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  //tempAttendees: string[];
  private inputStartTime: moment.Moment;
  private startTime = { hour: "", minute: "", meriden: 'PM', format: 24 };
  private inputEndTime: moment.Moment;
  private endTime = { hour: "", minute: "", meriden: 'PM', format: 24 };

  private originalInputData: CreateMeetingVM;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMeetingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: CreateMeetingVM) {

    this.originalInputData = data;

    this.inputStartTime = moment(data.start);
    this.inputEndTime = moment(data.end);

    this.startTime = { hour: this.inputStartTime.format("HH"), minute: this.inputStartTime.format("m"), meriden: 'PM', format: 24 };
    this.endTime = { hour: this.inputEndTime.format("HH"), minute: this.inputEndTime.format("m"), meriden: 'PM', format: 24 };


    this.form = fb.group({
      attendeeMails: new FormArray([]),
      location: [{value: data.location, disabled: true}, Validators.required],
      // location: [data.location, Validators.required],
      subject: [data.subject, Validators.required],
      text: [data.text, Validators.required]
    });

    var people = this.form.get('attendeeMails') as FormArray;
    for (const item of data.attendeeMails) {
      people.push(fb.control(item));
    }
  }

  ngOnInit() {
  }


  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our requirement
    if ((value || '').trim()) {
      const requirements = this.form.get('attendeeMails') as FormArray;
      requirements.push(this.fb.control(value));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(index: number): void {
    const requirements = this.form.get('attendeeMails') as FormArray;

    if (index >= 0) {
      requirements.removeAt(index);
    }
  }


  save() {
    let form = this.form.getRawValue();
    let result = new CreateMeetingVM();

    let attendeeMailsArray = <string[]>form.attendeeMails;
    let originalRoomMail = this.originalInputData.attendeeMails[0];

    //reordering attendees mail array
    //catch situation - somebody delete room mail address
    //catch situation - room mail address must be first !!!
    let resultAttendeesMailArray = new Array<string>();
    resultAttendeesMailArray.push(originalRoomMail);
    for (const item of attendeeMailsArray) {
      if(item != originalRoomMail)
      {
        resultAttendeesMailArray.push(item);
      }
    }

    result.attendeeMails = resultAttendeesMailArray;
    result.location = form.location;


    //repair format of HOUR (H -> HH) and MINUTE (m -> mm)
    if (this.startTime.hour.toString().length == 1) {
      this.startTime.hour = "0" + this.startTime.hour;
    }
    if (this.startTime.minute.toString().length == 1) {
      this.startTime.minute = "0" + this.startTime.minute;
    }
    if (this.endTime.hour.toString().length == 1) {
      this.endTime.hour = "0" + this.endTime.hour;
    }
    if (this.endTime.minute.toString().length == 1) {
      this.endTime.minute = "0" + this.endTime.minute;
    }

    // START -------------
    let hourInt = Number(this.startTime.hour);
    let minuteInt = Number(this.startTime.minute);
    result.start = this.inputStartTime.hour(hourInt).minute(minuteInt);
    // -------------------


    // END ---------------
    let hourInt2 = Number(this.endTime.hour);
    let minuteInt2 = Number(this.endTime.minute);

    //Hack for "available" times ending on next day
    if(!(hourInt2 == 0 && minuteInt2 == 0)){
      if(this.inputEndTime.date() != this.inputStartTime.date()){
        this.inputEndTime.date(this.inputStartTime.date());
      }
    }

    result.end = this.inputEndTime.hour(hourInt2).minute(minuteInt2);
    // ------------------

    result.subject = form.subject;
    result.text = form.text;

    this.dialogRef.close(result);
  }

  close() {
    this.dialogRef.close();
  }

}
