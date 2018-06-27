import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

declare var vis: any;
// import * as vis from 'vis';
import * as moment from 'moment';
import { BookingVM } from 'app/models/BookingVM';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit, OnDestroy {

  @Input() bookings: BookingVM[] = [];

  timeline: any;
  rebuildTimeline: Observable<number>;

  private unsubscribe$ = new Subject();
  private options;

  ngOnInit() {

    // DOM element where the Timeline will be attached
    const container = document.getElementById('visualization');

    const dsitems = new Array<{}>();
    let count = 1;
    for (const ii of this.bookings) {
      const temp = {
        id: count,
        content: ii.subject,
        start: ii.start,
        end: ii.end
      };
      dsitems.push(temp);
      count++;
    }

    const items = new vis.DataSet(dsitems);

    // Configuration for the Timeline
    this.options = {
      height: '200px',
      showCurrentTime: true,
      start: moment().add(-1, 'hours').toDate(),
      end: moment().add(6, 'hours').toDate(),
      horizontalScroll: true,
      zoomKey: 'ctrlKey',
      timeAxis: {
        scale: 'hour',
        step: 1
      }

    };

    // Create a Timeline
    this.timeline = new vis.Timeline(container, items, this.options);
    // this.rebuildTimeline = Observable.interval(60000);
    // this.rebuildTimeline
    //   .takeUntil(this.unsubscribe$)
    //   .subscribe(i => {
    //     this.resetTimeline();
    //   });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  resetTimeline() {
    console.log('resetTimeline');

    this.timeline.setOptions(this.options);
  }

}
