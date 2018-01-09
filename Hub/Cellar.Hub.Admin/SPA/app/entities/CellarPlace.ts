
export class CellarPlace {

    //Alternative for constructor
    New(json: any): CellarPlace {
        this.id = json.id;
        this.name = json.name;
        this.state = json.state;
        this.path = json.path;

        this.country = json.country;
        this.city = json.city;
        this.street = json.city;
        this.zipcode = json.city;
        this.latitude = json.city;
        this.longtitude = json.city;

        return this
    }

    public id: string;

    public name: string;

    public state: string;
    public path: string = "/";

    // Country, City, Street
    public country: string;
    public city: string;
    public street: string;
    public zipcode: string;

    // GPS - latitude, longtitude
    public latitude: string;
    public longtitude: string;

}
