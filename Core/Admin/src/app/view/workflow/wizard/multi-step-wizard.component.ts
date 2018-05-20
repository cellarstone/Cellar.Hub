import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
import { Observable } from 'rxjs';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { LoadCellarWorkflowAction, SaveCellarWorkflowAction, CheckCellarWorkflowAction } from 'app/state/actions/workflow.actions';

import { ChipsModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-multi-step-wizard',
  templateUrl: './multi-step-wizard.component.html',
  styleUrls: ['./multi-step-wizard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultiStepWizardComponent implements OnInit {

  item$: Observable<CellarWorkflow>;
  actualStatus$: Observable<string>;

  stepsItems: MenuItem[];

  displayStep: number;

  triggerTypes: SelectItem[];
  selectedTriggerType: string;

  workflowTypes: SelectItem[];
  selectedWorkflowType: string;

  objectKeys = Object.keys;

  selectedTags: string[];

  triggerType: any;
  triggerParams: any;
  triggerParamValue: any;

  workflowType: any;
  workflowParams: any;
  // workflowParamsValue: any;

  private sub: Subscription;
  private id: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<ApplicationState>
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
        // this.selectedWorkflowType = item.workflowtype;
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

    this.store.dispatch(new LoadCellarWorkflowAction("0"));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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

  private setTrigger(item: CellarWorkflow) {
    this.item$.pipe(
      map((value) => {
        value.triggertype = item.triggertype;
        value.triggerparams = item.triggerparams;
        //return Observable.of(value)
      })
    );
    
    this.selectedTriggerType = null;
  }

  private setWorkflow(item: CellarWorkflow) {
    this.item$.pipe(
      map((value) => {
      value.workflowtype = item.workflowtype;
      value.workflowparams = item.workflowparams;
      //return Observable.of(value)
    }));
    
    this.selectedWorkflowType = null;
    //this.store.dispatch(new SaveCellarWorkflowAction(item));
  }

  displayPrevious() {
    this.displayStep--;
  }

  displayNext() {
    this.displayStep++;

    if (this.displayStep === 3) {
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
      });

      this.triggerType = itemResult.triggertype;
      this.triggerParams = itemResult.triggerparams;

      this.workflowType = itemResult.workflowtype;
      this.workflowParams = itemResult.workflowparams;
    }
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

  // console.log(state.uiState.selectedWorkflow)

  return state.uiState.selectedWorkflow;
}