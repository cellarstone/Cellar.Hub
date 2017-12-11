import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { IoTService } from 'app/service/iot.service';
import { LOAD_CELLAR_PLACES, LoadCellarPlacesSuccessAction, LOAD_CELLAR_SENZOR, LoadCellarSenzorSuccessAction, SAVE_CELLAR_SENZOR, DELETE_CELLAR_SENZOR, LOAD_CELLAR_SENZORS, LoadCellarSenzorsSuccessAction } from 'app/state/actions/actions';
import { CellarPlace } from 'app/entities/CellarPlace';
import { CellarSenzor } from 'app/entities/CellarSenzor';
import { CellarDTO } from 'app/entities/http/CellarDTO';
import * as RouterActions from 'app/state/actions/router-actions';

@Injectable()
export class EffectService {

  constructor(private actions$: Actions, private iotservice: IoTService) { }

  @Effect() placesEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_CELLAR_PLACES)
    .switchMap(() => this.iotservice.GetAllCellarPlaces())
    .map(items => new LoadCellarPlacesSuccessAction(<CellarPlace[]>items.data));


  @Effect() loadAllSensorsEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_CELLAR_SENZORS)
    .switchMap(() => this.iotservice.GetAllCellarSenzors())
    .map(items => new LoadCellarSenzorsSuccessAction(<CellarSenzor[]>items.data));

  @Effect() loadSenzorEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_CELLAR_SENZOR)
    .map(toPayload)
    .switchMap((payload) => {

      //new senzor
      if (payload == 0) {

        //create a new senzor
        var res = new CellarDTO();
        var aaa = new CellarSenzor();

        //set senzor state
        aaa.state = "1";

        res.data = aaa;

        return Observable.of(res);
      }
      //editing existing senzor   
      else {

        return this.iotservice.GetCellarSenzor(payload);
      }

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

      return this.iotservice.RemoveCellarSenzor(item.id);

    })
    .map(item => {

      return new RouterActions.Back();

    });


}
