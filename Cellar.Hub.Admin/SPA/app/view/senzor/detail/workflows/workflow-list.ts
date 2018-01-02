import { Component, OnInit, Input } from '@angular/core';
import { ApplicationState } from 'app/state/state/application.state';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RouterActions from 'app/state/actions/router.actions';
import { LoadAllCellarWorkflowsAction, LoadCellarWorkflowsAction } from 'app/state/actions/workflow.actions';

@Component({
    selector: 'senzor-workflow-list',
    templateUrl: './workflow-list.html',
    styleUrls: ['./workflow-list.scss']
})
export class SenzorWorkflowList implements OnInit {

    @Input()
    private senzorName: string;


    items$: Observable<CellarWorkflow[]>;

    constructor(private store: Store<ApplicationState>) {
        this.items$ = this.store.select(mapWorkflowsFromState);
    }

    ngOnInit() {
        this.store.dispatch(new LoadCellarWorkflowsAction(this.senzorName))
    }

    newWorkflow() {
        this.store.dispatch(new RouterActions.Go({
            path: ['workflow/' + 0]
        }));
    }

    selectWorkflow(item: CellarWorkflow) {
        this.store.dispatch(new RouterActions.Go({
            path: ['workflow/' + item.id]
        }));
    }

}


function mapWorkflowsFromState(state: ApplicationState): CellarWorkflow[] {
    if (state.storeData == undefined) {
        return undefined;
    }

    return state.storeData.workflows;
} 
