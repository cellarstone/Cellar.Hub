//angular
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//primeNG
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

//cellarstone
// import { Space } from '../../../../entities/hck/product';
// import { Product } from '../../../../entities/catalog/product';
// import { ProductDetail } from '../../../../entities/catalog/ProductDetail';
// import { ProductState } from '../../../../entities/catalog/ProductState';
// import { Category } from '../../../../entities/catalog/Category';
// import { ProductImage } from '../../../../entities/catalog/ProductImage';
// import { ProductVideo } from '../../../../entities/catalog/ProductVideo';
// import { Producer } from '../../../../entities/catalog/Producer';
// import { ProductCategory } from '../../../../entities/catalog/ProductCategory';


// import { CatalogProductHckProduct } from '../../../../entities/business/catalogproducthckproduct';


// import { BusinessService } from '../../../../service/business.service';
// import { CatalogService } from '../../../../service/catalog.service';
// import { HckService } from '../../../../service/hck.service';



import { CellarSpace } from '../../../entities/CellarSpace';
import { CellarSenzor } from '../../../entities/CellarSenzor';

import { SharedService } from '../../../service/shared.service';
import { IoTService } from '../../../service/iot.service';


//others
declare var jQuery: any;


//http + rxjs
import { Subject } from 'rxjs/Subject';
//import { CellarDTO } from '../../../../entities/http/CellarDTO';
import { Observable } from 'rxjs/Observable';



@Component({
    templateUrl: './senzor-detail.html',
    styleUrls: ['./senzor-detail.scss']
})
export class SenzorDetail {

    item: CellarSenzor;

    types: SelectItem[];
    selectedType: string;

    private sub: any;
    page: number = 1;
    itemsPerPage: number = 50;
    search: string = '';


    validations: Message[] = [];
    messagesToUser: Message[] = [];




    //validation properties
    isStateValid: boolean = true;
    isNameValid: boolean = true;
    isPathValid: boolean = true;
    isTypeValid: boolean = true;
    isWifiSSIDValid: boolean = true;
    isWifiPasswordValid: boolean = true;
    isMqttValid: boolean = true;



