
export class CellarMeeting {

    public id: string;
    public name: string;
    public state: string;


    public start: Date;

    public end: Date;
    
    

    public author: string;

    /*****************************/
    /*  Solve Tree structure     */
    /* https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-child-references/ */
    /*****************************/
    public path: string;


}
