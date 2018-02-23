import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { Message, SelectItem } from 'primeng/primeng';

declare var jQuery: any;


class Rand2MqttParameters {
   mqtttopic: string
}

@Component({
  selector: 'workflow-rand2mqtt',
  templateUrl: './rand2mqtt.component.html',
  styleUrls: ['./rand2mqtt.component.scss']
})
export class Rand2MqttWorkflowComponent implements OnInit {

  @Input()
  item: CellarWorkflow;

  @Output() onSave = new EventEmitter<CellarWorkflow>();
  // @Output() onCancel = new EventEmitter();
  // @Output() onDelete = new EventEmitter<CellarWorkflow>();

  validations: Message[] = [];
  messagesToUser: Message[] = [];

  //PARAMETERS
  mqtttopic: string;


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
    let asdf = <Rand2MqttParameters>this.item.workflowparams;
    this.mqtttopic = asdf.mqtttopic;
    }

    //console.log(this.workflowName);
   
  }




  saveWorkflow() {


    if (this.validations.length == 0) {

      //SAVE PARAMETERS
      let temp = new Rand2MqttParameters();
      temp.mqtttopic = this.mqtttopic;
      this.item.workflowparams = temp;
      this.item.workflowtype = "rand2mqtt";


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
