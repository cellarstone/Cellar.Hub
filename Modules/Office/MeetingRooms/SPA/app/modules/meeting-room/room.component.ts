import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { K2ExchangeGraphqlService } from '../../services/k2exchange-graphql.service';
import { GetInfoVM } from '../../models/GetInfoVM';
import { MeetingVM } from '../../models/MeetingVM';
import { SharedService } from '../../services/shared.service';

import * as moment from 'moment';
import { OfficeGraphqlService } from 'app/services/office-graphql.service';
import { MeetingRoomVM } from 'app/models/MeetingRoomVM';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  public state: string;
  private sub: any;

  roomName: string;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private officeService: OfficeGraphqlService,
    private k2exchangeService: K2ExchangeGraphqlService) { }

  ngOnInit() {
    console.log("ngOnInit");
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    //moment.locale('cs');

    //--------------------------------------------------
    // GET Selected Meeting Room
    //--------------------------------------------------
    this.officeService.getMeetingRoomModel(id)
      .flatMap((values: MeetingRoomVM[]) => {
        console.log("flatMap1");
        //Convert BSON ID to string
        let result = new Array<MeetingRoomVM>();
        for (let index = 0; index < values.length; index++) {
          const item = values[index];
          let aaa = new MeetingRoomVM().New(item);
          result.push(aaa);
        }
        console.log(result[0]);
        this.sharedService.selectedRoomStore.next(result[0]);
        // this.sharedService.selectedRoom$ = Observable.of(result[0]);
        return Observable.of(result[0]);
      })
      .flatMap((value: MeetingRoomVM) => {
        console.log("flatMap2");
        //--------------------------------------------------
        // GET Actual meetings for this day for this Meeting Room
        //--------------------------------------------------

        let asdf = new GetInfoVM();
        asdf.attendeeMails.push(value.email);
        asdf.start = moment().format('YYYY-MM-DDTHH:mm:ss');
        asdf.end = moment().add(1, 'days').format('YYYY-MM-DDTHH:mm:ss');
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

        return Observable.of(true);
      })
      .map(value => {
        console.log(value);
      }).subscribe();

    //let selected = this.sharedService.selectedRoom;



  }
}