    private series: any[] = [{
        name: "India",
        data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
      }, {
        name: "Russian Federation",
        data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
      }, {
        name: "Germany",
        data: [0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995]
      },{
        name: "World",
        data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
      }];
      private categories: number[] = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011];
    



    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService,
        public iotservice: IoTService) {

        this.sharedService.setCurrentRoute();

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

    }


    ngOnInit() {
        //*********************************/
        //CALL WEBAPI - GET DATA
        //*********************************/
        this.getData();
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }




    //*********************************/
    /* PRODUKT */
    //*********************************/

    private getData() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id']; // (+) converts string 'id' to a number

            //novy produkt
            if (id == 0) {
                //založíme nový produkt
                this.item = new CellarSenzor();

                //Product-State
                this.item.state = "1";
            }
            //editace existujiciho produktu
            else {

                //zjistíme informace o produktu
                this.iotservice.GetCellarSenzor(id.toString())
                    .subscribe(art => {
                        let response = art;



                        //BEZ CHYB ze serveru
                        if (response.isOK) {
                            this.item = <CellarSenzor>response.data;

                            this.selectedType = this.item.type;

                        }
                        //NON-VALID ze serveru
                        else if (!response.isValid) {
                            //???
                            console.error(response.validations);
                        }
                        //custom ERROR ze serveru
                        else if (response.isCustomError) {
                            //???
                            console.error(response.customErrorText);
                        }
                        //identity ERROR ze serveru
                        else if (response.isIdentityError) {
                            //???
                            console.error(response.identityErrorText);
                        }
                        //EXCEPTION ze serveru
                        else if (response.isException) {
                            //???
                            console.error(response.exceptionText);
                        }
                    },
                    error => {
                        console.error(error);
                    },
                    () => {
                        console.log('getData() completed');
                    });

            }
        });
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

            //UPDATE produktu
            if (this.item.id != undefined) {
                this.iotservice.UpdateCellarSenzor(this.item)
                    .subscribe(art => {
                        let response = art;

                        //BEZ CHYB ze serveru
                        if (response.isOK) {
                            this.item = <CellarSenzor>response.data;

                            this.sharedService.routeBack();

                            // this.messagesToUser.push({
                            //     severity: 'success',
                            //     summary: '! UPDATED !',
                            //     detail: 'Senzor has been updated'
                            // });
                        }
                        //NON-VALID ze serveru
                        else if (!response.isValid) {
                            //???
                            console.error(response.validations);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Non-valid'
                            });
                        }
                        //custom ERROR ze serveru
                        else if (response.isCustomError) {
                            //???
                            console.error(response.customErrorText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Custom Error -' + response.customErrorText
                            });
                        }
                        //identity ERROR ze serveru
                        else if (response.isIdentityError) {
                            //???
                            console.error(response.identityErrorText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Identity Error -' + response.identityErrorText
                            });
                        }
                        //EXCEPTION ze serveru
                        else if (response.isException) {
                            //???
                            console.error(response.exceptionText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Exception -' + response.exceptionText
                            });
                        }
                    },
                    error => {
                        console.error(error);

                        this.messagesToUser.push({
                            severity: 'error',
                            summary: 'From ???',
                            detail: error
                        });
                    },
                    () => {
                        console.log('saveSenzor() completed');
                    });
            }
            //ZALOZENI noveho produktu
            else {
                this.iotservice.AddCellarSenzor(this.item)
                    .subscribe(art => {
                        let response = art;

                        //BEZ CHYB ze serveru
                        if (response.isOK) {
                            this.item = <CellarSenzor>response.data;


                            //this.messagesToUser.push({
                            //    severity: 'success',
                            //    summary: '! ADDED !',
                            //    detail: 'Product has been added'
                            //});

                            this.sharedService.routeBack();
                            

                        }
                        //NON-VALID ze serveru
                        else if (!response.isValid) {
                            //???
                            console.error(response.validations);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Non-valid'
                            });
                        }
                        //custom ERROR ze serveru
                        else if (response.isCustomError) {
                            //???
                            console.error(response.customErrorText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Custom Error -' + response.customErrorText
                            });
                        }
                        //identity ERROR ze serveru
                        else if (response.isIdentityError) {
                            //???
                            console.error(response.identityErrorText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Identity Error -' + response.identityErrorText
                            });
                        }
                        //EXCEPTION ze serveru
                        else if (response.isException) {
                            //???
                            console.error(response.exceptionText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Exception -' + response.exceptionText
                            });
                        }
                    },
                    error => {
                        console.error(error);

                        this.messagesToUser.push({
                            severity: 'error',
                            summary: 'From ???',
                            detail: error
                        });
                    },
                    () => {
                        console.log('saveProduct() completed');
                    });
            }

        }
    }


    private deleteSenzor(){
        this.iotservice.RemoveCellarSenzor(this.item.id)
        .subscribe(art => {
            let response = art;

            //BEZ CHYB ze serveru
            if (response.isOK) {
                this.item = <CellarSenzor>response.data;

                this.sharedService.routeBack();

                // this.messagesToUser.push({
                //     severity: 'success',
                //     summary: '! UPDATED !',
                //     detail: 'Senzor has been updated'
                // });
            }
            //NON-VALID ze serveru
            else if (!response.isValid) {
                //???
                console.error(response.validations);

                this.messagesToUser.push({
                    severity: 'error',
                    summary: 'From Server',
                    detail: 'Non-valid'
                });
            }
            //custom ERROR ze serveru
            else if (response.isCustomError) {
                //???
                console.error(response.customErrorText);

                this.messagesToUser.push({
                    severity: 'error',
                    summary: 'From Server',
                    detail: 'Custom Error -' + response.customErrorText
                });
            }
            //identity ERROR ze serveru
            else if (response.isIdentityError) {
                //???
                console.error(response.identityErrorText);

                this.messagesToUser.push({
                    severity: 'error',
                    summary: 'From Server',
                    detail: 'Identity Error -' + response.identityErrorText
                });
            }
            //EXCEPTION ze serveru
            else if (response.isException) {
                //???
                console.error(response.exceptionText);

                this.messagesToUser.push({
                    severity: 'error',
                    summary: 'From Server',
                    detail: 'Exception -' + response.exceptionText
                });
            }
        },
        error => {
            console.error(error);

            this.messagesToUser.push({
                severity: 'error',
                summary: 'From ???',
                detail: error
            });
        },
        () => {
            console.log('saveSenzor() completed');
        });
    }


    // //*********************************/
    // //STATE
    // //*********************************/

    public selectState(e: any) {
        var aaa = e.srcElement.innerHTML.toLowerCase();




        // for (var i = 0; i < this.statesList.length; i++)
        // {
        //     var abcd = this.statesList[i];

        //     if (abcd.name.toLowerCase() == aaa)
        //     {
        //         this.item.state = abcd;
        //     }
        // }





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








}