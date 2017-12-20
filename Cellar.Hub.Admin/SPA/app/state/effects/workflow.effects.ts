import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { WorkflowService } from 'app/service/workflow.service';
import { CellarDTO } from 'app/entities/http/CellarDTO';
import * as RouterActions from 'app/state/actions/router.actions';
import { LoadRunningProcessesSuccessAction, LOAD_RUNNING_PROCESSES, GET_ACTUAL_DIRECTORY, GetActualDirectoryActionSuccessAction } from 'app/state/actions/workflow.actions';

@Injectable()
export class WorkflowEffects {

    constructor(private actions$: Actions, private workflowservice: WorkflowService) { }

    @Effect() runningProcessesEffect$: Observable<Action> = this.actions$
        .ofType(LOAD_RUNNING_PROCESSES)
        .switchMap(() => this.workflowservice.GetRunningProcesses())
        .map(items => new LoadRunningProcessesSuccessAction(<string[]>items.data));

        @Effect() actualDirectoryEffect$: Observable<Action> = this.actions$
        .ofType(GET_ACTUAL_DIRECTORY)
        .switchMap(() => this.workflowservice.GetActualDirectory())
        .map(items => new GetActualDirectoryActionSuccessAction(<string[]>items.data));

   
}
