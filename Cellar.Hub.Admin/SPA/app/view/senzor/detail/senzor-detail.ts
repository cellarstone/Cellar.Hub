//angular
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
// declare var Plotly: any;
import { chart } from 'highcharts';


//http + rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
//import { CellarDTO } from '../../../../entities/http/CellarDTO';


//websocket
import { Socket } from '../../../service/Socket';


@Component({
    templateUrl: './senzor-detail.html',
    styleUrls: ['./senzor-detail.scss']
})
export class SenzorDetail {

    item: CellarSenzor = new CellarSenzor();

    types: SelectItem[];
    selectedType: string;

    private sub: any;

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


    //websockets
    public socket: Socket;
    public socket2: Socket;

    @ViewChild('chartTarget') chartTarget: ElementRef;
    chart: Highcharts.ChartObject;

    @ViewChild('chartTarget2') chartTarget2: ElementRef;
    chart2: Highcharts.ChartObject;



    public actualValue: number = 0;
    public actualValue2: number = 0;


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

        //websockets
        this.socket = new Socket("ws://localhost:8080/ws/s3102temperature");
        this.socket.on('connect', this.onConnect.bind(this));
        this.socket.on('disconnect', this.onDisconnect.bind(this));
        this.socket.on('message', this.onMessage.bind(this));

        this.socket2 = new Socket("ws://localhost:8080/ws/s3102status");
        this.socket2.on('connect', this.onConnect2.bind(this));
        this.socket2.on('disconnect', this.onDisconnect2.bind(this));
        this.socket2.on('message', this.onMessage2.bind(this));

    }


    ngOnInit() {
        //*********************************/
        //CALL WEBAPI - GET DATA
        //*********************************/
        this.getData();


        // Observable.interval(5000).subscribe(item => {

        //     this.setCharts();

        // });

        // setTimeout(this.setCharts(), 5000);
    }
    setCharts() {
        const options: Highcharts.Options = {
            chart: {
                type: 'line',
                // animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    // load: function () {

                    //     // set up the updating of the chart each second
                    //     var series = this.series[0];
                    //     setInterval(function () {
                    //         var x = (new Date()).getTime(), // current time
                    //             y = Math.random();
                    //         series.addPoint([x, y], true, true);
                    //     }, 1000);
                    // }
                }
            },
            title: {
                text: 'Temperature °C'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            // tooltip: {
            //     formatter: function () {
            //         return '<b>' + this.series.name + '</b><br/>' +
            //             this.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
            //             this.numberFormat(this.y, 2);
            //     }
            // },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            // series: [{
            //     name: 's3102',
            //     data: []
            // }]
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    // data.push({
                    //     x: time + i * 1000,
                    //     y: 0
                    // });

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: 0
                        });
                    }
                    return data;
                }())
            }]
        };

        this.chart = chart(this.chartTarget.nativeElement, options);


        const options2: Highcharts.Options = {
            chart: {
                type: 'line',
                // animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    // load: function () {

                    //     // set up the updating of the chart each second
                    //     var series = this.series[0];
                    //     setInterval(function () {
                    //         var x = (new Date()).getTime(), // current time
                    //             y = Math.random();
                    //         series.addPoint([x, y], true, true);
                    //     }, 1000);
                    // }
                }
            },
            title: {
                text: 'Status'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            // tooltip: {
            //     formatter: function () {
            //         return '<b>' + this.series.name + '</b><br/>' +
            //             this.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
            //             this.numberFormat(this.y, 2);
            //     }
            // },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            // series: [{
            //     name: 's3102',
            //     data: []
            // }]
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    // data.push({
                    //     x: time + i * 1000,
                    //     y: 0
                    // });

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: 0
                        });
                    }
                    return data;
                }()),
                color: "#009688"
            }]
        };

        this.chart2 = chart(this.chartTarget2.nativeElement, options2);
    }
    ngOnDestroy() {
        this.chart = null;
        this.chart2 = null;
        this.sub.unsubscribe();
    }




    //*********************************/
    /* SENZOR */
    //*********************************/

    private getData() {
        this.sub = this.route.params
            .switchMap(params => {

                let id = params['id']; // (+) converts string 'id' to a number

                //new senzor
                if (id == 0) {
                    //create a new senzor
                    this.item = new CellarSenzor();

                    //set senzor state
                    this.item.state = "1";



                }
                //editing existing senzor   
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

                return Observable.of("SOMETHING");
            })
            .subscribe(params => {

                this.setCharts();

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


    private deleteSenzor() {
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






    //*********************************/
    /* WEBSOCKET METHODS */
    //*********************************/

    onConnect() {
        console.log("onConnect");
    }
    onDisconnect() {
        console.log("onDisconnect");
    }

    onMessage(message) {
        let number = parseFloat(message);
        this.actualValue = number;

        var x = (new Date()).getTime(), // current time
            y = Math.round(this.actualValue);
        this.chart.series[0].addPoint([x, y], true, true)
    }

    onConnect2() {
        console.log("onConnect2");
    }
    onDisconnect2() {
        console.log("onDisconnect2");
    }

    onMessage2(message) {
        let number = parseFloat(message);
        this.actualValue2 = number;

        var x = (new Date()).getTime(), // current time
            y = Math.round(this.actualValue2);
        this.chart2.series[0].addPoint([x, y], true, true)
    }




}