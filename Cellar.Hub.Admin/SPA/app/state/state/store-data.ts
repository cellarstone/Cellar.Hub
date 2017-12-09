import { CellarPlace } from "../../entities/CellarPlace";
import { CellarSpace } from "../../entities/CellarSpace";
import { CellarSenzor } from "app/entities/CellarSenzor";

export interface StoreData {
    places: CellarPlace[];
    spaces: CellarSpace[];
    selectedSenzor: CellarSenzor;
}

export const INITIAL_STORE_DATA: StoreData = {
    places: [],
    spaces: [],
    selectedSenzor: undefined
};