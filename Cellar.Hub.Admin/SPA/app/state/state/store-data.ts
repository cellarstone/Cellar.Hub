import { CellarPlace } from "../../entities/CellarPlace";
import { CellarSpace } from "../../entities/CellarSpace";

export interface StoreData {
    places: CellarPlace[];
    spaces: CellarSpace[];
}

export const INITIAL_STORE_DATA: StoreData = {
    places: [],
    spaces: []
};