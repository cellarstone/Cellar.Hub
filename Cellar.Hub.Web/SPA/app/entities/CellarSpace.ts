
import { CellarSenzor } from './CellarSenzor';

export class CellarSpace {


    public Id: string;


    public Name: string;

    // Building, Room, Floor, Land
    public Type: string;


    public Senzors: CellarSenzor[];


    public Subspaces: CellarSpace[];


    // GPS - latitude, longtitude
    // Country, City, Street


    // Height, Weight, Z = 3D view

    //GameObject

    //Image, Picture


}
