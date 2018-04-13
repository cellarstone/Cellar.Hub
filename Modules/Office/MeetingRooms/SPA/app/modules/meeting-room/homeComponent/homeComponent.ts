import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SharedService } from '../../../services/shared.service';
import { homeSlideStateTrigger } from '../../../shared/route-animations';
import { MeetingRoomVM } from '../../../models/MeetingRoomVM';

declare var $: any;
declare var vis: any;
// import * as vis from 'vis';
import * as moment from 'moment';
import { MeetingVM } from 'app/models/MeetingVM';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'home-component',
  templateUrl: './homeComponent.html',
  styleUrls: ['./homeComponent.scss'],
  animations: [
    homeSlideStateTrigger
  ]
})
export class HomeComponent implements OnInit {

  item: MeetingRoomVM;
  meetings: MeetingVM[];

  //public room: {name: string};
  // private paramsSubscription: Subscription;
  
    // //  @HostBinding('@routeFadeState') routeAnimation = true;
    // @HostBinding('@homeSlideState') routeAnimation = true;

  constructor(public sharedService: SharedService, private route: ActivatedRoute) {
      
     }

  ngOnInit() {

    

    console.log("homecomponent - OnInit");
    this.sharedService.selectedRoom$.subscribe(value => {
      this.item = value;
      //this.setTimeline();
      console.log("homecomponent1");
      console.log(value);
    });

    this.sharedService.actualMeetings$.subscribe(values => {
      console.log("homecomponent2");
      console.log(values);
      this.meetings = values;

      let isReserved = false;
      for (let meeting of values) {

        let actualTime = moment().locale('cs');
        let start = moment(meeting.start.replace('Z',''));
        let end = moment(meeting.end.replace('Z',''));
  
        
        console.log(actualTime);
        console.log(start);
        console.log(end);
        let isActual = actualTime.isBetween(start,end);
        console.log(isActual);
        if(isActual){
          // console.log('-------------------');
          // console.log(meeting.status);
          // console.log(meeting.subject);
          // console.log(meeting.location);
          // console.log(meeting.start);
          // console.log(meeting.end);
          // console.log('-------------------');

          isReserved = true;
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
      
    });

    



    //$("body").css("background-color", "#F44336");
    // this.room = {
    //   name: this.route.parent.snapshot.params['name']
    // };

    // this.paramsSubscription = this.route.parent.params.subscribe(
    //   (params: Params) => {
    //     this.room.name = params['name'];
    //   }
    // );

    

    

    
  }

  // ngOnDestroy() {
  //   this.paramsSubscription.unsubscribe();
  // }

  onReserved() {
    $("body").css("background-color", "#F44336");
    $('.status').text('Reserved');
    $('.homeBody').css({ 'color': 'white' });
    // $('.presenter').children('span').text('by');
    // $('.presenter').children('div').text('Jan Novák');
    this.sharedService.state = 'Reserved';
  }

  onAvailable() {
    $("body").css('background-color', "#4CAF50");
    $('.status').text('Available');
    $('.homeBody').css({ 'color': 'white' });
    // $('.presenter').children('span').text('');
    // $('.presenter').children('div').text('');
    this.sharedService.state = 'Available';
  }

  onMaintenance() {
    $("body").css('background-color', "#FFEB3B");
    $('.status').text('Maintenance');
    $('.homeBody').css({ 'color': 'black' });
    // $('.presenter').children('span').text('');
    // $('.presenter').children('div').text('');
    this.sharedService.state = 'Maintenance';
  }





  // setTimeline(){

  //   // DOM element where the Timeline will be attached
  //   var container = document.getElementById('visualization');

  //   // Create a DataSet (allows two way data-binding)
  //   var items = new vis.DataSet([
  //     {id: 1, content: 'item 1', start: '2014-04-20'},
  //     {id: 2, content: 'item 2', start: '2014-04-14'},
  //     {id: 3, content: 'item 3', start: '2014-04-18'},
  //     {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
  //     {id: 5, content: 'item 5', start: '2014-04-25'},
  //     {id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
  //   ]);

  //   // Configuration for the Timeline
  //   var options = {};

  //   // Create a Timeline
  //   var timeline = new vis.Timeline(container, items, options);

  // }
}
