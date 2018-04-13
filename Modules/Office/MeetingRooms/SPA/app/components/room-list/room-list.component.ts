import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';

import { CellarSpace } from '../../entities/CellarSpace';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OfficeGraphqlService } from 'app/services/office-graphql.service';
import { CellarMeetingRoom } from '../../entities/CellarMeetingRoom';
import { MeetingRoomVM } from 'app/models/MeetingRoomVM';
import { SharedService } from '../../services/shared.service';
import { MeetingVM } from 'app/models/MeetingVM';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  items = new Array<MeetingRoomVM>()

  

  constructor(private officeService: OfficeGraphqlService,
    private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.sharedService.selectedRoomStore.next(new MeetingRoomVM());
    this.sharedService.actualMeetingsStore.next(new Array<MeetingVM>());
    this.officeService.getMeetingRoomModel("").subscribe((values) => {
      //Convert BSON ID to string
      let result = new Array<MeetingRoomVM>();
      for (let index = 0; index < values.length; index++) {
          const item = values[index];
          let aaa = new MeetingRoomVM().New(item);
          result.push(aaa);
      }
      this.items = result;
    })

  }

  selectRoom(item: MeetingRoomVM){
      this.router.navigate(['/space/' + item.id + '/home']);
  }

}
