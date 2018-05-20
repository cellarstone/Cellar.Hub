import { Injectable } from '@angular/core';
import { Observable, of, zip, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { Actions, Effect, ofType } from "@ngrx/effects";
import { MqttService } from 'app/service/mqtt.service';
import { PUBLISH_TO_MQTT, PublishToMqttSuccessAction, PublishToMqttAction } from 'app/state/actions/mqtt.actions';
import { PublishToMqttModel } from 'app/models/publishToMqtt.model';
import { CellarDTO } from 'app/entities/http/CellarDTO';

@Injectable()
export class MqttEffects {

    constructor(public actions$: Actions, 
                private mqttservice: MqttService) { }

    @Effect() 
    publishToMqttEffect$ = this.actions$.pipe(
            ofType(PUBLISH_TO_MQTT),
            map((action: PublishToMqttAction) => action.payload),
            switchMap((payload) => {

                let arr = <PublishToMqttModel[]>payload;
                let resArr = Array<Observable<CellarDTO>>();
                arr.forEach(element => {
                    resArr.push(this.mqttservice.PublishToMqtt(element));
                });
    
                zip(...resArr)
                  .subscribe();
    
                return of("OK");
            }),
            map(items => new PublishToMqttSuccessAction())
        );

}
