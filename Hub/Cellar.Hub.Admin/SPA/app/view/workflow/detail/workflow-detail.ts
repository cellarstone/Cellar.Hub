import { Component, OnInit } from '@angular/core';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
import * as RouterActions from 'app/state/actions/router.actions';
import { LoadCellarWorkflowAction, SaveCellarWorkflowAction, DeleteCellarWorkflowAction, RunCellarWorkflowAction, StopCellarWorkflowAction, CheckProcessWorkflowAction } from 'app/state/actions/workflow.actions';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-workflow-detail',
  templateUrl: './workflow-detail.html',
  styleUrls: ['./workflow-detail.scss']
})
export class WorkflowDetail implements OnInit {

  types: SelectItem[];
  selectedType: string;

  item$: Observable<CellarWorkflow>;
  actualProcess$: Observable<string>;

  private sub: any;
  private pid: string;
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<ApplicationState>) {

    this.types = [];
    this.types.push({ label: 'Select Type', value: null });
    // this.types.push({ label: 'Cancel Meeting', value: 'cancelmeeting' });
    // this.types.push({ label: 'Save to Fluentd', value: 'savetofluentd' });
    this.types.push({ label: 'Save to Prometheus', value: 'savetoprometheus' });
    this.types.push({ label: 'Send to Websocket', value: 'sendtowebsocket' });
    // this.types.push({ label: 'Test workflow1', value: 'workflow1' });
    // this.types.push({ label: 'Test workflow2', value: 'workflow2' });


    this.item$ = this.store.select(mapWorkflowFromState);
    this.actualProcess$ = this.store.select(mapActualProcessFromState);


    this.item$.subscribe((item: CellarWorkflow) => {
      if (item) {
        this.selectedType = item.type;
        this.pid = item.pid;
        this.id = item.id;
      }
    });

  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

      let id = params['id']; // (+) converts string 'id' to a number
      this.store.dispatch(new LoadCellarWorkflowAction(id));

    });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  //*********************************/
  /* WORKFLOW */
  //*********************************/

  private saveWorkflow(item: CellarWorkflow) {

    item.type = this.selectedType;

    console.log(item);

    this.store.dispatch(new SaveCellarWorkflowAction(item));
  }


  private deleteWorkflow(item: CellarWorkflow) {
    this.store.dispatch(new DeleteCellarWorkflowAction(item));
  }

  private cancelWorkflow() {
    this.store.dispatch(new RouterActions.Back());
  }



  private checkProcessWorkflow(pid: string) {
    this.store.dispatch(new CheckProcessWorkflowAction(this.pid));
  }

  private runWorkflow() {
    this.store.dispatch(new RunCellarWorkflowAction(this.id));
  }


  private stopWorkflow(id: string) {
    this.store.dispatch(new StopCellarWorkflowAction(this.id));
  }


}



function mapActualProcessFromState(state: ApplicationState): string {
  if (state.uiState == undefined) {
    return undefined;
  }

  return state.uiState.actualProcess;
}

function mapWorkflowFromState(state: ApplicationState): CellarWorkflow {
  if (state.uiState == undefined) {
    return undefined;
  }

  return state.uiState.selectedWorkflow;
}