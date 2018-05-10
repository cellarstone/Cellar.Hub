import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MeetingStatusVM } from './MeetingStatusVM';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-meeting-status-dialog',
  templateUrl: './meeting-status-dialog.component.html',
  styleUrls: ['./meeting-status-dialog.component.scss']
})
export class MeetingStatusDialogComponent implements OnInit, OnDestroy {

  inputData: MeetingStatusVM;
  countdown: Observable<number>;

  private unsubscribe$ = new Subject();

  constructor(
    private dialogRef: MatDialogRef<MeetingStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: MeetingStatusVM) {
    this.inputData = data;
  }

  ngOnInit() {
    this.inputData.status
    .takeUntil(this.unsubscribe$)
    .subscribe(value => {
      if(value == "Testing..."){
        let count = 6;
        this.countdown = timer(0,1000).pipe(
                take(count),
                map(()=> --count)
            );
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  close() {
    this.dialogRef.close();
  }
  
}
