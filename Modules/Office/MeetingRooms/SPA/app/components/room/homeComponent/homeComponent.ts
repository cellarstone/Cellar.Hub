import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SharedService } from '../../../services/shared.service';
import { homeSlideStateTrigger } from '../../../shared/route-animations';

declare var $: any;



@Component({
  selector: 'home-component',
  templateUrl: './homeComponent.html',
  styleUrls: ['./homeComponent.scss'],
  animations: [
    homeSlideStateTrigger
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  public room: {name: string};
  private paramsSubscription: Subscription;
  timelineMovement: number;
  
  myDate = new Date();

//  @HostBinding('@routeFadeState') routeAnimation = true;
 @HostBinding('@homeSlideState') routeAnimation = true;

  constructor(public sharedService: SharedService, private route: ActivatedRoute) { }



  ngOnInit() {
    $("body").css("background-color", "#F44336");
    this.room = {
      name: this.route.parent.snapshot.params['name']
    };

    this.paramsSubscription = this.route.parent.params.subscribe(
      (params: Params) => {
        this.room.name = params['name'];
      }
    );

    var sum = 0;
    var r = $('.time-reserved');
    var h = $('.time-stick-hour');
    var m = $('.time-stick-minute');
    var time = $('.time-axis');

    setInterval(() => {
      this.myDate = new Date();
      
      if(sum !== 340) {
        r.css('left', (parseFloat(r.css('left')) - 10) + 'px');
        h.css('left', (parseFloat(h.css('left')) - 10) + 'px'); 
        m.css('left', (parseFloat(m.css('left')) - 10) + 'px');
        time.css('left', (parseFloat(time.css('left')) - 10) + 'px');
        sum++;
        // console.log(sum)
      } else {
        r.css('left', (parseFloat(r.css('left')) + 3400) + 'px');
        h.css('left', (parseFloat(h.css('left')) + 3400) + 'px'); 
        m.css('left', (parseFloat(m.css('left')) + 3400) + 'px');
        time.css('left', (parseFloat(time.css('left')) + 3400) + 'px');
        sum = 0;
      }
      
    }, 1000);

    // if (this.sharedService.state == "Reserved") {
    //   this.onReserved();
    // } else if (this.sharedService.state == "Available") {
    //   this.onAvailable();
    // } else if (this.sharedService.state == "Maintenance") {
    //   this.onMaintenance();
    // } else {
    //   this.onAvailable();
    // }
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onReserved() {
    $("body").css("background-color", "#F44336");
    $('.status').text('Reserved');
    $('.homeBody').css({ 'color': 'white' });
    $('.presenter').children('span').text('by');
    $('.presenter').children('div').text('Jan Novák');
    this.sharedService.state = 'Reserved';
  }

  onAvailable() {
    $("body").css('background-color', "#4CAF50");
    $('.status').text('Available');
    $('.homeBody').css({ 'color': 'white' });
    $('.presenter').children('span').text('');
    $('.presenter').children('div').text('');
    this.sharedService.state = 'Available';
  }

  onMaintenance() {
    $("body").css('background-color', "#FFEB3B");
    $('.status').text('Maintenance');
    $('.homeBody').css({ 'color': 'black' });
    $('.presenter').children('span').text('');
    $('.presenter').children('div').text('');
    this.sharedService.state = 'Maintenance';
  }
}
