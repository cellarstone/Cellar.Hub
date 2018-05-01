export class CellarMeetingRoom {

    //Alternative for constructor
    New(json: CellarMeetingRoom): CellarMeetingRoom {
        this.id = this.repairID(json.id);
        this.email = json.email;
        return this
    }

    public id: string = "";
    public email: string = "";

    private repairID(id: string): string{
        return id.replace("ObjectIdHex(\"","").replace("\")","");
    }
}
