import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { Message, SelectItem } from 'primeng/primeng';
import { MultiStepWizardService } from '../../../view/workflow/wizard/wizard.service';

declare var jQuery: any;


class MqttTriggerParameters {
   topic: string
}

@Component({
  selector: 'trigger-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.scss']
})
export class MqttTriggerComponent implements OnInit {

  @Input()
  item: CellarWorkflow;

  @Output() onSave = new EventEmitter<CellarWorkflow>();
  // @Output() onCancel = new EventEmitter();
  // @Output() onDelete = new EventEmitter<CellarWorkflow>();

  validations: Message[] = [];
  messagesToUser: Message[] = [];

  //PARAMETERS
  mqtttopic: string;


  constructor(public wizardService: MultiStepWizardService) {
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
      let asdf = <MqttTriggerParameters>this.item.triggerparams;
      this.mqtttopic = asdf.topic;
    }
    //console.log(this.workflowName); 
  }

  saveTrigger() {

    if (this.validations.length == 0) {

      //SAVE PARAMETERS
      let temp = new MqttTriggerParameters();
      temp.topic = this.mqtttopic;
      this.item.triggerparams = temp;
      this.item.triggertype = "mqtt";

      //emit output  
      this.onSave.emit(this.item);
      // this.wizardService.mqttTopic = this.mqtttopic;

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
