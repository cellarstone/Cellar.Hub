import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { Message, SelectItem } from 'primeng/primeng';

declare var jQuery: any;


class TimeTriggerParameters {
   seconds: string
}

@Component({
  selector: 'trigger-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeTriggerComponent implements OnInit {

  @Input()
  item: CellarWorkflow;

  @Output() onSave = new EventEmitter<CellarWorkflow>();
  // @Output() onCancel = new EventEmitter();
  // @Output() onDelete = new EventEmitter<CellarWorkflow>();

  validations: Message[] = [];
  messagesToUser: Message[] = [];

  //PARAMETERS
  seconds: string;


  constructor() {
  }

  ngOnInit() {

    // if(this.item.workflowname != "") {
    //   this.workflowName = this.item.workflowname
    // } else {
    //   this.workflowName = this.generateUUID();
    // }

    // if(this.item.mqtttopic != "") {
    //   this.mqtttopic = this.item.mqtttopic
    // } 


    // //console.log(this.item);
    // if (this.item.parameters != null
    //   && this.item.parameters.length > 0) {
    //   this.workflowName = this.item.parameters[0];
      

    // } else {
    //   this.workflowName = "";
      
    // }

    // //Default values
    // if (this.workflowName == "") {
    //   this.workflowName = this.generateUUID();
    // }

    
    //console.log(this.item)

    if(this.item.id != ''){
    let asdf = <TimeTriggerParameters>this.item.triggerparams;
    this.seconds = asdf.seconds;
    }

    //console.log(this.workflowName);
   
  }




  saveTrigger() {


    if (this.validations.length == 0) {

      //SAVE PARAMETERS
      let temp = new TimeTriggerParameters();
      temp.seconds = this.seconds;
      this.item.triggerparams = temp;
      this.item.triggertype = "time";

      //emit output  
      this.onSave.emit(this.item);

    }
  }


  // deleteWorkflow() {
  //   this.onDelete.emit(this.item);
  // }

  // cancelWorkflow() {
  //   // go in router history back
  //   this.onCancel.emit();
  // }






  // generateUUID() {
  //   var d = new Date().getTime();
  //   var uuid = 'xxxxxxxx'.replace(/[xy]/g, function (c) {
  //     var r = (d + Math.random() * 16) % 16 | 0;
  //     d = Math.floor(d / 16);
  //     return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  //   });
  //   return uuid;
  // };




}
