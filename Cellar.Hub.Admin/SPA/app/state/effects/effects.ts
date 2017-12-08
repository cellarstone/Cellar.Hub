import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {Actions, Effect} from "@ngrx/effects";
import { IoTService } from 'app/service/iot.service';
import { LOAD_CELLAR_PLACES, LoadCellarPlacesSuccessAction } from 'app/state/actions/actions';
import { CellarPlace } from 'app/entities/CellarPlace';

@Injectable()
export class EffectService {

  constructor(private actions$: Actions, private iotService: IoTService) {}

  @Effect() placesEffect$: Observable<Action> = this.actions$
      .ofType(LOAD_CELLAR_PLACES)
      .switchMap(() => this.iotService.GetAllCellarPlaces())
      .map(items => new LoadCellarPlacesSuccessAction(<CellarPlace[]>items.data) );

}
