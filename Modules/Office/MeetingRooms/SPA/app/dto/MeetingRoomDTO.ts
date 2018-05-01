export class MeetingRoomDTO {

    //Alternative for constructor
    New(json: MeetingRoomDTO): MeetingRoomDTO {
        this.id = this.repairID(json.id);
        this.email = json.email;
        this.name = json.name;
        this.path = json.path;
        return this
    }

    public id: string = "";
    public name: string = "";
    public path: string = "";
    public email: string = "";


    private repairID(id: string): string{
        return id.replace("ObjectIdHex(\"","").replace("\")","");
    }
}
