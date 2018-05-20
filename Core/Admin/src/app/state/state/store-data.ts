import { CellarPlace } from "../../entities/CellarPlace";
import { CellarSpace } from "../../entities/CellarSpace";
import { CellarSenzor } from "app/entities/CellarSenzor";
import { CellarWorkflow } from "app/entities/CellarWorkflow";
import { CellarMeetingRoom } from "../../entities/CellarMeetingRoom";

export interface StoreData {
    places: CellarPlace[];
    spaces: CellarSpace[];
    senzors: CellarSenzor[];
    workflows: CellarWorkflow[];

    meetingrooms: CellarMeetingRoom[];
    
    cli_command: string;
    cli_result: string[];
}

export const INITIAL_STORE_DATA: StoreData = {
    places: [],
    spaces: [],
    senzors: [],
    workflows: [],
    meetingrooms: [],
    cli_command: null,
    cli_result: []
};