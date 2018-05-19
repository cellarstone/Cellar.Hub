
export class CellarSpace {

    //Alternative for constructor
    New(json: any): CellarSpace {
        this.id = json.id;
        this.name = json.name;
        this.state = json.state;
        this.image = json.image;
        this.path = json.path;

        return this
    }

    public id: string;
    public name: string;

    public officeemailaddress: string;

    //NEW
    //APPROVED
    //FORBIDDEN
    public state: string = "1";

    // public type: string;

    public image: string;

    /*****************************/
    /*  Solve Tree structure     */
    /* https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-child-references/ */
    /*****************************/
    public path: string;

    public getSubPath(): string {
        let result = "";
        var nameTemp = "";
        
        if(this.name != undefined){
            nameTemp = this.name.replace(/ /g, "-");
        }
        

        if (this.path == "/") {
            result = this.path + nameTemp.toLowerCase();
        }
        else {
            result = this.path + "/" + nameTemp.toLowerCase();
        }

        return result;
    }

}
