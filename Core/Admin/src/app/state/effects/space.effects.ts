import { Injectable } from '@angular/core';
import { Observable, of, zip } from "rxjs";
import { switchMap, map, flatMap } from 'rxjs/operators';
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { IoTService } from 'app/service/iot.service';
import { LOAD_CELLAR_SPACES, LoadCellarSpacesSuccessAction, SaveCellarSpaceAction, LOAD_CELLAR_SPACE, LoadCellarSpaceSuccessAction, LOAD_ALL_CELLAR_SPACES, LoadAllCellarSpacesSuccessAction, LoadCellarSpacesAction, SAVE_CELLAR_SPACE, DELETE_CELLAR_SPACE, DELETE_CELLAR_SPACE_SUCCESS, DeleteCellarSpaceSuccessAction, DeleteCellarSpaceFailureAction, LoadCellarSpaceAction, DeleteCellarSpaceAction } from 'app/state/actions/space.actions';
import { CellarSpace } from 'app/entities/CellarSpace';
import { CellarDTO } from 'app/entities/http/CellarDTO';
import * as RouterActions from 'app/state/actions/router.actions';
import { LoadCellarSenzorsAction } from 'app/state/actions/senzor.actions';


@Injectable()
export class SpaceEffects {

  constructor(private actions$: Actions, private iotservice: IoTService) { }

  @Effect()
  loadAllSpacesEffect$ = this.actions$.pipe(
    ofType(LOAD_ALL_CELLAR_SPACES),
    switchMap(() => this.iotservice.GetAllCellarSpaces()),
    map(items => new LoadAllCellarSpacesSuccessAction(<CellarSpace[]>items.data))
  );


  @Effect()
  loadSpacesEffect$ = this.actions$.pipe(
    ofType(LOAD_CELLAR_SPACES),
    map((action: LoadCellarSpacesAction) => action.payload),
    switchMap((payload) => this.iotservice.GetCellarSpaces(payload)),
    map(items => new LoadCellarSpacesSuccessAction(<CellarSpace[]>items.data))
  );

  @Effect()
  loadSpaceEffect$ = this.actions$.pipe(
    ofType(LOAD_CELLAR_SPACE),
    map((action: LoadCellarSpaceAction) => action.payload),
    switchMap((payload) => {

      return this.iotservice.GetCellarSpace(payload).pipe(
        switchMap(data => {

          console.log(data);

          return of(data);

        })
      );

    }),
    flatMap((item: CellarDTO) => {

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

    })
  );



  @Effect()
  saveSpaceEffect$ = this.actions$.pipe(
    ofType(SAVE_CELLAR_SPACE),
    map((action: SaveCellarSpaceAction) => action.payload),
    switchMap((payload) => {


      let item = <CellarSpace>payload;

      if (item.id != undefined) {
        return this.iotservice.UpdateCellarSpace(item).pipe(
          switchMap((val) => {

            let temp = <CellarSpace>val;

            return of(temp);

          })
        );
      }
      else {
        return this.iotservice.AddCellarSpace(item);
      }

    }),
    map(item => {

      let temp = <CellarSpace>item;

      return new RouterActions.Go({
        path: ['space/' + temp.id]
      })
    })
  );


  @Effect()
  deleteSpaceEffect$ = this.actions$.pipe(
    ofType(DELETE_CELLAR_SPACE),
    map((action: DeleteCellarSpaceAction) => action.payload),
    switchMap((payload) => {

      let payld = <CellarSpace>payload;
      let item = new CellarSpace().New(payld);

      let isOk1 = false;
      let isOk2 = false;
      let isOk3 = false;
      let err = "";

      zip(
        this.iotservice.RemoveCellarSpace(item.id),
        this.iotservice.RemoveCellarSenzors(item.getSubPath()),
        this.iotservice.RemoveCellarSpaces(item.getSubPath())
      )
        .subscribe(([data1, data2, data3]) => {

          let dat1 = <CellarDTO>data1;
          let dat2 = <CellarDTO>data2;
          let dat3 = <CellarDTO>data3;

          if (!dat1.isOK) {
            err += dat1.exceptionText;
          }

          if (!dat2.isOK) {
            err += dat1.exceptionText;
          }

          if (!dat3.isOK) {
            err += dat1.exceptionText;
          }

        });


      return of(err);


    }),
    map(item => {

      if (item == "") {
        return new DeleteCellarSpaceSuccessAction();
      } else {
        return new DeleteCellarSpaceFailureAction(item);
      }

    })
  );


  @Effect()
  DeleteSpaceSuccessEffect$ = this.actions$.pipe(
    ofType(DELETE_CELLAR_SPACE_SUCCESS),
    map(items => new RouterActions.Back())
  );

}

