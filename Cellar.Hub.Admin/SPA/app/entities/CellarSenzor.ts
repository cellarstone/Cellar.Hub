
export class CellarSenzor {
    public id: string;
    public name: string;
    public state: string;

    public path: string;

    //Cellar Code/Type = Senzor1,Senzor2,Senzor3..OpenClose1..WaterPump1...etc
    public type: string;

    public firmware: string;

    public wifiSSID: string;
    public wifiPassword: string;
    public mqttUrl: string;
}
