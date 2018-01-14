import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { IoTService } from 'app/service/iot.service';
import { LOAD_CELLAR_SPACES, LoadCellarSpacesSuccessAction, SaveCellarSpaceAction, LOAD_CELLAR_SPACE, LoadCellarSpaceSuccessAction, LOAD_ALL_CELLAR_SPACES, LoadAllCellarSpacesSuccessAction, LoadCellarSpacesAction, SAVE_CELLAR_SPACE, DELETE_CELLAR_SPACE, DELETE_CELLAR_SPACE_SUCCESS, DeleteCellarSpaceSuccessAction, DeleteCellarSpaceFailureAction } from 'app/state/actions/space.actions';
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




    @Effect() deleteSpaceEffect$: Observable<Action> = this.actions$
    .ofType(DELETE_CELLAR_SPACE)
    .map(toPayload)
    .switchMap((payload) => {

      let payld = <CellarSpace>payload;
      let item = new CellarSpace().New(payld);

      let isOk1 = false;
      let isOk2 = false;
      let isOk3 = false;
      let err = "";

      Observable.zip(
        this.iotservice.RemoveCellarSpace(item.id),
        this.iotservice.RemoveCellarSenzors(item.getSubPath()),
        this.iotservice.RemoveCellarSpaces(item.getSubPath())
      )
      .subscribe(([data1, data2, data3]) => {

        let dat1 = <CellarDTO>data1;
        let dat2 = <CellarDTO>data2;
        let dat3 = <CellarDTO>data3;

        if(!dat1.isOK){
          err += dat1.exceptionText;
        }

        if(!dat2.isOK){
          err += dat1.exceptionText;
        }

        if(!dat3.isOK){
          err += dat1.exceptionText;
        }

      });


      return Observable.of(err);


    })
    .map(item => {

      if(item == "")
      {
        return new DeleteCellarSpaceSuccessAction();
      } else {
        return new DeleteCellarSpaceFailureAction(item);
      }

    });


    @Effect() DeleteSpaceSuccessEffect$: Observable<Action> = this.actions$
    .ofType(DELETE_CELLAR_SPACE_SUCCESS)
    .map(items => new RouterActions.Back());




}

