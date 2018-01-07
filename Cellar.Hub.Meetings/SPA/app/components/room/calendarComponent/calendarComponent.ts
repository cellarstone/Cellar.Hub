import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'calendar-component',
  templateUrl: './calendarComponent.html',
  styleUrls: ['./calendarComponent.scss']
})
export class CalendarComponentComponent implements OnInit {

  public today = moment().locale('cs');
  public selectedDate;
  public daysArr;
  public dateForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.initDateForm()
  }

  public initDateForm() {
    this.dateForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    })
  }

  public ngOnInit() {
    $("body").css("background-color", "#E91E63");
    this.daysArr = this.createCalendar(this.today);
    this.selectedDate = moment(this.today);
  }

  public todayCheck(day) {
    return moment().locale('cs').format('L') === day.locale('cs').format('L');
  }

  public thisMonthCheck(day) {
    if(day.locale('cs').isBefore(this.today, 'month')) {
      return false;
    } else if(day.isAfter(this.today, 'month')) {
      return false;
    } else {
      return true;
    }
  }

  public thisWeekCheck(day){
    if(day.locale('cs').isSame(moment(), 'week')){
      return true;
    } else {
      return false;
    }
  };

  public thisWeekCheckFirst(day){
    if(day.locale('cs').isSame(moment(), 'week')){
      if(day.locale('cs').isoWeekday() === 1) {
        return true;
      }
    } else {
      return false;
    }
  };
  public thisWeekCheckLast(day){
    if(day.locale('cs').isSame(moment(), 'week')){
      if(day.locale('cs').isoWeekday() === 7) {
        return true;
      }
    } else {
      return false;
    }
  };

  public nextMonth() {
    this.today.locale('cs').add(1, 'months');
    this.daysArr = this.createCalendar(this.today);
  }

  public previousMonth() {
    this.today.locale('cs').subtract(1, 'months');
    this.daysArr = this.createCalendar(this.today);
  }

  public createCalendar(today) {
    let firstDayOfMonth = moment(today).locale('cs').startOf('M');
    let days = Array.apply(null, { length: today.locale('cs').daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDayOfMonth).locale('cs').add(n, 'd');
      });

    for (let n = 0; n < firstDayOfMonth.weekday(); n++) {
      days.unshift(moment(today).locale('cs').subtract(moment().weekday() + n, 'd'));
      console.log();
    };

    if(days.length <= 42) {
      for (let n = 0; (42 - days.length); n++) {
        days.push(moment(today).locale('cs').add(1, 'M').startOf('M').add(n, 'd'));
      }
    }
    console.log(days);
    return days;
  }

  selectDate(date: any) {
    console.log(date);
    console.log(date.isoWeekday());
    return this.selectedDate = date;
  }

  

}

