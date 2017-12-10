//angular
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//primeNG
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

//cellarstone
import { CellarSpace } from '../../../entities/CellarSpace';
import { CellarSenzor } from '../../../entities/CellarSenzor';

import { IoTService } from '../../../service/iot.service';


//others
declare var jQuery: any;
import { chart } from 'highcharts';


//http + rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

//websocket
import { Socket } from '../../../service/Socket';
import { ApplicationState } from 'app/state/state/application.state';

//ngRx
import { Store } from '@ngrx/store';
import { LoadCellarSenzorAction } from 'app/state/actions/actions';
import * as RouterActions from 'app/state/actions/router-actions';

@Component({
    templateUrl: './senzor-detail.html',
    styleUrls: ['./senzor-detail.scss']
})
export class SenzorDetail {

    item$: Observable<CellarSenzor>;

    private sub: any;


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
        private store: Store<ApplicationState>,
        public iotservice: IoTService) {

        //websockets
        this.socket = new Socket("ws://localhost:8080/ws/s3102temperature");
        this.socket.on('connect', this.onConnect.bind(this));
        this.socket.on('disconnect', this.onDisconnect.bind(this));
        this.socket.on('message', this.onMessage.bind(this));

        this.socket2 = new Socket("ws://localhost:8080/ws/s3102status");
        this.socket2.on('connect', this.onConnect2.bind(this));
        this.socket2.on('disconnect', this.onDisconnect2.bind(this));
        this.socket2.on('message', this.onMessage2.bind(this));


        this.item$ = this.store.select(mapSenzorFromState);


    }


    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {

            let id = params['id']; // (+) converts string 'id' to a number
            this.store.dispatch(new LoadCellarSenzorAction(id));

        });
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

    private saveSenzor(item: CellarSenzor) {


        


        // //UPDATE produktu
        // if (this.item.id != undefined) {
        //     this.iotservice.UpdateCellarSenzor(this.item)
        //         .subscribe(art => {
        //             let response = art;

        //             //BEZ CHYB ze serveru
        //             if (response.isOK) {
        //                 this.item = <CellarSenzor>response.data;

        //                 this.sharedService.routeBack();

        //                 // this.messagesToUser.push({
        //                 //     severity: 'success',
        //                 //     summary: '! UPDATED !',
        //                 //     detail: 'Senzor has been updated'
        //                 // });
        //             }
        //             //NON-VALID ze serveru
        //             else if (!response.isValid) {
        //                 //???
        //                 console.error(response.validations);

        //                 this.messagesToUser.push({
        //                     severity: 'error',
        //                     summary: 'From Server',
        //                     detail: 'Non-valid'
        //                 });
        //             }
        //             //custom ERROR ze serveru
        //             else if (response.isCustomError) {
        //                 //???
        //                 console.error(response.customErrorText);

        //                 this.messagesToUser.push({
        //                     severity: 'error',
        //                     summary: 'From Server',
        //                     detail: 'Custom Error -' + response.customErrorText
        //                 });
        //             }
        //             //identity ERROR ze serveru
        //             else if (response.isIdentityError) {
        //                 //???
        //                 console.error(response.identityErrorText);

        //                 this.messagesToUser.push({
        //                     severity: 'error',
        //                     summary: 'From Server',
        //                     detail: 'Identity Error -' + response.identityErrorText
        //                 });
        //             }
        //             //EXCEPTION ze serveru
        //             else if (response.isException) {
        //                 //???
        //                 console.error(response.exceptionText);

        //                 this.messagesToUser.push({
        //                     severity: 'error',
        //                     summary: 'From Server',
        //                     detail: 'Exception -' + response.exceptionText
        //                 });
        //             }
        //         },
        //         error => {
        //             console.error(error);

        //             this.messagesToUser.push({
        //                 severity: 'error',
        //                 summary: 'From ???',
        //                 detail: error
        //             });
        //         },
        //         () => {
        //             console.log('saveSenzor() completed');
        //         });
        // }
        // //ZALOZENI noveho produktu
        // else {
        //     this.iotservice.AddCellarSenzor(this.item)
        //         .subscribe(art => {
        //             let response = art;

        //             //BEZ CHYB ze serveru
        //             if (response.isOK) {
        //                 this.item = <CellarSenzor>response.data;


        //                 //this.messagesToUser.push({
        //                 //    severity: 'success',
        //                 //    summary: '! ADDED !',
        //                 //    detail: 'Product has been added'
        //                 //});

        //                 this.sharedService.routeBack();


        //             }
        //             //NON-VALID ze serveru
        //             else if (!response.isValid) {
        //                 //???
        //                 console.error(response.validations);

        //                 this.messagesToUser.push({
        //                     severity: 'error',
        //                     summary: 'From Server',
        //                     detail: 'Non-valid'
        //                 });
        //             }
        //             //custom ERROR ze serveru
        //             else if (response.isCustomError) {
        //                 //???
        //                 console.error(response.customErrorText);

        //                 this.messagesToUser.push({
        //                     severity: 'error',
        //                     summary: 'From Server',
        //                     detail: 'Custom Error -' + response.customErrorText
        //                 });
        //             }
        //             //identity ERROR ze serveru
        //             else if (response.isIdentityError) {
        //                 //???
        //                 console.error(response.identityErrorText);

        //                 this.messagesToUser.push({
        //                     severity: 'error',
        //                     summary: 'From Server',
        //                     detail: 'Identity Error -' + response.identityErrorText
        //                 });
        //             }
        //             //EXCEPTION ze serveru
        //             else if (response.isException) {
        //                 //???
        //                 console.error(response.exceptionText);

        //                 this.messagesToUser.push({
        //                     severity: 'error',
        //                     summary: 'From Server',
        //                     detail: 'Exception -' + response.exceptionText
        //                 });
        //             }
        //         },
        //         error => {
        //             console.error(error);

        //             this.messagesToUser.push({
        //                 severity: 'error',
        //                 summary: 'From ???',
        //                 detail: error
        //             });
        //         },
        //         () => {
        //             console.log('saveProduct() completed');
        //         });
        // }

    }


    private deleteSenzor(item: CellarSenzor) {
        // this.iotservice.RemoveCellarSenzor(this.item.id)
        //     .subscribe(art => {
        //         let response = art;

        //         //BEZ CHYB ze serveru
        //         if (response.isOK) {
        //             this.item = <CellarSenzor>response.data;

        //             this.sharedService.routeBack();

        //             // this.messagesToUser.push({
        //             //     severity: 'success',
        //             //     summary: '! UPDATED !',
        //             //     detail: 'Senzor has been updated'
        //             // });
        //         }
        //         //NON-VALID ze serveru
        //         else if (!response.isValid) {
        //             //???
        //             console.error(response.validations);

        //             this.messagesToUser.push({
        //                 severity: 'error',
        //                 summary: 'From Server',
        //                 detail: 'Non-valid'
        //             });
        //         }
        //         //custom ERROR ze serveru
        //         else if (response.isCustomError) {
        //             //???
        //             console.error(response.customErrorText);

        //             this.messagesToUser.push({
        //                 severity: 'error',
        //                 summary: 'From Server',
        //                 detail: 'Custom Error -' + response.customErrorText
        //             });
        //         }
        //         //identity ERROR ze serveru
        //         else if (response.isIdentityError) {
        //             //???
        //             console.error(response.identityErrorText);

        //             this.messagesToUser.push({
        //                 severity: 'error',
        //                 summary: 'From Server',
        //                 detail: 'Identity Error -' + response.identityErrorText
        //             });
        //         }
        //         //EXCEPTION ze serveru
        //         else if (response.isException) {
        //             //???
        //             console.error(response.exceptionText);

        //             this.messagesToUser.push({
        //                 severity: 'error',
        //                 summary: 'From Server',
        //                 detail: 'Exception -' + response.exceptionText
        //             });
        //         }
        //     },
        //     error => {
        //         console.error(error);

        //         this.messagesToUser.push({
        //             severity: 'error',
        //             summary: 'From ???',
        //             detail: error
        //         });
        //     },
        //     () => {
        //         console.log('saveSenzor() completed');
        //     });
    }

    private cancelSenzor() {
        this.store.dispatch(new RouterActions.Back());
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



function mapSenzorFromState(state: ApplicationState): CellarSenzor {
    if (state.storeData == undefined) {
        return undefined;
    }

    return state.storeData.selectedSenzor;
}