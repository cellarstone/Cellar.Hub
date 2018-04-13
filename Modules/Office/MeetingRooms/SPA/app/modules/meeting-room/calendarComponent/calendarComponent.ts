import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { Booking } from '../../../entities/booking';
import { calendarSlideStateTrigger } from '../../../shared/route-animations';
import { calendarSlideRightTrigger, calendarSlideLeftTrigger, calendarTodayTrigger, showEditButtonsTrigger } from './calendar.animations';
import { SharedService } from '../../../services/shared.service';
import { GetInfoVM } from 'app/models/GetInfoVM';
import { MeetingRoomVM } from 'app/models/MeetingRoomVM';
import { K2ExchangeGraphqlService } from 'app/services/k2exchange-graphql.service';
import { MeetingVM } from 'app/models/MeetingVM';
import { Moment } from 'moment';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddMeetingDialogComponent } from './add-meeting-dialog/add-meeting-dialog.component';
import { CreateMeetingVM } from '../../../models/CreateMeetingVM';
import { DeleteMeetingVM } from '../../../models/DeleteMeetingVM';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

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


  pinNumber: string = '';


  bookedMeetings: Booking[] = [];

  // @HostBinding('@routeFadeState') routeAnimation = true;
  @HostBinding('@calendarSlideState') routeAnimation = true;

  public today = moment();
  public selectedDate = moment();
  public daysArr: moment.Moment[];
  public dateForm: FormGroup;
  public calendarDaysSlideRight: boolean = false;
  public calendarDaysSlideLeft: boolean = false;
  public editModalIsShown: boolean = false;
  public showEditButtons: boolean = false;
  public calendarTodayAnimation: boolean = false;


  item: MeetingRoomVM;


  constructor(public route: ActivatedRoute,
    private sharedService: SharedService,
    private k2exchangeService: K2ExchangeGraphqlService,
    private dialog: MatDialog) { }

  ngOnInit() {
    //moment.locale('cs');

    this.daysArr = this.createCalendar(this.today);
    this.selectedDate = moment(this.today);

    this.sharedService.selectedRoom$.subscribe(value => {
      this.item = value;
    });

    let aaa = this.sharedService.actualMeetings$.subscribe(values => {
      let result = new Array<Booking>();


      // for (let item of values) {
      //   console.log("-------------------------------------------");
      //   console.log("-------------------------------------------");
      //   let startAAAA = moment(item.start.replace('Z',''));
      //   console.log(startAAAA);
      //   console.log(startAAAA.format("YYYY-MM-DDTHH:mm:ss"));

      //   let startBBBB = moment(item.start);
      //   console.log(startBBBB);
      //   console.log(startBBBB.format("YYYY-MM-DDTHH:mm:ss"));
      //   console.log("-------------------------------------------");
      //   console.log("-------------------------------------------");
      // }



      // ALL DAY is FREE
      if (values.length == 0) {
        let temp = new Booking();
        temp.status = "available";
        temp.from = "00:00";
        temp.fromFullDateTime = this.selectedDate.hours(0).minutes(0).seconds(0);
        temp.to = "00:00";
        temp.toFullDateTime = this.selectedDate.hours(0).minutes(0).seconds(0);
        temp.by = "Available";
        result.push(temp);
      }


      //------------------------------------
      //calculate reserved times
      //------------------------------------
      for (let item of values) {
        let temp = new Booking();
        temp.status = "reserved";
        temp.fromFullDateTime = moment(item.start);
        temp.from = temp.fromFullDateTime.format("HH:mm");
        temp.toFullDateTime = moment(item.end);
        temp.to = temp.toFullDateTime.format("HH:mm");

        let tempArr = item.subject.split(' ');
        if (item.subject.includes("KonzoleToExchange")) {
          temp.by = tempArr[0];
        } else {
          temp.by = tempArr[0] + " " + tempArr[1];
        }
        temp.subject = item.subject.replace(temp.by + " ", '');

        result.push(temp);
      }

      //------------------------------------
      //calculate available times
      //------------------------------------
      let availableFrom = "";
      let availableFromFullDateTime = moment();
      let availableTo = "";
      let availableToFullDateTime = moment();
      for (let index = 0; index < values.length; index++) {
        const item = values[index];
        //BEGIN
        if(index == 0){
          let end = moment(item.start);
          let start = moment(end.format('YYYY-MM-DDT00:00:00')) 

          let temp = new Booking();
          temp.status = "available";
          temp.fromFullDateTime = start;
          temp.from = start.format("HH:mm");
          temp.toFullDateTime = end;
          temp.to = end.format("HH:mm");
          temp.by = "Available";
          result.push(temp);

          availableFromFullDateTime = moment(item.end);
          availableFrom = availableFromFullDateTime.format('HH:mm');
        } 

        if(index != 0){

          availableToFullDateTime = moment(item.start);
          availableTo = moment(item.start).format('HH:mm');


            if(availableFrom != availableTo){
              let temp = new Booking();
              temp.status = "available";
              temp.fromFullDateTime = availableFromFullDateTime;
              temp.from = availableFrom;
              temp.toFullDateTime = availableToFullDateTime;
              temp.to = availableTo;
              temp.by = "Available";
              result.push(temp);
            } 

            availableFromFullDateTime = moment(item.end);
            availableFrom = availableFromFullDateTime.format('HH:mm');

        }

        //END
        if(index == values.length - 1){
          let start = moment(item.end);
          let end = moment(start.add(1,'days').format('YYYY-MM-DDT00:00:00')+"Z") 

          console.log(start);
          console.log(end);

          let temp = new Booking();
          temp.status = "available";
          temp.fromFullDateTime = start;
          temp.from = start.format("HH:mm");
          temp.toFullDateTime = end;
          temp.to = end.format("HH:mm");
          temp.by = "Available";
          result.push(temp);
        } 
      }


      //------------------------------------
      //sort result meetings
      //------------------------------------
      result.sort((a, b): number => {
        var startTime = moment(a.from, "HH:mm");
        var endTime = moment(b.from, "HH:mm");
        if (startTime.isBefore(endTime))
          return -1;
        if (startTime.isAfter(endTime))
          return 1;
        return 0;
      });

      this.bookedMeetings = result;
    });
  }


  //--------------------------------------
  // MODALS
  //--------------------------------------


  openDialog(meeting: Booking) {

    console.log(meeting);
    //HACK !!!!!!!
    // meeting.fromFullDateTime = meeting.fromFullDateTime.add(-1, 'days');
    // meeting.toFullDateTime = meeting.toFullDateTime.add(-1, 'days');

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '500px';

    let vm = new CreateMeetingVM();
    vm.attendeeMails.push(this.item.email);
    if (this.item.email == "jednacka.butan@alza.cz") {
      vm.location = "Jednačka Butan 10";
    } else if (this.item.email == "jednacka.zero@alza.cz") {
      vm.location = "Jednačka Zero 20 (Projektor)"; //
    }
    vm.start = meeting.fromFullDateTime.format("YYYY-MM-DDTHH:mm:ss");
    vm.end = meeting.toFullDateTime.format("YYYY-MM-DDTHH:mm:ss");


    if(meeting.fromFullDateTime.date() == 15){
      console.log("----------------------");
      console.log("WARNING - DATE - 15.4.2018");
      console.log("meeting.fromFullDateTime")
      console.log("----------------------");
      console.log(meeting);
      console.log(vm.start);
      console.log(vm.end);
    }


    dialogConfig.data = vm;

    const dialogRef = this.dialog.open(AddMeetingDialogComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(value => {
      //console.log(value);

      let valueObj = <CreateMeetingVM>value;

      


      this.k2exchangeService.createMeeting(value)
        .subscribe(({ data }) => {


          console.log('got data', data);

          if(data.createMeeting){
            //this.selectDate(this.selectedDate);
            setTimeout(() => {
              this.selectDate(this.selectedDate);
            }, 3000);
          }


        }, (error) => {
          console.log('there was an error sending the query', error);
        });

    });
  }



  deleteMeeting(meeting: Booking) {

    let adf = new DeleteMeetingVM();
    adf.meetingRoomMail = this.item.email;
    adf.subject = meeting.subject;
    adf.start = meeting.fromFullDateTime.format("YYYY-MM-DDTHH:mm:ss") + "Z";
    adf.end = meeting.toFullDateTime.format("YYYY-MM-DDTHH:mm:ss") + "Z";

    this.k2exchangeService.deleteMeeting(adf)
      .subscribe(({ data }) => {

        
        if(data.deleteMeeting){
          //this.selectDate(this.selectedDate);
          setTimeout(() => {
            this.selectDate(this.selectedDate);
          }, 3000);
        }

        console.log('got data', data);
      }, (error) => {
        console.log('there was an error sending the query', error);
      });


  }

  //http://localhost:44511/space/5ace90856c81550007422de5/calendar




  //--------------------------------------
  // CALENDAR
  //--------------------------------------




  // Return today from the daysArr
  // public todayDate() {
  //   this.daysArr.forEach(element => {
  //     if(element.format('D MMMM YYYY') === moment(this.today).locale('cs').format('D MMMM YYYY')) {
  //       return this.selectedDate = element;
  //     }
  //   });
  // }

  onEditButton() {
    this.showEditButtons = !this.showEditButtons;
    // this.editModalIsShown = true;
  }



  // Give every day in calendar an object which has Booking model.
  // public pushBookings() {
  //   this.daysArr.forEach(element => {
  //     element.bookedMeetings = this.bookedMeetings;
  //     element.bookedMeetings.from = element.hour(8).format('H:mm');
  //     element.bookedMeetings.to = element.hour(0).format('H:mm');
  //   });
  // }

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

    // let firstDayOfMonth = moment(today).startOf('M');
    // let days = Array.apply(null, { length: today.daysInMonth() })
    //   .map(Number.call, Number)
    //   .map(n => {
    //     return moment(firstDayOfMonth).add(n, 'd');
    //   });

    // for (let n = 0; n < firstDayOfMonth.weekday(); n++) {
    //   days.unshift(moment(today).subtract(1, 'M').endOf('M').subtract(n, 'd'));
    // };

    // if (days.length <= 42) {
    //   for (let n = 0; (42 - days.length); n++) {
    //     days.push(moment(today).add(1, 'M').startOf('M').add(n, 'd'));
    //   }
    // }

    //console.log(days);

    return days;
  }

  // On click, display the selected day.
  selectDate(date: moment.Moment) {
    // console.log(date);
    // console.log(date.day());
    // console.log(date.date());
    // console.log(date.format('DD'));
    // console.log(date.format('YYYY-MM-DDTHH:mm:ss'));

    // console.log(date.locale('cs'));
    // console.log(date.locale('cs').day());
    // console.log(date.locale('cs').date());
    // console.log(date.locale('cs').format('DD'));
    // console.log(date.locale('cs').format('YYYY-MM-DDTHH:mm:ss'));


    //this.sharedService.actualMeetingsStore.next(new Array<MeetingVM>());

    //--------------------------------------------------
    // GET Actual meetings for this day for this Meeting Room
    //--------------------------------------------------

    let asdf = new GetInfoVM();
    asdf.attendeeMails.push(this.item.email);
    asdf.start = date.format('YYYY-MM-DDTHH:mm:ss') + "Z";
    asdf.end = date.add(1, 'days').format('YYYY-MM-DDTHH:mm:ss') + "Z";
    asdf.goodSuggestionThreshold = 49;
    asdf.maximumNonWorkHoursSuggestionsPerDay = 0;
    asdf.maximumSuggestionsPerDay = 48;
    asdf.meetingDuration = 60;
    asdf.minimumSuggestionQuality = 0;
    asdf.requestedFreeBusyView = 4;

    this.k2exchangeService.getInfo(asdf).subscribe((value) => {

      console.log(value);

      let items = <Array<MeetingVM>>value;

      this.sharedService.actualMeetingsStore.next(items);
      //this.sharedService.actualMeetings$ = Observable.of(items);

      for (const item of items) {
        console.log('-------------------');
        console.log(item.status);
        console.log(item.subject);
        console.log(item.location);
        console.log(item.start);
        console.log(item.end);
        console.log('-------------------');
      }
    })



    //HACK !!!!!!!
    this.selectedDate = date.add(-1, 'days');
    // console.log(this.selectedDate);
    // console.log(this.selectedDate.day());
    // console.log(this.selectedDate.date());
    // console.log(this.selectedDate.format('DD'));
    // console.log(this.selectedDate.format('YYYY-MM-DDTHH:mm:ss'));

    // console.log(this.selectedDate.locale('cs'));
    // console.log(this.selectedDate.locale('cs').day());
    // console.log(this.selectedDate.locale('cs').date());
    // console.log(this.selectedDate.locale('cs').format('DD'));
    // console.log(this.selectedDate.locale('cs').format('YYYY-MM-DDTHH:mm:ss'));
  }



  compare(a, b) {

    var startTime = moment(a, "HH:mm");
    var endTime = moment(b, "HH:mm");


    if (startTime.isBefore(endTime))
      return -1;
    if (startTime.isAfter(endTime))
      return 1;
    return 0;
  }

}



