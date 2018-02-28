import { Component, OnInit } from '@angular/core';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
import * as RouterActions from 'app/state/actions/router.actions';
import { LoadCellarWorkflowAction, SaveCellarWorkflowAction, DeleteCellarWorkflowAction, RunCellarWorkflowAction, StopCellarWorkflowAction, CheckCellarWorkflowAction } from 'app/state/actions/workflow.actions';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-workflow-detail',
  templateUrl: './workflow-detail.html',
  styleUrls: ['./workflow-detail.scss']
})
export class WorkflowDetail implements OnInit {

  workflowTypes: SelectItem[];
  selectedWorkflowType: string;

  triggerTypes: SelectItem[];
  selectedTriggerType: string;

  item$: Observable<CellarWorkflow>;
  actualStatus$: Observable<string>;

  selectedTags: string[];

  private sub: any;
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<ApplicationState>) {

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
      }
    });

  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

      let id = params['id']; // (+) converts string 'id' to a number
      this.store.dispatch(new LoadCellarWorkflowAction(id));

      if(id != '0'){
        this.store.dispatch(new CheckCellarWorkflowAction(id));
      }

    });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  //*********************************/
  /* WORKFLOW */
  //*********************************/

  private setWorkflow(item: CellarWorkflow) {

    this.item$.map((value) => {

      value.workflowtype = item.workflowtype;
      value.workflowparams = item.workflowparams;

      //return Observable.of(value)
    })

    this.selectedWorkflowType = null;

    //this.store.dispatch(new SaveCellarWorkflowAction(item));
  }

  private setTrigger(item: CellarWorkflow) {

    this.item$.map((value) => {

      value.triggertype = item.triggertype;
      value.triggerparams = item.triggerparams;

      //return Observable.of(value)
    })

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
  }

  private stopWorkflow() {
    this.store.dispatch(new StopCellarWorkflowAction(this.id));
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

  console.log(state.uiState.selectedWorkflow)

  return state.uiState.selectedWorkflow;
}