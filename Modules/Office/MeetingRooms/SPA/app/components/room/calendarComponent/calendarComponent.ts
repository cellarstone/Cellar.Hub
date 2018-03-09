import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { Booking } from '../../../entities/booking';
import { calendarSlideStateTrigger } from '../../../shared/route-animations';
import { calendarSlideRightTrigger, calendarSlideLeftTrigger, calendarTodayTrigger, showEditButtonsTrigger } from './calendar.animations';

declare var $: any;

@Component({
  selector: 'calendar-component',
  templateUrl: './calendarComponent.html',
  styleUrls: ['./calendarComponent.scss'],
  animations: [
    calendarSlideStateTrigger,
    calendarSlideRightTrigger,
    calendarSlideLeftTrigger,
    calendarTodayTrigger,
    showEditButtonsTrigger
  ]
})
export class CalendarComponent implements OnInit {

  bookedMeetings: Booking[] = [
    {
      status: 'available',
      name: '',
      duration: '8:00 - 00:00',
      from: '00:00',
      to: '8:00',
      by: 'Available'
    }, 
    {
      status: 'reserved',
      name: 'IOT',
      duration: '1:30',
      from: '16:00',
      to: '17:00',
      by: 'Jan Novak'
    },
    {
      status: 'reserved',
      name: 'Marketing',
      duration: '1:00',
      from: '17:00',
      to: '18:00',
      by: 'Stephanie Johnson'
    },
    {
      status: 'available',
      name: '',
      duration: '6:00',
      from: '18:00',
      to: '00:00',
      by: 'Available'
    }
  ];

  // @HostBinding('@routeFadeState') routeAnimation = true;
  @HostBinding('@calendarSlideState') routeAnimation = true;
  
  public today = moment();
  public selectedDate;
  public daysArr;
  public dateForm: FormGroup;
  public calendarDaysSlideRight: boolean = false;
  public calendarDaysSlideLeft: boolean = false;
  public editModalIsShown: boolean = false;
  public showEditButtons: boolean = false;
  public calendarTodayAnimation: boolean = false;

  constructor(public fb: FormBuilder, public route: ActivatedRoute) { }

  ngOnInit() {
    this.daysArr = this.createCalendar(this.today);
    this.selectedDate = moment(this.today);
  }

  // Return today from the daysArr
  public todayDate() {
    this.daysArr.forEach(element => {
      if(element.format('D MMMM YYYY') === moment(this.today).locale('cs').format('D MMMM YYYY')) {
        return this.selectedDate = element;
      }
    });
  }

  onEditButton(){
    this.showEditButtons = true;
    // this.editModalIsShown = true;
  }

  

  // Give every day in calendar an object which has Booking model.
  public pushBookings() {
    this.daysArr.forEach(element => {
      element.bookedMeetings = this.bookedMeetings;
      element.bookedMeetings.from = element.hour(8).format('H:mm');
      element.bookedMeetings.to = element.hour(0).format('H:mm');
    });
  }

  public todayCheck(day) {
    return moment().locale('cs').format('L') === day.locale('cs').format('L');
  }

  // Check if we're in current month
  public thisMonthCheck(day) {
    if (day.locale('cs').isBefore(this.today, 'month')) {
      return false;
    } else if (day.isAfter(this.today, 'month')) {
      return false;
    } else {
      return true;
    }
  }

  // Check if we're in current week
  public thisWeekCheck(day) {
    if (day.locale('cs').isSame(moment(), 'week')) {
      return true;
    } else {
      return false;
    }
  };

  // Check if we're in first day of week
  public thisWeekCheckFirst(day) {
    if (day.locale('cs').isSame(moment(), 'week')) {
      if (day.locale('cs').isoWeekday() === 1) {
        return true;
      }
    } else {
      return false;
    }
  };

  // Check if we're in last day of week
  public thisWeekCheckLast(day) {
    if (day.locale('cs').isSame(moment(), 'week')) {
      if (day.locale('cs').isoWeekday() === 7) {
        return true;
      }
    } else {
      return false;
    }
  };

  // On Click, give a new array of days of current month.
  public monthHome() {
    this.calendarTodayAnimation = true;
    setTimeout(() => {
      this.today = moment();
      this.daysArr = this.createCalendar(this.today);
    }, 500);
    setTimeout(() => {
      this.calendarTodayAnimation = false;
    }, 0);
    
  }

  // On click, go to next month.
  public nextMonth() {
       
    this.calendarDaysSlideRight = true;
    setTimeout(() => {    
      this.today.add(1, 'months');
      this.daysArr = this.createCalendar(this.today);
    }, 150);
    setTimeout(() => {
      this.calendarDaysSlideRight = false;
    }, 0);
  }

  // On click, go back to previous month
  public previousMonth() {
    
    this.calendarDaysSlideLeft = true;
    setTimeout(() => {
      this.today.subtract(1, 'months');
      this.daysArr = this.createCalendar(this.today);
    }, 150);
    setTimeout(() => {
      this.calendarDaysSlideLeft = false;
    }, 0);
  }

  // Creating a calendar of 42 fields. Beginning with unshift days of previous month, in the middle of the current month, in the end push of beginning next month.
  public createCalendar(today) {
    let firstDayOfMonth = moment(today).locale('cs').startOf('M');
    let days = Array.apply(null, { length: today.locale('cs').daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDayOfMonth).add(n, 'd');
      });

    for (let n = 0; n < firstDayOfMonth.weekday(); n++) {
      days.unshift(moment(today).locale('cs').subtract(1, 'M').endOf('M').subtract(n, 'd'));
    };

    if (days.length <= 42) {
      for (let n = 0; (42 - days.length); n++) {
        days.push(moment(today).locale('cs').add(1, 'M').startOf('M').add(n, 'd'));
      }
    }
    return days;
  }

  // On click, display the selected day.
  selectDate(date: any) {
    console.log(date);
    return this.selectedDate = date;
  }

  



}

