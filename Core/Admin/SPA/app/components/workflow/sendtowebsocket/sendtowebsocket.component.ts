import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { Message, SelectItem } from 'primeng/primeng';

declare var jQuery: any;

@Component({
  selector: 'workflow-sendtowebsocket',
  templateUrl: './sendtowebsocket.component.html',
  styleUrls: ['./sendtowebsocket.component.scss']
})
export class SendtowebsocketComponent implements OnInit {

  @Input()
  private item: CellarWorkflow;

  @Output() onSave = new EventEmitter<CellarWorkflow>();
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter<CellarWorkflow>();

  validations: Message[] = [];
  messagesToUser: Message[] = [];

  isStateValid: boolean = true;


  //PARAMETERS
  workflowName: string;
  senzorID: string;
  topic: string;
  room: string;
  MqttUrl: string;
  websocketUrl: string;


  constructor() { }

  ngOnInit() {

    console.log(this.item);

    if (this.item.parameters != null
      && this.item.parameters.length > 0) {
      this.workflowName = this.item.parameters[0];
      this.senzorID = this.item.parameters[1];
      this.topic = this.item.parameters[2];
      this.room = this.item.parameters[3];
      this.MqttUrl = this.item.parameters[4];
      this.websocketUrl = this.item.parameters[5];
    } else {
      this.workflowName = "";
      this.senzorID = "";
      this.topic = "";
      this.room = "";
      this.MqttUrl = "";
      this.websocketUrl = "";
    }

    //Default values
    if (this.workflowName == "") {
      this.workflowName = "workflow_" + this.generateUUID();
    }

    if (this.MqttUrl == "") {
      this.MqttUrl = "cellar.hub.mqtt:1883";
    }

    if (this.websocketUrl == "") {
      this.websocketUrl = "cellar.hub.websockets:44406";
    }

  }

  private saveWorkflow() {

    this.item.parameters[0] = this.workflowName;
    this.item.parameters[1] = this.senzorID;
    this.item.parameters[2] = this.topic;
    this.item.parameters[3] = this.room;
    this.item.parameters[4] = this.MqttUrl;
    this.item.parameters[5] = this.websocketUrl;

    console.log(this.item);

    if (this.validations.length == 0) {

      //emit output  
      this.onSave.emit(this.item);

    }
  }


  private deleteWorkflow() {
    this.onDelete.emit(this.item);
  }

  private cancelWorkflow() {
    // go in router history back
    this.onCancel.emit();
  }




  //*********************************/
  //STATE
  //*********************************/

  public selectState(e: any) {
    var aaa = e.srcElement.innerHTML.toLowerCase();
    if (aaa === "new") {
      this.item.state = "1";



      jQuery("#new").removeClass();
      jQuery("#approved").removeClass();
      jQuery("#forbidden").removeClass();

      jQuery("#new").addClass("btn btn-warning");
      jQuery("#approved").addClass("btn");
      jQuery("#forbidden").addClass("btn");
    }
    else if (aaa === "approved") {
      this.item.state = "2";

      jQuery("#new").removeClass();
      jQuery("#approved").removeClass();
      jQuery("#forbidden").removeClass();

      jQuery("#new").addClass("btn");
      jQuery("#approved").addClass("btn btn-success");
      jQuery("#forbidden").addClass("btn");
    }
    else if (aaa === "forbidden") {
      this.item.state = "3";

      jQuery("#new").removeClass();
      jQuery("#approved").removeClass();
      jQuery("#forbidden").removeClass();

      jQuery("#new").addClass("btn");
      jQuery("#approved").addClass("btn");
      jQuery("#forbidden").addClass("btn btn-danger");
    }


  }



  generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };


}
