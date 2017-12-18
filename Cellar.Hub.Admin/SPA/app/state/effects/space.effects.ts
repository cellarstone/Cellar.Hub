import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { IoTService } from 'app/service/iot.service';
import { LOAD_CELLAR_SPACES, LoadCellarSpacesSuccessAction, SaveCellarSpaceAction, LOAD_CELLAR_SPACE, LoadCellarSpaceSuccessAction, LOAD_ALL_CELLAR_SPACES, LoadAllCellarSpacesSuccessAction, LoadCellarSpacesAction, SAVE_CELLAR_SPACE } from 'app/state/actions/space.actions';
import { CellarSpace } from 'app/entities/CellarSpace';
import { CellarDTO } from 'app/entities/http/CellarDTO';
import * as RouterActions from 'app/state/actions/router.actions';
import { LoadCellarSenzorsAction } from 'app/state/actions/senzor.actions';

@Injectable()
export class SpaceEffects {

  constructor(private actions$: Actions, private iotservice: IoTService) { }

  @Effect() loadAllSpacesEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_ALL_CELLAR_SPACES)
    .switchMap(() => this.iotservice.GetAllCellarSpaces())
    .map(items => new LoadAllCellarSpacesSuccessAction(<CellarSpace[]>items.data));


  @Effect() loadSpacesEffect$: Observable<Action> = this.actions$
    .ofType(LOAD_CELLAR_SPACES)
    .map(toPayload)
    .switchMap((payload) => this.iotservice.GetCellarSpaces(payload))
    .map(items => new LoadCellarSpacesSuccessAction(<CellarSpace[]>items.data));


  @Effect() loadSpaceEffect$ = this.actions$
    .ofType(LOAD_CELLAR_SPACE)
    .map(toPayload)
    .switchMap((payload) => {

      return this.iotservice.GetCellarSpace(payload).switchMap(data => {

        console.log(data);

        return Observable.of(data);

      });

    })
    .flatMap((item: CellarDTO) => {

      let data = <CellarSpace>item.data;
      let bbb = new CellarSpace().New(data);

      if (bbb.id == undefined) {
        return [
          new LoadCellarSpaceSuccessAction(bbb)
        ]
      }
      else {
        return [
          new LoadCellarSpaceSuccessAction(bbb),
          new LoadCellarSpacesAction(bbb.getSubPath()),
          new LoadCellarSenzorsAction(bbb.getSubPath())
        ]
      }

    });



  @Effect() saveSpaceEffect$: Observable<Action> = this.actions$
    .ofType(SAVE_CELLAR_SPACE)
    .map(toPayload)
    .switchMap((payload) => {


      let item = <CellarSpace>payload;

      console.log(payload);
      console.log(item);

      if (item.id != undefined) {
        return this.iotservice.UpdateCellarSpace(item)
          .switchMap((val) => {

            let asdf = new CellarDTO();
            asdf.data = item;

            return Observable.of(asdf);

          });
      }
      else {
        return this.iotservice.AddCellarSpace(item);
      }

    }).map(item => {

      console.log(item);

      let temp = <CellarSpace>item.data;

      return new RouterActions.Go({
        path: ['space/' + temp.id]
      })
    });

}

