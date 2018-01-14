import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

declare var $: any;



@Component({
  selector: 'home-component',
  templateUrl: './homeComponent.html',
  styleUrls: ['./homeComponent.scss']
})
export class HomeComponent implements OnInit {
  constructor(public sharedService: SharedService) { }

  timelineMovement: number;
  
  myDate = new Date();

  ngOnInit() {
    var sum = 0;
    var r = $('.time-reserved');
    var h = $('.time-stick-hour');
    var m = $('.time-stick-minute');
    var time = $('.time-axis');

    setInterval(() => {
      this.myDate = new Date();
      
      if(sum !== 33) {
        r.css('left', (parseFloat(r.css('left')) - 100) + 'px');
        h.css('left', (parseFloat(h.css('left')) - 100) + 'px'); 
        m.css('left', (parseFloat(m.css('left')) - 100) + 'px');
        time.css('left', (parseFloat(time.css('left')) - 100) + 'px');
        sum++;
        // console.log(sum)
      } else {
        r.css('left', (parseFloat(r.css('left')) + 3300) + 'px');
        h.css('left', (parseFloat(h.css('left')) + 3300) + 'px'); 
        m.css('left', (parseFloat(m.css('left')) + 3300) + 'px');
        time.css('left', (parseFloat(time.css('left')) + 3300) + 'px');
        sum = 0;
      }
      
    }, 1000);

    if (this.sharedService.state == "Reserved") {
      this.onReserved();
    } else if (this.sharedService.state == "Available") {
      this.onAvailable();
    } else if (this.sharedService.state == "Maintenance") {
      this.onMaintenance();
    } else {
      this.onAvailable();
    }
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
