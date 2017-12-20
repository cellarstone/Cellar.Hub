import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { IoTService } from 'app/service/iot.service';
import { LOAD_ALL_CELLAR_PLACES, LoadAllCellarPlacesSuccessAction, LoadCellarPlaceSuccessAction, LOAD_CELLAR_PLACE, SAVE_CELLAR_PLACE, DELETE_CELLAR_PLACE, DeleteCellarPlaceSuccessAction, DeleteCellarPlaceFailureAction, DELETE_CELLAR_PLACE_SUCCESS } from 'app/state/actions/place.actions';
import { CellarPlace } from 'app/entities/CellarPlace';
import { CellarDTO } from 'app/entities/http/CellarDTO';
import * as RouterActions from 'app/state/actions/router.actions';
import { LoadCellarSpacesAction } from 'app/state/actions/space.actions';

@Injectable()
export class PlaceEffects {

    constructor(private actions$: Actions, private iotservice: IoTService) { }

    @Effect() placesEffect$: Observable<Action> = this.actions$
        .ofType(LOAD_ALL_CELLAR_PLACES)
        .switchMap(() => this.iotservice.GetAllCellarPlaces())
        .map(items => new LoadAllCellarPlacesSuccessAction(<CellarPlace[]>items.data));

    @Effect() loadPlaceEffect$: Observable<Action> = this.actions$
        .ofType(LOAD_CELLAR_PLACE)
        .map(toPayload)
        .switchMap((payload) => {

            //new senzor
            if (payload == 0) {

                //create a new senzor
                var res = new CellarDTO();
                var aaa = new CellarPlace();

                //set senzor state
                aaa.state = "1";

                res.data = aaa;

                return Observable.of(res);
            }
            //editing existing senzor   
            else {

                return this.iotservice.GetCellarPlace(payload);
            }

        })
        .flatMap((item: CellarDTO) => {
            
                  let data = <CellarPlace>item.data;
            
                  if (data.id == undefined) {
                    return [
                      new LoadCellarPlaceSuccessAction(data)
                    ]
                  }
                  else {
                    return [
                      new LoadCellarPlaceSuccessAction(data),
                      new LoadCellarSpacesAction(data.path)
                    ]
                  }
            
                });


    @Effect() savePlaceEffect$: Observable<Action> = this.actions$
        .ofType(SAVE_CELLAR_PLACE)
        .map(toPayload)
        .switchMap((payload) => {

            let item = <CellarPlace>payload;

            console.log(payload);
            console.log(item);

            if (item.id != undefined) {
                return this.iotservice.UpdateCellarPlace(item)
                    .switchMap((val) => {

                        let asdf = new CellarDTO();
                        asdf.data = item;

                        return Observable.of(asdf);

                    });
            }
            else {
                return this.iotservice.AddCellarPlace(item);
            }

        })
        .map(item => {

            console.log(item);

            let temp = <CellarPlace>item.data;

            return new RouterActions.Go({
                path: ['place/' + temp.id]
            })
        });

        @Effect() deletePlaceEffect$: Observable<Action> = this.actions$
        .ofType(DELETE_CELLAR_PLACE)
        .map(toPayload)
        .switchMap((payload) => {
    
          let payld = <CellarPlace>payload;
    
          let isOk1 = false;
          let isOk2 = false;
          let isOk3 = false;
          let err = "";
    
          Observable.zip(
            this.iotservice.RemoveCellarPlace(payld.id),
            this.iotservice.RemoveCellarSenzors(payld.path),
            this.iotservice.RemoveCellarSpaces(payld.path)
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
            return new DeleteCellarPlaceSuccessAction();
          } else {
            return new DeleteCellarPlaceFailureAction(item);
          }
    
        });
    
    
        @Effect() DeletePlaceSuccessEffect$: Observable<Action> = this.actions$
        .ofType(DELETE_CELLAR_PLACE_SUCCESS)
        .map(items => new RouterActions.Back());
    
    



}
