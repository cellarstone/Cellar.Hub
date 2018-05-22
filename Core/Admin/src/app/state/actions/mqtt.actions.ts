import { Action } from "@ngrx/store";
import { PublishToMqttModel } from "../../models/publishToMqtt.model";

export const PUBLISH_TO_MQTT = '[Mqtt] Publish';
export class PublishToMqttAction implements Action {
    readonly type = PUBLISH_TO_MQTT;
    constructor(public payload: PublishToMqttModel[]){}
}


export const PUBLISH_TO_MQTT_SUCCESS = '[Mqtt] Publish success';
export class PublishToMqttSuccessAction implements Action {
    readonly type = PUBLISH_TO_MQTT_SUCCESS;
}
