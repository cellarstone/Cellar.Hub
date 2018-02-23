import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { Message, SelectItem } from 'primeng/primeng';

declare var jQuery: any;


class TestExceptionParameters {
  messagecount: string
  mqtttopic: string
}

@Component({
  selector: 'workflow-testexception',
  templateUrl: './testexception.component.html',
  styleUrls: ['./testexception.component.scss']
})
export class TestExceptionWorkflowComponent implements OnInit {

  @Input()
  item: CellarWorkflow;

  @Output() onSave = new EventEmitter<CellarWorkflow>();
  // @Output() onCancel = new EventEmitter();
  // @Output() onDelete = new EventEmitter<CellarWorkflow>();

  validations: Message[] = [];
  messagesToUser: Message[] = [];

  //PARAMETERS
  workflowName: string;
  messagescount: string;
  mqtttopic: string;
  tags: string[];


  constructor() {
  }

  ngOnInit() {

    // console.log(this.item);
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

    if(this.item.id != ''){
    let asdf = <TestExceptionParameters>this.item.workflowparams;

    this.messagescount = asdf.messagecount;
    this.mqtttopic = asdf.mqtttopic;
    }

    // console.log(this.workflowName);
   
  }




  saveWorkflow() {


    // this.item.parameters[0] = this.workflowName;
    

    // console.log(this.item);

    if (this.validations.length == 0) {

//SAVE PARAMETERS
let temp = new TestExceptionParameters();
temp.messagecount = this.messagescount;
temp.mqtttopic = this.mqtttopic;
this.item.workflowparams = temp;

this.item.workflowtype = "testexception";

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
