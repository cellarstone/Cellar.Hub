import { CellarPlace } from "../../entities/CellarPlace";
import { CellarSpace } from "../../entities/CellarSpace";
import { CellarSenzor } from "app/entities/CellarSenzor";
import { CellarWorkflow } from "app/entities/CellarWorkflow";

export interface StoreData {
    places: CellarPlace[];
    spaces: CellarSpace[];
    senzors: CellarSenzor[];
    workflows: CellarWorkflow[];
    
    cli_command: string;
    cli_result: string[];
}

export const INITIAL_STORE_DATA: StoreData = {
    places: [],
    spaces: [],
    senzors: [],
    workflows: [],
    cli_command: null,
    cli_result: []
};