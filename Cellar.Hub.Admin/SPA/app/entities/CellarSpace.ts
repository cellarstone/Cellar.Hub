
import { CellarSenzor } from './CellarSenzor';

export class CellarSpace {

    public id: string;
    public name: string;
    public state: string;

    // public type: string;

    public senzors: CellarSenzor[];

    /*****************************/
    /*  Solve Tree structure     */
    /* https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-child-references/ */
    /*****************************/
    public path: string;

    public image: string;

}
