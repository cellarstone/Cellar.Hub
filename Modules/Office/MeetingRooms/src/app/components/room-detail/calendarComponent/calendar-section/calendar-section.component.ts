import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { calendarSlideStateTrigger } from 'app/shared/route-animations';
import { calendarSlideRightTrigger, calendarSlideLeftTrigger, calendarTodayTrigger } from './calendar-section.animations';

import * as moment from 'moment';

@Component({
  selector: 'app-calendar-section',
  templateUrl: './calendar-section.component.html',
  styleUrls: ['./calendar-section.component.scss'],
  animations: [
    calendarSlideStateTrigger,
    calendarSlideRightTrigger,
    calendarSlideLeftTrigger,
    calendarTodayTrigger
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarSectionComponent implements OnInit {

  @Output() onSelectDate = new EventEmitter<moment.Moment>();

  @Input()
  selectedDate: moment.Moment;

  //public today: moment.Moment;
  public daysArr: moment.Moment[];
  public calendarTodayAnimation: boolean = false;
  public calendarDaysSlideRight: boolean = false;
  public calendarDaysSlideLeft: boolean = false;

  constructor() { }

  ngOnInit() {
    this.daysArr = this.createCalendar(moment(this.selectedDate));
  }

  
  // ------------------------------------
  // SELECT DATE
  // ------------------------------------
  selectDate(date: moment.Moment) {
    // console.log(date);
    this.selectedDate = moment(date);
    this.daysArr = this.createCalendar(moment(date));
    // console.log(this.selectedDate);
    this.onSelectDate.emit(moment(this.selectedDate));
  }


  // ------------------------------------
  // CALENDAR 
  // ------------------------------------
  // Creating a calendar of 42 fields. Beginning with unshift days of previous month, in the middle of the current month, in the end push of beginning next month.
  public createCalendar(selectedDate: moment.Moment) {

    let selectedDateLocal = selectedDate;
    let firstDayOfMonth = selectedDateLocal.startOf('M');
    let days = new Array<moment.Moment>();

    //Before first day in month
    let isoWeeday = firstDayOfMonth.isoWeekday();
    for (let n = 1; n < isoWeeday; n++) {
      let shift = isoWeeday - n;
      let rrr = moment(selectedDateLocal).add(-1 * shift, 'days');
      days.push(rrr);
    };

    //All days in month
    let daysInMonth = moment(selectedDateLocal).daysInMonth();
    for (let n = 0; n < daysInMonth; n++) {
      let rrr = moment(firstDayOfMonth).add(n, 'days');
      days.push(rrr);
    };

    let rows = days.length / 7;

    //After last day in month
    if(rows > 5){
      if (days.length <= 42) {
        for (let n = 0; (42 - days.length); n++) {
          let rrr = moment(selectedDateLocal).add(1, 'M').startOf('M').add(n, 'd');
          days.push(rrr);
        }
      }
    } else {
      if (days.length <= 35) {
        for (let n = 0; (35 - days.length); n++) {
          let rrr = moment(selectedDateLocal).add(1, 'M').startOf('M').add(n, 'd');
          days.push(rrr);
        }
      }
    }

    

    return days;
  }

  public todayCheck(day: moment.Moment) {
    let temp = moment().hour(0).minute(0).second(0).millisecond(0);

    if(temp.year() == day.year() &&
      temp.month() == day.month() &&
      temp.date() == day.date())
      {
        console.log(temp);
        console.log(day);

        return true;
      } else {
        return false;
      }
  }

  public selectedDateCheck(day: moment.Moment) {
    console.log("selectedDateCheck");
    let temp1 = moment(day);
    let temp2 = moment(this.selectedDate);
    let result = temp1.isSame(temp2);
    // console.log(temp1);
    // console.log(temp2);
    // console.log(result);
    return result;
  }

  // Check if we're in current month
  public thisMonthCheck(day) {
    if (day.isBefore(this.selectedDate, 'month')) {
      return false;
    } else if (day.isAfter(this.selectedDate, 'month')) {
      return false;
    } else {
      return true;
    }
  }

  // Check if we're in current week
  public thisWeekCheck(day) {
    let aaa = day.isoWeek();
    let bbb = moment().isoWeek();

    if(aaa == bbb && day.isoWeekday() != 1 && day.isoWeekday() != 7){
      return true;
    } else {
      return false;
    }
  };

  // Check if we're in first day of week
  public thisWeekCheckFirst(day) {
    let aaa = day.isoWeek();
    let bbb = moment().isoWeek();

    if(aaa == bbb && day.isoWeekday() === 1){
      return true;
    } else {
      return false;
    }
  };

  // Check if we're in last day of week
  public thisWeekCheckLast(day) {
    let aaa = day.isoWeek();
    let bbb = moment().isoWeek();

    if(aaa == bbb && day.isoWeekday() === 7){
      return true;
    } else {
      return false;
    }
  };

  // On Click, give a new array of days of current month.
  public monthHome() {
    this.calendarTodayAnimation = true;
    setTimeout(() => {
      let newOne = moment().hour(0).minute(0).second(0).millisecond(0);
      this.selectDate(newOne);
    }, 500);
    setTimeout(() => {
      this.calendarTodayAnimation = false;
    }, 0);

  }

  // On click, go to next month.
  public nextMonth() {

    this.calendarDaysSlideRight = true;
    setTimeout(() => {
      let newOne = moment(this.selectedDate).add(1, 'months');
      this.selectDate(newOne);

      // this.selectedDate.add(1, 'months');
      // this.daysArr = this.createCalendar(this.selectedDate);
    }, 150);
    setTimeout(() => {
      this.calendarDaysSlideRight = false;
    }, 0);
  }

  // On click, go back to previous month
  public previousMonth() {

    this.calendarDaysSlideLeft = true;
    setTimeout(() => {
      let newOne = moment(this.selectedDate).subtract(1, 'months');
      this.selectDate(newOne);

      // this.selectedDate.subtract(1, 'months');
      // this.daysArr = this.createCalendar(this.selectedDate);
    }, 150);
    setTimeout(() => {
      this.calendarDaysSlideLeft = false;
    }, 0);
  }

  

}
