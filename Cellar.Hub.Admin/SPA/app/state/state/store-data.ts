import { CellarPlace } from "../../entities/CellarPlace";
import { CellarSpace } from "../../entities/CellarSpace";
import { CellarSenzor } from "app/entities/CellarSenzor";

export interface StoreData {
    places: CellarPlace[];
    spaces: CellarSpace[];
    senzors: CellarSenzor[];
    
    cli_command: string;
    cli_result: string[];
}

export const INITIAL_STORE_DATA: StoreData = {
    places: [],
    spaces: [],
    senzors: [],
    cli_command: null,
    cli_result: []
};