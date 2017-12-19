import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { IoTService } from 'app/service/iot.service';
import { LOAD_CELLAR_SENZOR, LoadCellarSenzorSuccessAction, SAVE_CELLAR_SENZOR, DELETE_CELLAR_SENZOR, LOAD_ALL_CELLAR_SENZORS, LoadAllCellarSenzorsSuccessAction, LOAD_CELLAR_SENZORS, LoadCellarSenzorsSuccessAction } from 'app/state/actions/senzor.actions';
import { CellarSenzor } from 'app/entities/CellarSenzor';
import { CellarDTO } from 'app/entities/http/CellarDTO';
import * as RouterActions from 'app/state/actions/router.actions';

@Injectable()
export class SenzorEffects {

  constructor(private actions$: Actions, private iotservice: IoTService) { }

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
    .switchMap((payload) => {



      return this.iotservice.GetCellarSenzor(payload).switchMap(data => {

        console.log(data);

        return Observable.of(data);

      });



    })
    .map(item => new LoadCellarSenzorSuccessAction(<CellarSenzor>item.data));


  @Effect() saveSenzorEffect$: Observable<Action> = this.actions$
    .ofType(SAVE_CELLAR_SENZOR)
    .map(toPayload)
    .switchMap((payload) => {

      let item = <CellarSenzor>payload;

      console.log(payload);
      console.log(item);

      if (item.id != undefined) {
        return this.iotservice.UpdateCellarSenzor(item)
          .switchMap((val) => {

            let asdf = new CellarDTO();
            asdf.data = item;

            return Observable.of(asdf);

          });
      }
      else {
        return this.iotservice.AddCellarSenzor(item);
      }

    })
    .map(item => {

      console.log(item);

      let temp = <CellarSenzor>item.data;

      return new RouterActions.Go({
        path: ['senzor/' + temp.id]
      })
    });

  @Effect() deleteSenzorEffect$: Observable<Action> = this.actions$
    .ofType(DELETE_CELLAR_SENZOR)
    .map(toPayload)
    .switchMap((payload) => {

      let item = <CellarSenzor>payload;

      let isOk1 = false;
      let isOk2 = false;
      let isOk3 = false;

      Observable.zip(
        this.iotservice.RemoveCellarSenzor(item.id),
        this.iotservice.RemoveCellarSenzor(item.id),
        this.iotservice.RemoveCellarSenzor(item.id)
      )
      .subscribe(([data1, data2, data3]) => {

        let dat1 = <CellarDTO>data1;
        let dat2 = <CellarDTO>data2;
        let dat3 = <CellarDTO>data3;

        if(dat1.isOK){
          isOk1 = true;
        }

        if(dat2.isOK){
          isOk1 = true;
        }

        if(dat3.isOK){
          isOk1 = true;
        }

      });

      if(isOk1 && isOk2 && isOk3){
        return 
      } else {
        
      }


      return this.iotservice.RemoveCellarSenzor(item.id);






    })
    .map(item => {

      return new RouterActions.Back();

    });


}
