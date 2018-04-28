import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OfficeGraphqlService } from 'app/services/office-graphql.service';
import { MeetingRoomDTO } from 'app/dto/MeetingRoomDTO';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
import { LoadAllMeetingRoomsAction, SelectMeetingRoomAction } from 'app/state/actions/application.actions';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  items$: Observable<MeetingRoomDTO[]>;

  constructor(private store: Store<ApplicationState>,
              private router: Router) {
    this.items$ = this.store.select(state => state.storeData.meetingRooms);
  }

  ngOnInit() {
    this.store.dispatch(new LoadAllMeetingRoomsAction());
  }

  selectRoom(item: MeetingRoomDTO){
    // this.store.dispatch(new SelectMeetingRoomAction(item));
    this.router.navigate(['/space/' + item.id, {outlets:{roomDetail:'home'}}]);
  }

}
