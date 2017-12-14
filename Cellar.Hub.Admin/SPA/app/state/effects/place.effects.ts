import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { IoTService } from 'app/service/iot.service';
import { LOAD_CELLAR_PLACES, LoadCellarPlacesSuccessAction, LoadCellarPlaceSuccessAction, LOAD_CELLAR_PLACE, SAVE_CELLAR_PLACE, DELETE_CELLAR_PLACE } from 'app/state/actions/place.actions';
import { CellarPlace } from 'app/entities/CellarPlace';
import { CellarDTO } from 'app/entities/http/CellarDTO';
import * as RouterActions from 'app/state/actions/router.actions';

@Injectable()
export class PlaceEffects {

    constructor(private actions$: Actions, private iotservice: IoTService) { }

    @Effect() placesEffect$: Observable<Action> = this.actions$
        .ofType(LOAD_CELLAR_PLACES)
        .switchMap(() => this.iotservice.GetAllCellarPlaces())
        .map(items => new LoadCellarPlacesSuccessAction(<CellarPlace[]>items.data));

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
        .map(item => new LoadCellarPlaceSuccessAction(<CellarPlace>item.data));


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

            let item = <CellarPlace>payload;

            return this.iotservice.RemoveCellarPlace(item.id);

        })
        .map(item => {

            return new RouterActions.Back();

        });



}
