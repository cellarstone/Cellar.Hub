import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { IoTService } from 'app/service/iot.service';
import { LOAD_CELLAR_SENZOR, LoadCellarSenzorSuccessAction, SAVE_CELLAR_SENZOR, DELETE_CELLAR_SENZOR, LOAD_ALL_CELLAR_SENZORS, LoadAllCellarSenzorsSuccessAction, LOAD_CELLAR_SENZORS, LoadCellarSenzorsSuccessAction, DeleteCellarSenzorFailureAction } from 'app/state/actions/senzor.actions';
import { CellarSenzor } from 'app/entities/CellarSenzor';
import { CellarDTO } from 'app/entities/http/CellarDTO';
import * as RouterActions from 'app/state/actions/router.actions';
import { WorkflowService } from 'app/service/workflow.service';
import { CellarWorkflow } from '../../entities/CellarWorkflow';

@Injectable()
export class SenzorEffects {

  constructor(private actions$: Actions, 
              private iotservice: IoTService,
              private workflowservice: WorkflowService) { }

  @Effect() loadAllSensorsEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_ALL_CELLAR_SENZORS)
    .switchMap(() => this.iotservice.GetAllCellarSenzors())
    .map(items => new LoadAllCellarSenzorsSuccessAction(<CellarSenzor[]>items.data));

  @Effect() loadSenzorsEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_CELLAR_SENZORS)
    .map(toPayload)
    .switchMap((payload) => this.iotservice.GetCellarSenzors(payload))
    .map(items => new LoadCellarSenzorsSuccessAction(<CellarSenzor[]>items.data));

  @Effect() loadSenzorEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_CELLAR_SENZOR)
    .map(toPayload)
    .switchMap((payload) => this.iotservice.GetCellarSenzor(payload))
    .map(item => new LoadCellarSenzorSuccessAction(<CellarSenzor>item.data));

  @Effect() saveSenzorEffect$: Observable<Action> = this.actions$
    .ofType(SAVE_CELLAR_SENZOR)
    .map(toPayload)
    .switchMap((payload) => {

      //SAVE INTO DB
      let item = <CellarSenzor>payload;
      if (item.id != undefined) {
        return this.iotservice.UpdateCellarSenzor(item)
          .switchMap((val) => {

            let temp = <CellarSenzor>val;

            return Observable.of(temp);

          });
      }
      else {
        return this.iotservice.AddCellarSenzor(item);
      }

    })
    .map((payload) => {

      //CREATE AND RUN DEFAULT SENZOR WORKFLOWS
      let item = <CellarSenzor>payload;
      console.log(item);

      this.workflowservice.CreateAndRunDefaultSenzorWorkflows(item.id)
                                        .subscribe((item2) => {
                                            console.log("GGGGGG");
                                            console.log(item2);
                                        });

      console.log("GGGGGG2");
      console.log(item);

      return item;
    })
    .map(item => {
      let temp = <CellarSenzor>item;

      return new RouterActions.Go({
        path: ['senzor/' + temp.id]
      })
    });

  @Effect() deleteSenzorEffect$: Observable<Action> = this.actions$
    .ofType(DELETE_CELLAR_SENZOR)
    .map(toPayload)
    .switchMap((payload) => {

      //CREATE AND RUN DEFAULT SENZOR WORKFLOWS
      let item = <CellarSenzor>payload;
      //console.log(item);

      //let wrk = new CellarDTO();

      return this.workflowservice.StopAndDeleteDefaultSenzorWorkflows(item.id)
                                        .switchMap((item2) => {
                                            // wrk = item2
                                            console.log("StopAndDeleteDefaultSenzorWorkflows");
                                            console.log(item2);


                                            return Observable.of({id: item.id, workflow: item2})
                                        });

      // console.log("GGGGGG2");
      // console.log(item);

      // return Observable.of({id: item.id, workflow: wrk});
    })
    .map(item => {

      console.log("map : ");
      console.log(item);

      if (item.workflow.result != "OK") {
        return "-1"
      }


      return item.id;

    })
    .flatMap((payload2: string) => {

      console.log("flatMap : " + payload2);

      let itemID = payload2;
      let isOK = true;

      // Observable.zip(
      //   this.iotservice.RemoveCellarSenzor(item.id),
      //   this.iotservice.RemoveCellarSenzor(item.id),
      //   this.iotservice.RemoveCellarSenzor(item.id)
      // )
      // .subscribe(([data1, data2, data3]) => {

      //   let dat1 = <CellarDTO>data1;
      //   let dat2 = <CellarDTO>data2;
      //   let dat3 = <CellarDTO>data3;

      //   if(!dat1.isOK){
      //     isOK = false;
      //   }
      //   if(!dat2.isOK){
      //     isOK = false;
      //   }
      //   if(!dat3.isOK){
      //     isOK = false;
      //   }

      // });

      // if(!isOK){
      //   return 
      // } 

      if (itemID == "-1") {
        let asdf = new CellarDTO();
        asdf.result = "senzor have running workflows, please resolve that before delete senzor"

        return Observable.of(asdf);
      } else {

        return this.iotservice.RemoveCellarSenzor(itemID);
      }


    })
    .map(item => {

      console.log("map : ");
      console.log(item);

      // if (item.result == "OK") {
        return new RouterActions.Back();
      // } else {
      //   return  new DeleteCellarSenzorFailureAction(item.result);
      // }
      

    });


}
