import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { Message, SelectItem } from 'primeng/primeng';

declare var jQuery: any;


class DefaultSenzorParameters {
  websocketroom: string
  influxtopic: string
}

@Component({
  selector: 'workflow-defaultsenzor',
  templateUrl: './defaultsenzor.component.html',
  styleUrls: ['./defaultsenzor.component.scss']
})
export class DefaultSenzorWorkflowComponent implements OnInit {

  @Input()
  item: CellarWorkflow;

  @Output() onSave = new EventEmitter<CellarWorkflow>();

  validations: Message[] = [];
  messagesToUser: Message[] = [];

  //PARAMETERS
  websocketroom: string;
  influxtopic: string;


  ngOnInit() {

    if(this.item.id != ''){
    let asdf = <DefaultSenzorParameters>this.item.workflowparams;
    this.websocketroom = asdf.websocketroom;
    this.influxtopic = asdf.influxtopic;
    }

  }

  saveWorkflow() {


    if (this.validations.length == 0) {

      //SAVE PARAMETERS
      let temp = new DefaultSenzorParameters();
      temp.websocketroom = this.websocketroom;
      temp.influxtopic = this.influxtopic;
      this.item.workflowparams = temp;
      this.item.workflowtype = "defaultsenzor";


      //emit output  
      this.onSave.emit(this.item);

    }
  }

}
