import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent} from "@angular/material";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { CreateMeetingVM } from '../../../../models/CreateMeetingVM';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
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
  private inputStartTime = moment();
  private startTime = {hour: "", minute: "", meriden: 'PM', format: 24};
  private inputEndTime = moment();
  private endTime = {hour: "", minute: "", meriden: 'PM', format: 24};
  

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<AddMeetingDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: CreateMeetingVM ) {

        console.log(data.start);
        console.log(data.end);

        this.inputStartTime = moment(data.start, "YYYY-MM-DDTHH:mm:ss");
        this.inputEndTime = moment(data.end, "YYYY-MM-DDTHH:mm:ss");

        console.log(this.inputStartTime);
        console.log(this.inputEndTime);


        console.log(this.startTime);
        console.log(this.endTime);

        this.startTime = {hour: this.inputStartTime.format("HH"), minute: this.inputStartTime.format("m"), meriden: 'PM', format: 24};
        this.endTime = {hour: this.inputEndTime.format("HH"), minute: this.inputEndTime.format("m"), meriden: 'PM', format: 24};

        console.log(this.startTime);
        console.log(this.endTime);
      // let attendees = new Array<{}>();

      // for (const item of data.attendeeMails) {
      //   attendees.push({ name: item });
      // }

      console.log(data.attendeeMails);

      //this.tempAttendees = data.attendeeMails;

      this.form = fb.group({
          attendeeMails: new FormArray([]),
          location: [data.location, Validators.required],
          // start: this.startTime,
          // end: this.endTime,
          subject: [data.subject, Validators.required],
          text: [data.text, Validators.required]
      });

      var people = this.form.get('attendeeMails') as FormArray;
      console.log(people);

      for (const item of data.attendeeMails) {
        people.push(fb.control(item));
      }

      console.log(people);
  }

  ngOnInit() {
    console.log(this.form.get('attendeeMails').value);
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
    let aaa = this.form.value;
    let form = this.form.value;
    let result = new CreateMeetingVM();

    result.attendeeMails = form.attendeeMails;
    result.location = form.location;


    //repair format of HOUR (H -> HH) and MINUTE (m -> mm)
    if(this.startTime.hour.toString().length == 1){
      this.startTime.hour = "0" + this.startTime.hour;
    } 
    if(this.startTime.minute.toString().length == 1){
      this.startTime.minute = "0" + this.startTime.minute;
    } 
    if(this.endTime.hour.toString().length == 1){
      this.endTime.hour = "0" + this.endTime.hour;
    } 
    if(this.endTime.minute.toString().length == 1){
      this.endTime.minute = "0" + this.endTime.minute;
    } 

    // let tempStartDate = moment().format("YYYY-MM-DD");
    let tempStartDate = this.inputStartTime.format("YYYY-MM-DD");
    let tempStartTime = this.startTime.hour + ":" + this.startTime.minute + ":00";
    result.start = tempStartDate + "T" + tempStartTime;
    //let tempEndDate = moment().format("YYYY-MM-DD");
    let tempEndDate = this.inputEndTime.format("YYYY-MM-DD");
    let tempEndTime = this.endTime.hour + ":" + this.endTime.minute + ":00";
    result.end = tempEndDate + "T" + tempEndTime;
    result.subject = form.subject;
    result.text = form.text;
    

    if(this.inputStartTime.date() == 15){
      console.log("----------------------");
      console.log("WARNING - DATE - 15.4.2018");
      console.log("add-meeting-dialog.component")
      console.log("----------------------");
    }
    
      this.dialogRef.close(result);
  }

  close() {
      this.dialogRef.close();
  }

}
