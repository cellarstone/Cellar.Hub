import { Component, OnInit } from '@angular/core';
import { ApplicationState } from 'app/state/state/application.state';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RouterActions from 'app/state/actions/router.actions';
import { LoadAllCellarWorkflowsAction } from 'app/state/actions/workflow.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'workflow-list',
  templateUrl: './workflow-list.html',
  styleUrls: ['./workflow-list.scss']
})
export class WorkflowList implements OnInit {

  items$: Observable<CellarWorkflow[]>;

    constructor(private store: Store<ApplicationState>, private router: Router) {
        this.items$ = this.store.select(mapWorkflowsFromState);
    }

    ngOnInit() {
        this.store.dispatch(new LoadAllCellarWorkflowsAction())
    }

    // newWorkflow() {
    //     this.store.dispatch(new RouterActions.Go({
    //         path: ['workflow/' + 0]
    //     }));
    // }

    newWorkflow() {
        this.router.navigate(['workflow', 0 ,'new']);
    }

    selectWorkflow(item: CellarWorkflow){
        this.store.dispatch(new RouterActions.Go({
            path: ['workflow/' + item.id]
        }));
    }

}


function mapWorkflowsFromState(state: ApplicationState): CellarWorkflow[]{
  if (state.storeData == undefined) {
      return undefined;
  }

  return state.storeData.workflows;
} 
