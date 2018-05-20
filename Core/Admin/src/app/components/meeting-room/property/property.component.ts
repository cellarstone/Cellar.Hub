import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-meeting-room-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  @Input()
  meetingRoomEmail: string = "";

  @Output() onSave = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter();

  isMeetingRoomValues: boolean;
  
  isInvalid: boolean;

  constructor() { }

  ngOnInit() {
    if(this.meetingRoomEmail != ""){
      this.isMeetingRoomValues = true;
    }else{
      this.isMeetingRoomValues = false;
    }
  }

  checkboxChanged(){
    if(!this.isMeetingRoomValues){
      this.onDelete.emit();
    }
  }

  myFunction(data){
    if(data.target.validationMessage != ""){
      this.isInvalid = true;
    }
    else
    {
      this.isInvalid = false;
      if(this.isMeetingRoomValues){
        this.onSave.emit(this.meetingRoomEmail);
      } else {
        this.onDelete.emit();
      }
      
    }
  }


}
