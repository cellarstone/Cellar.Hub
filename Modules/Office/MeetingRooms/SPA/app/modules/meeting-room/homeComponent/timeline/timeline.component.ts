import { Component, OnInit, Input } from '@angular/core';

declare var vis: any;
// import * as vis from 'vis';
import * as moment from 'moment';
import { MeetingVM } from 'app/models/MeetingVM';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  
  @Input('meetings')
  meetings: MeetingVM[];

  timeline: any;
  rebuildTimeline: Observable<number>;

  ngOnInit() {
    
    console.log("ngOnInit - timeline");
    console.log(this.meetings);

    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');

    // moment.locale('cs');
    // console.log(moment.locale());

    let dsitems = new Array<{}>(); 
    let count: number = 1;

    


    for (let ii of this.meetings) {

      // console.log(ii.start);

      // console.log(moment(ii.start));
      // console.log(moment.utc(ii.start));

      // console.log(moment(ii.start).toString());
      // console.log(moment.utc(ii.start).toString());

      // console.log(moment(ii.start).toDate());
      // console.log(moment.utc(ii.start).toDate());

      var startMoment = moment(ii.start);
      var endMoment = moment(ii.end);

      console.log(new Date(startMoment.year(), startMoment.month(), startMoment.date(), startMoment.hours(), startMoment.minutes(), startMoment.seconds(), startMoment.milliseconds()));
      let temp = {
        id: count,
        content: ii.subject,
        start: moment(ii.start.replace('Z','')),
        end: moment(ii.end.replace('Z',''))
      }
      // let temp = {
      //   id: count,
      //   content: ii.subject,
      //   start: new Date(startMoment.year(), startMoment.month(), startMoment.date(), startMoment.hours(), startMoment.minutes(), startMoment.seconds(), startMoment.milliseconds()),
      //   end: new Date(endMoment.year(), endMoment.month(), endMoment.date(), endMoment.hours(), endMoment.minutes(), endMoment.seconds(), endMoment.milliseconds())
      // }
      // let temp = new DataSetItem();
      // temp.id = count;
      // temp.content = ii.subject;
      // temp.start = moment(ii.start).toDate();
      // temp.end = moment(ii.end).toDate();
      // console.log(temp);
      dsitems.push(temp);
      count++;
    }

    console.log(dsitems);
    
    var items = new vis.DataSet(dsitems);

    //Create a DataSet (allows two way data-binding)
    // var items = new vis.DataSet([
    //   {id: 1, content: 'item 1', start: '2014-04-20'},
    //   {id: 2, content: 'item 2', start: '2014-04-14'},
    //   {id: 3, content: 'item 3', start: '2014-04-18'},
    //   {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
    //   {id: 5, content: 'item 5', start: '2014-04-25'},
    //   {id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
    // ]);

    // console.log(items);

    // Configuration for the Timeline
    var options = {
      height: '300px',
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

    // Create a Timeline
    this.timeline = new vis.Timeline(container, items, options);
    // timeline.moveTo(moment());
    this.rebuildTimeline = Observable.interval(60000);
    this.rebuildTimeline
      .subscribe(i => { 
          this.resetTimeline();
      });

  }

  resetTimeline(){
    console.log("resetTimeline");
    var options = {
      height: '300px',
      // moment: function(date) {
      //   return vis.moment(date).utc();
      // },
      showCurrentTime: true,
      // moment: function(date) {
      //   return vis.moment(date).utcOffset('+02:00');
      // }
      start: moment().add(-30,'minutes').toDate(),
      end: moment().add(5,'hours').toDate(),
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


// class DataSetItem{
//   id: number
//   content: string
//   start: Date
//   end: Date
//   type: string
// }