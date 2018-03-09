import { Component, OnInit } from '@angular/core';
// import { Event } from '_debugger';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  public state: string;

  constructor() { }

  ngOnInit() {
  }

}
