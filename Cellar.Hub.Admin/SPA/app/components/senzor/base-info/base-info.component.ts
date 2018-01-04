import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellarSenzor } from 'app/entities/CellarSenzor';

import { Message, SelectItem } from 'primeng/primeng';

declare var jQuery: any;

@Component({
  selector: 'app-senzor-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.scss']
})
export class SenzorBaseInfoComponent implements OnInit {

  @Input()
  private item: CellarSenzor;

  @Output() onSave = new EventEmitter<CellarSenzor>();
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter<CellarSenzor>();

  validations: Message[] = [];
  messagesToUser: Message[] = [];

  isStateValid: boolean = true;
  isNameValid: boolean = true;
  isPathValid: boolean = true;
  isTypeValid: boolean = true;
  isWifiSSIDValid: boolean = true;
  isWifiPasswordValid: boolean = true;
  isMqttValid: boolean = true;

  types: SelectItem[];
  selectedType: string;
  typesImages: Map<string, string> = new Map<string, string>();
  selectedTypeImage: string = "";

  constructor() {
    this.types = [];
    this.types.push({ label: 'Select Type', value: null });
    this.types.push({ label: 'CellarSenzor Temperature v1.0', value: 'CellarSenzor Temperature v1.0' });
    this.types.push({ label: 'CellarSenzor Temperature v2.0', value: 'CellarSenzor Temperature v2.0' });
    this.types.push({ label: 'CellarSenzor Motion v1.0', value: 'CellarSenzor Motion v1.0' });
    this.types.push({ label: 'CellarSenzor CO2 v1.0', value: 'CellarSenzor CO2 v1.0' });
    this.types.push({ label: 'CellarSenzor Smoke v1.0', value: 'CellarSenzor Smoke v1.0' });
    this.types.push({ label: 'CellarSenzor OpenClose v1.0', value: 'CellarSenzor OpenClose v1.0' });
    this.types.push({ label: 'CellarSenzor Power v1.0', value: 'CellarSenzor Power v1.0' });
    this.types.push({ label: 'CellarSenzor Camera v1.0', value: 'CellarSenzor Camera v1.0' });

    this.typesImages.set("CellarSenzor Temperature v1.0", "assets/images/senzortypes/dht11.jpeg");
    this.typesImages.set("CellarSenzor Temperature v2.0", "assets/images/senzortypes/dht22.jpg");
    this.typesImages.set("CellarSenzor Motion v1.0", "assets/images/senzortypes/pir.jpeg");
    this.typesImages.set("CellarSenzor CO2 v1.0", "assets/images/senzortypes/co2.jpg");
    this.typesImages.set("CellarSenzor Smoke v1.0", "assets/images/senzortypes/smoke.jpeg");
    this.typesImages.set("CellarSenzor OpenClose v1.0", "assets/images/senzortypes/openclose.png");
    this.typesImages.set("CellarSenzor Power v1.0", "assets/images/senzortypes/relay.jpeg");
    this.typesImages.set("CellarSenzor Camera v1.0", "assets/images/senzortypes/camera.jpeg");

  }
  ngOnInit(): void {
    this.selectedType = this.item.type;
    this.onTypeChange(this.selectedType);
  }


  private saveSenzor() {


    this.item.type = this.selectedType;


    //validace
    if (this.item.state === "0") {
      this.validations.push({
        severity: 'warn',
        summary: 'State',
        detail: 'State is required'
      });
      this.isStateValid = false;
    }
    else {
      this.isStateValid = true;
    }
    if (!this.item.name) {
      this.validations.push({
        severity: 'warn',
        summary: 'Name',
        detail: 'Name is required'
      });
      this.isNameValid = false;
    }
    else {
      this.isNameValid = true;
    }
    if (!this.item.path) {
      this.validations.push({
        severity: 'warn',
        summary: 'Path',
        detail: 'Path is required'
      });
      this.isPathValid = false;
    }
    else {
      this.isPathValid = true;
    }
    if (!this.item.type) {
      this.validations.push({
        severity: 'warn',
        summary: 'Type',
        detail: 'Type is required'
      });
      this.isTypeValid = false;
    }
    else {
      this.isTypeValid = true;
    }
    if (!this.item.wifiSSID) {
      this.validations.push({
        severity: 'warn',
        summary: 'Wifi SSID',
        detail: 'Wifi SSID is required'
      });
      this.isWifiSSIDValid = false;
    }
    else {
      this.isWifiSSIDValid = true;
    }
    if (!this.item.wifiPassword) {
      this.validations.push({
        severity: 'warn',
        summary: 'Wifi Password',
        detail: 'Wifi Password is required'
      });
      this.isWifiPasswordValid = false;
    }
    else {
      this.isWifiPasswordValid = true;
    }
    if (!this.item.mqttUrl) {
      this.validations.push({
        severity: 'warn',
        summary: 'MQTT IP',
        detail: 'Mqtt IP is required'
      });
      this.isMqttValid = false;
    }
    else {
      this.isMqttValid = true;
    }


    if (this.validations.length == 0) {

      //emit output  
      this.onSave.emit(this.item);

    }
  }


  private deleteSenzor() {
    this.onDelete.emit(this.item);
  }

  private cancelSenzor() {
    // go in router history back
    this.onCancel.emit();
  }


  //*********************************/
  //STATE
  //*********************************/

  public selectState(e: any) {
    var aaa = e.srcElement.innerHTML.toLowerCase();
    if (aaa === "new") {
      this.item.state = "1";



      jQuery("#new").removeClass();
      jQuery("#approved").removeClass();
      jQuery("#forbidden").removeClass();

      jQuery("#new").addClass("btn btn-warning");
      jQuery("#approved").addClass("btn");
      jQuery("#forbidden").addClass("btn");
    }
    else if (aaa === "approved") {
      this.item.state = "2";

      jQuery("#new").removeClass();
      jQuery("#approved").removeClass();
      jQuery("#forbidden").removeClass();

      jQuery("#new").addClass("btn");
      jQuery("#approved").addClass("btn btn-success");
      jQuery("#forbidden").addClass("btn");
    }
    else if (aaa === "forbidden") {
      this.item.state = "3";

      jQuery("#new").removeClass();
      jQuery("#approved").removeClass();
      jQuery("#forbidden").removeClass();

      jQuery("#new").addClass("btn");
      jQuery("#approved").addClass("btn");
      jQuery("#forbidden").addClass("btn btn-danger");
    }


  }




  onTypeChange(data) {
    let img = this.typesImages.get(data);
    this.selectedTypeImage = img;
  }



}
