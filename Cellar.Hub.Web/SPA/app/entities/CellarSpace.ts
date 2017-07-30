
import { CellarSpaceType } from './CellarSpaceType';
import { CellarSenzor } from './CellarSenzor';

export interface CellarSpace {


    Id: string;


    Name: string;


    Type: CellarSpaceType;


    Senzors: CellarSenzor[];



    // GPS - latitude, longtitude
    // Country, City, Street


    // Height, Weight, Z = 3D view

    //GameObject




}
