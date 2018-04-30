import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { WorkflowService } from 'app/service/workflow.service';
import { CellarDTO } from 'app/entities/http/CellarDTO';
import * as RouterActions from 'app/state/actions/router.actions';
import { LOAD_ALL_CELLAR_WORKFLOWS, LoadAllCellarWorkflowsSuccessAction, LOAD_CELLAR_WORKFLOW, LoadCellarWorkflowSuccessAction, SAVE_CELLAR_WORKFLOW, DELETE_CELLAR_WORKFLOW, RUN_CELLAR_WORKFLOW, STOP_CELLAR_WORKFLOW, CheckCellarWorkflowSuccessAction, LOAD_CELLAR_WORKFLOWS, LoadCellarWorkflowsSuccessAction, RUN_ALL_CELLAR_WORKFLOWS, RunAllCellarWorkflowsSuccessAction, STOP_ALL_CELLAR_WORKFLOWS, StopAllCellarWorkflowsSuccessAction, CHECK_CELLAR_WORKFLOW, RunCellarWorkflowSuccessAction, StopCellarWorkflowSuccessAction } from 'app/state/actions/workflow.actions';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';

@Injectable()
export class WorkflowEffects {

    constructor(private actions$: Actions, private workflowservice: WorkflowService) { }

    @Effect() loadAllWorkflowsEffect$: Observable<Action> = this.actions$
        .ofType(LOAD_ALL_CELLAR_WORKFLOWS)
        .switchMap(() => {
            var aaa = this.workflowservice.GetAllCellarWorkflows();

            console.log(aaa)

            return aaa;
        })
        .map(items => new LoadAllCellarWorkflowsSuccessAction(<CellarWorkflow[]>items.data));


    @Effect() loadWorkflowsEffect$: Observable<Action> = this.actions$
        .ofType(LOAD_CELLAR_WORKFLOWS)
        .map(toPayload)
        .switchMap((payload) => {

            return this.workflowservice.GetCellarWorkflows(payload)
                .switchMap((val) => {

                    console.log(val);

                    return Observable.of(val);

                });
        })
        .map(items => new LoadCellarWorkflowsSuccessAction(<CellarWorkflow[]>items.data));



    @Effect() loadWorkflowEffect$: Observable<Action> = this.actions$
        .ofType(LOAD_CELLAR_WORKFLOW)
        .map(toPayload)
        .switchMap((payload) => {

            return this.workflowservice.GetCellarWorkflow(payload)
                .switchMap((val) => {

                    console.log(val);

                    return Observable.of(val);

                });
        })
        .map(item => new LoadCellarWorkflowSuccessAction(<CellarWorkflow>item.data));


    @Effect() saveWorkflowEffect$: Observable<Action> = this.actions$
        .ofType(SAVE_CELLAR_WORKFLOW)
        .map(toPayload)
        .switchMap((payload) => {

            let item = <CellarWorkflow>payload;
            console.log(item.id)

            console.log(item)


            if (item.id != undefined && item.id != '') {
                return this.workflowservice.UpdateCellarWorkflow(item)
                    .switchMap((val) => {

                        let asdf = new CellarDTO();
                        asdf.data = item;

                        return Observable.of(asdf);

                    });
            }
            else {
                return this.workflowservice.AddCellarWorkflow(item);
            }

        })
        .map(item => {

            console.log(item);

            let temp = <CellarWorkflow>item.data;

            return new RouterActions.Go({
                path: ['workflow/' + temp.id]
            })
        });

    @Effect() deleteWorkflowEffect$: Observable<Action> = this.actions$
        .ofType(DELETE_CELLAR_WORKFLOW)
        .map(toPayload)
        .switchMap((payload) => {

            
            // let isOK = true;


            // TODO - WILL BE DONE !!!!!

            // Observable.zip(
            //     this.workflowservice.StopCellarWorkflow(item.id),
            //     this.workflowservice.RemoveCellarWorkflow(item.id)
            // )
            //     .subscribe(([data1, data2]) => {

            //         let dat1 = <CellarDTO>data1;
            //         let dat2 = <CellarDTO>data2;

            //         if (!dat1.isOK) {
            //             isOK = false;
            //         }
            //         if (!dat2.isOK) {
            //             isOK = false;
            //         }

            //     });

            // if (!isOK) {
            //     return
            // }

            return this.workflowservice.RemoveCellarWorkflow(payload);
        })
        .map(item => {

            return new RouterActions.Back();

        });




    //RUN
    @Effect() runWorkflowEffect$: Observable<Action> = this.actions$
        .ofType(RUN_CELLAR_WORKFLOW)
        .map(toPayload)
        .switchMap((payload) => {

            return this.workflowservice.RunCellarWorkflow(payload)
                .switchMap((val) => {

                    let item = <CellarDTO>val;

                    console.log(item.result);

                    return Observable.of(item.result);

                });
        })
        .map(item => new RunCellarWorkflowSuccessAction(item));

    //STOP
    @Effect() stopWorkflowEffect$: Observable<Action> = this.actions$
        .ofType(STOP_CELLAR_WORKFLOW)
        .map(toPayload)
        .switchMap((payload) => {

            return this.workflowservice.StopCellarWorkflow(payload)
                .switchMap((val) => {

                    let item = <CellarDTO>val;

                    console.log(item.result);

                    return Observable.of(item.result);

                });
        })
        .map(item => new StopCellarWorkflowSuccessAction(item));


    //CHECK PROCESS
    @Effect() checkCellarWorkflowEffect$: Observable<Action> = this.actions$
        .ofType(CHECK_CELLAR_WORKFLOW)
        .map(toPayload)
        .switchMap((payload) => {

            return this.workflowservice.CheckCellarWorkflow(payload)
                .switchMap((val) => {



                    let item = <CellarDTO>val;

                    console.log(item.result);

                    return Observable.of(item.result);

                });
        })
        .map(item => {
            return new CheckCellarWorkflowSuccessAction(item)
        });










    /*********************************************************************************/
    /*                                  CLI                                          */
    /*********************************************************************************/

    //RUN ALL WORKFLOWS
    @Effect() runAllWorkflowEffect$: Observable<Action> = this.actions$
        .ofType(RUN_ALL_CELLAR_WORKFLOWS)
        .switchMap(() => this.workflowservice.RunAllCellarWorkflows())
        .map(items => new RunAllCellarWorkflowsSuccessAction(<string[]>items.data));


    //STOP ALL WORKFLOWS
    @Effect() stopAllWorkflowEffect$: Observable<Action> = this.actions$
        .ofType(STOP_ALL_CELLAR_WORKFLOWS)
        .switchMap(() => this.workflowservice.StopAllCellarWorkflows())
        .map(items => new StopAllCellarWorkflowsSuccessAction(<string[]>items.data));


}
