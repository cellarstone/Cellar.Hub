import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { MqttService } from 'app/service/mqtt.service';
import { PUBLISH_TO_MQTT, PublishToMqttSuccessAction } from 'app/state/actions/mqtt.actions';
import { PublishToMqttModel } from 'app/models/publishToMqtt.model';
import { CellarDTO } from 'app/entities/http/CellarDTO';

@Injectable()
export class MqttEffects {

    constructor(private actions$: Actions, private mqttservice: MqttService) { }

    @Effect() publishToMqttEffect$: Observable<Action> = this.actions$
        .ofType(PUBLISH_TO_MQTT)
        .map(toPayload)
        .switchMap((payload) => {

            let arr = <PublishToMqttModel[]>payload;
            let resArr = Array<Observable<CellarDTO>>();
            arr.forEach(element => {
                resArr.push(this.mqttservice.PublishToMqtt(element));
            });

            Observable.zip(...resArr)
              .subscribe();

            return Observable.of("OK");
        })
        .map(items => new PublishToMqttSuccessAction());


}
