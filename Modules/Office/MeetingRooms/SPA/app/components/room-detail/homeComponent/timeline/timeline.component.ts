import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

declare var vis: any;
// import * as vis from 'vis';
import * as moment from 'moment';
import { BookingVM } from 'app/models/BookingVM';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit, OnDestroy {
  
  @Input()
  bookings: BookingVM[] = [];

  timeline: any;
  rebuildTimeline: Observable<number>;

  private unsubscribe$ = new Subject();


  ngOnInit() {
    
    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');

    let dsitems = new Array<{}>(); 
    let count: number = 1;
    for (let ii of this.bookings) {
      let temp = {
        id: count,
        content: ii.by,
        start: ii.start,
        end: ii.end
      }
      dsitems.push(temp);
      count++;
    }

    var items = new vis.DataSet(dsitems);

    // Configuration for the Timeline
    var options = {
      height: '200px',
      // moment: function(date) {
      //   return vis.moment(date).local('cs');
      // },
      showCurrentTime: true,
      // moment: function(date) {
      //   return vis.moment(date).utcOffset('+02:00');
      // }
      start: moment().add(-1,'hours').toDate(),
      end: moment().add(6,'hours').toDate(),
      horizontalScroll: true,
      zoomKey: 'ctrlKey',
      // rollingMode: {
      //   follow: true,
      //   offset: 0.5
      // }
      // min: moment().add(-15,'minutes'),
      // max: moment().add(2,'hours')
      timeAxis: {
        scale: 'hour',
        step: 1
      }

    };

    // Create a Timeline
    this.timeline = new vis.Timeline(container, items, options);
    // timeline.moveTo(moment());
    this.rebuildTimeline = Observable.interval(60000);
    this.rebuildTimeline
      .takeUntil(this.unsubscribe$)
      .subscribe(i => { 
          this.resetTimeline();
      });

  }

  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  resetTimeline(){
    console.log("resetTimeline");
    var options = {
      height: '200px',
      // moment: function(date) {
      //   return vis.moment(date).utc();
      // },
      showCurrentTime: true,
      // moment: function(date) {
      //   return vis.moment(date).utcOffset('+02:00');
      // }
      start: moment().add(-1,'hours').toDate(),
      end: moment().add(6,'hours').toDate(),
      horizontalScroll: true,
      zoomKey: 'ctrlKey',
      // rollingMode: {
      //   follow: true,
      //   offset: 0.5
      // }
      // min: moment().add(-15,'minutes'),
      // max: moment().add(2,'hours')
      timeAxis: {
        scale: 'hour',
        step: 1
      }
    };

    this.timeline.setOptions(options);
  }

}
