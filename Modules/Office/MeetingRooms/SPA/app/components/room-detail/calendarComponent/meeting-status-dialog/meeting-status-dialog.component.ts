import { Component, OnInit, Inject } from '@angular/core';
import { MeetingStatusVM } from './MeetingStatusVM';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-meeting-status-dialog',
  templateUrl: './meeting-status-dialog.component.html',
  styleUrls: ['./meeting-status-dialog.component.scss']
})
export class MeetingStatusDialogComponent implements OnInit {

  inputData: MeetingStatusVM;
  countdown: Observable<number>;

  constructor(
    private dialogRef: MatDialogRef<MeetingStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: MeetingStatusVM) {
    this.inputData = data;
  }

  ngOnInit() {
    this.inputData.status.subscribe(value => {
      if(value == "Testing..."){
        let count = 6;
        this.countdown = timer(0,1000).pipe(
                take(count),
                map(()=> --count)
            );
      }
    })
  }

  

  close() {
    this.dialogRef.close();
  }
  
}
