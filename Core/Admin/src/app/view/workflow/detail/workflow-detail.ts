import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
import * as RouterActions from 'app/state/actions/router.actions';
import { LoadCellarWorkflowAction, SaveCellarWorkflowAction, DeleteCellarWorkflowAction, RunCellarWorkflowAction, StopCellarWorkflowAction, CheckCellarWorkflowAction } from 'app/state/actions/workflow.actions';

import { SelectItem } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';

import { TweenMax } from 'gsap';
import { map } from 'rxjs/operators';

declare let $: any;
declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power4: any;
declare let Power0: any;


@Component({
  selector: 'app-workflow-detail',
  templateUrl: './workflow-detail.html',
  styleUrls: ['./workflow-detail.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkflowDetail implements OnInit {

  item$: Observable<CellarWorkflow>;
  actualStatus$: Observable<string>;

  stepsItems: MenuItem[];

  displayStep: number;

  workflowTypes: SelectItem[];
  selectedWorkflowType: string;

  triggerTypes: SelectItem[];
  selectedTriggerType: string;

  triggerType: any;
  triggerParams: any;

  workflowType: any;
  workflowParams: any;

  selectedTags: string[];

  private sub: any;
  private id: string;

  deleteModalIsOpen: boolean = false;
  allowEdit: boolean = false;

  objectKeys = Object.keys;


  constructor(
    private route: ActivatedRoute,
    private store: Store<ApplicationState>,
  ) {

    this.workflowTypes = [];
    this.workflowTypes.push({ label: 'Select Type', value: null });
    this.workflowTypes.push({ label: 'X to MQTT', value: 'rand2mqtt' });
    this.workflowTypes.push({ label: 'Test 1 workflow', value: 'test1' });
    this.workflowTypes.push({ label: 'Test exception', value: 'testexception' });
    this.workflowTypes.push({ label: 'Default for senzor', value: 'defaultsenzor' });

    this.triggerTypes = [];
    this.triggerTypes.push({ label: 'Select Type', value: null });
    this.triggerTypes.push({ label: 'Time', value: 'time' });
    this.triggerTypes.push({ label: 'Mqtt', value: 'mqtt' });

    this.item$ = this.store.select(mapWorkflowFromState);
    this.actualStatus$ = this.store.select(mapActualStatusFromState);


    this.item$.subscribe((item: CellarWorkflow) => {
      if (item) {
        this.selectedWorkflowType = item.workflowtype;
        this.selectedTriggerType = item.triggertype;
        this.id = item.id;
        this.selectedTags = item.tags;

        this.triggerType = item.triggertype;
        this.triggerParams = item.triggerparams;
        this.workflowType = item.workflowtype;
        this.workflowParams = item.workflowparams;
      }
    });

  }
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {

      let id = params['id']; // (+) converts string 'id' to a number
      this.store.dispatch(new LoadCellarWorkflowAction(id));

      if (id != '0') {
        this.store.dispatch(new CheckCellarWorkflowAction(id));
      }

    });

    this.stepsItems = [{
      label: 'Tags',
      command: (event: any) => this.displayStep = 0
    }, {
      label: 'Trigger',
      command: (event: any) => this.displayStep = 1
    }, {
      label: 'Workflow',
      command: (event: any) => this.displayStep = 2
    }, {
      label: 'Confirmation',
      command: (event: any) => this.displayStep = 3
    }];
    this.displayStep = 0;


  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  bulbRed() {
    TweenMax.to('#bulb', .2, { fill: 'af241f', ease: Power4.easeInOut });
  }

  bulbGreen() {
    TweenMax.to('#bulb', .2, { fill: '#88E188', ease: Power4.easeInOut });
  }

  bulbYellow() {
    TweenMax.to('#bulb', .2, { fill: '#f9ba48', ease: Power4.easeInOut });
  }

  leftLine() {
    let leftLineTL = new TimelineMax();

    let leftLine = document.getElementById("line-left");
    TweenMax.set(leftLine, { stroke: '#add8e6', strokeDasharray: 429.47, strokeDashoffset: 429.47 });

    leftLineTL
      .to(leftLine, 2, { strokeDashoffset: 0, ease:Power0.easeNone })
    ;
    return leftLineTL;
  }

  middleLine() {
    let middleLineTL = new TimelineMax();

    let middleLine = document.getElementById("line-middle");
    TweenMax.set(middleLine, { stroke: '#add8e6', strokeDasharray: 259.47, strokeDashoffset: 259.47 });

    middleLineTL
      .to(middleLine, 1.5, { strokeDashoffset: 0, ease:Power0.easeNone })
    ;
    return middleLineTL;
  }

  rightLine() {
    let rightLineTL = new TimelineMax();

    let rightLine = document.getElementById("line-right");
    TweenMax.set(rightLine, { stroke: '#add8e6', strokeDasharray: 429.17, strokeDashoffset: 429.17 });

    rightLineTL
      .to(rightLine, 3, { strokeDashoffset: 0, ease:Power0.easeNone })
    ;
    return rightLineTL;
  }

  bulbFlash() {
    let bulb = new TimelineMax();
    bulb
      .add('reset')
      .set('#bulb', { fill: '#ededed'}, 'reset')
      .set('#flash > .cls-5b', {fill: 'transparent'}, 'reset')

      .add('startLines')
      .add(this.leftLine(), 'startLines')
      .add(this.middleLine(), 'startLines')
      .add(this.rightLine(), 'startLines')
      // .call(this.bulbYellow)
      .add('startBulb')
      .to('#bulb', .5, { fill: '#f9ba48', ease:Power4.easeOut}, 'startBulb')
      .to('#bulb', .1, { fill: '#ededed', repeat: 7, yoyo: true, ease: Power4.easeInOut })
      
      .to('#flash > .cls-5b', .2, { fill: '#f9ba48', ease: Power4.easeInOut })
      // .add('red')
      // .call(this.bulbRed(), 'red');
      ;
    return bulb;
  }

  //*********************************/
  /* WORKFLOW */
  //*********************************/

  private setWorkflow(item: CellarWorkflow) {

    this.item$.pipe(
      map((value) => {

        value.workflowtype = item.workflowtype;
        value.workflowparams = item.workflowparams;
  
        //return Observable.of(value)
      })
    );

    this.selectedWorkflowType = null;

    //this.store.dispatch(new SaveCellarWorkflowAction(item));
  }

  private setTrigger(item: CellarWorkflow) {

    this.item$.pipe(
      map((value) => {

      value.triggertype = item.triggertype;
      value.triggerparams = item.triggerparams;

      //return Observable.of(value)
    }));

    this.selectedTriggerType = null;
  }


  private saveWorkflow() {

    let itemResult = new CellarWorkflow();

    this.item$.subscribe((item: CellarWorkflow) => {
      if (item) {
        itemResult.id = item.id;
        itemResult.workflowtype = item.workflowtype;
        itemResult.workflowparams = item.workflowparams;
        itemResult.triggertype = item.triggertype;
        itemResult.triggerparams = item.triggerparams;
        itemResult.tags = this.selectedTags;
      }

    })

    this.store.dispatch(new SaveCellarWorkflowAction(itemResult))

  }


  private deleteWorkflow() {
    this.store.dispatch(new DeleteCellarWorkflowAction(this.id));
  }

  private cancelWorkflow() {
    this.store.dispatch(new RouterActions.Back());
  }



  private runWorkflow() {
    this.store.dispatch(new RunCellarWorkflowAction(this.id));
  }

  private checkWorkflow() {
    this.store.dispatch(new CheckCellarWorkflowAction(this.id));






    // CALLING WORKFLOW ANIMATION HERE 
    this.bulbFlash();





  }

  private stopWorkflow() {
    this.store.dispatch(new StopCellarWorkflowAction(this.id));
  }

  private editWorkflow() {
    this.allowEdit = true;
  }

  private cancelEditWorkflow() {
    this.allowEdit = false;
  }

}



function mapActualStatusFromState(state: ApplicationState): string {
  if (state.uiState == undefined) {
    return undefined;
  }

  return state.uiState.actualStatus;
}

function mapWorkflowFromState(state: ApplicationState): CellarWorkflow {
  if (state.uiState == undefined) {
    return undefined;
  }

  // console.log(state.uiState.selectedWorkflow);

  return state.uiState.selectedWorkflow;
}