import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscriber } from 'rxjs'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { WebsocketMessage } from '../../entities/websocket/WebsocketMessage';
import { CellarSpace } from '../../entities/CellarSpace';

import { IoTService } from '../../service/iot.service';
import { WebsocketService } from '../../service/websocket.service';
import { SharedService } from '../../service/shared.service';
import { WebsocketService2 } from '../../service/websocket2.service';



import "gsap";
// declare var $: any
declare var TimelineMax: any;
declare var TweenMax: any;
declare var MorphSVGPlugin: any;
declare var Cubic: any;
declare var Power0: any;
declare var morphSVG: any;


@Component({
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {

    // CHAT_URL = 'ws://192.168.1.234:4000';
    public message: string;

    constructor(private iotService: IoTService,
        private websocketService: WebsocketService,
        private sharedService: SharedService,
        private websocketService1: WebsocketService2,
        private websocketService2: WebsocketService2,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {

        // let building1 = document.getElementById("building1");
        // let building2 = document.getElementById("building2");

        // let scene_buildings = new TimelineMax({ yoyo: true, repeat: -1 });
        // scene_buildings.from(building1, 1, { scale: this.getRandomNumber(0.7, 1.5), transformOrigin: "50% 50%", ease: Power0.easeOut, yoyo: true })
        //     .from(building2, 1, { scale: this.getRandomNumber(0.7, 1.5), transformOrigin: "50% 50%", ease: Power0.easeOut, yoyo: true }, 0);

        this.getSpaces();
        this.startWebSocketStreaming();
    }













    // 1. Get Spaces with parentId = 0
    getSpaces(){
        this.iotService.GetCellarSpace().subscribe(
                data => {
                    console.log(data);
    
                    
                },
                error => console.error(error));
    }



    getRandomNumberRounded(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }



    // private s2315_temperature_Value: string;
    // private s2315_humidity_Value: string;

    // private s2316_temperature_Value: string;
    // private s2316_humidity_Value: string;

    // private s2317_temperature_Value: string;
    // private s2317_humidity_Value: string;

    // private s2318_temperature_Value: string;
    // private s2318_humidity_Value: string;


    startWebSocketStreaming() {

        // this.watchS2315temperature()
        //     .subscribe(
        //     data => {
        //         console.log(data);

        //         var socketId = data.split(['|||'])[0];
        //         var data = data.split(['|||'])[1];

        //         var senzorId = data.split(['|'])[0];
        //         var measurement = data.split(['|'])[1];
        //         var value = data.split(['|'])[2];

        //         this.s2315_temperature_Value = value;
        //     },
        //     error => console.error(error));

        // this.watchS2315humidity()
        //     .subscribe(
        //     data => {
        //         console.log(data);

        //         var socketId = data.split(['|||'])[0];
        //         var data = data.split(['|||'])[1];

        //         var senzorId = data.split(['|'])[0];
        //         var measurement = data.split(['|'])[1];
        //         var value = data.split(['|'])[2];

        //         this.s2315_humidity_Value = value;
        //     },
        //     error => console.error(error));


        // this.watchS2316temperature()
        //     .subscribe(
        //     data => {
        //         console.log(data);

        //         var socketId = data.split(['|||'])[0];
        //         var data = data.split(['|||'])[1];

        //         var senzorId = data.split(['|'])[0];
        //         var measurement = data.split(['|'])[1];
        //         var value = data.split(['|'])[2];

        //         this.s2316_temperature_Value = value;
        //     },
        //     error => console.error(error));

        // this.watchS2316humidity()
        // .subscribe(
        // data => {
        //     console.log(data);

        //     var socketId = data.split(['|||'])[0];
        //     var data = data.split(['|||'])[1];

        //     var senzorId = data.split(['|'])[0];
        //     var measurement = data.split(['|'])[1];
        //     var value = data.split(['|'])[2];

        //     this.s2316_humidity_Value = value;
        // },
        // error => console.error(error));

        // this.watchS2317temperature()
        //     .subscribe(
        //     data => {
        //         console.log(data);

        //         if (data.includes(['|||'])) {

        //             var socketId = data.split(['|||'])[0];
        //             var data = data.split(['|||'])[1];

        //             var senzorId = data.split(['|'])[0];
        //             var measurement = data.split(['|'])[1];
        //             var value = data.split(['|'])[2];

        //             this.s2317_temperature_Value = value;
        //         }
        //     },
        //     error => console.error(error));

        // this.watchS2317humidity()
        //     .subscribe(
        //     data => {
        //         console.log(data);


        //         if (data.includes(['|||'])) {
        //             var socketId = data.split(['|||'])[0];
        //             var data = data.split(['|||'])[1];

        //             var senzorId = data.split(['|'])[0];
        //             var measurement = data.split(['|'])[1];
        //             var value = data.split(['|'])[2];


        //             this.s2317_humidity_Value = value;
        //         }
        //     },
        //     error => console.error(error));

        // this.watchS2318temperature()
        //     .subscribe(
        //     data => {
        //         console.log(data);

        //         var socketId = data.split(['|||'])[0];
        //         var data = data.split(['|||'])[1];

        //         var senzorId = data.split(['|'])[0];
        //         var measurement = data.split(['|'])[1];
        //         var value = data.split(['|'])[2];

        //         this.s2318_temperature_Value = value;
        //     },
        //     error => console.error(error));

        // this.watchS2318humidity()
        // .subscribe(
        // data => {
        //     console.log(data);

        //     var socketId = data.split(['|||'])[0];
        //     var data = data.split(['|||'])[1];

        //     var senzorId = data.split(['|'])[0];
        //     var measurement = data.split(['|'])[1];
        //     var value = data.split(['|'])[2];

        //     this.s2318_humidity_Value = value;
        // },
        // error => console.error(error));








        this.subscribewebsocket()
        .subscribe(
        data => {
            console.log(data);


            this.message = data;
        },
        error => console.error(error));
    }



    // watchS2315temperature(): Observable<any> {
    //     let openSubscriber = Subscriber.create(
    //         () => this.websocketService.send({ productId: 56464564644 }));

    //     return this.websocketService.createObservableSocket('ws://localhost:5000/s2315/temperature', openSubscriber)
    //         .map(message => '{' + message + '}');
    // }

    // watchS2315humidity(): Observable<any> {
    //     let openSubscriber = Subscriber.create(
    //         () => this.websocketService.send({ productId: 56464564644 }));

    //     return this.websocketService.createObservableSocket('ws://localhost:5000/s2315/humidity', openSubscriber)
    //         .map(message => '{' + message + '}');
    // }

    // watchS2316temperature(): Observable<any> {
    //     let openSubscriber = Subscriber.create(
    //         () => this.websocketService.send({ productId: 56464564644 }));

    //     return this.websocketService.createObservableSocket('ws://localhost:5000/s2316/temperature', openSubscriber)
    //         .map(message => '{' + message + '}');
    // }

    // watchS2316humidity(): Observable<any> {
    //     let openSubscriber = Subscriber.create(
    //         () => this.websocketService.send({ productId: 56464564644 }));

    //     return this.websocketService.createObservableSocket('ws://localhost:5000/s2316/humidity', openSubscriber)
    //         .map(message => '{' + message + '}');
    // }


    // watchS2317temperature(): Observable<any> {
    //     let openSubscriber = Subscriber.create(
    //         () => { });

    //     return this.websocketService1.createObservableSocket('ws://localhost:5000/s2317/temperature', openSubscriber)
    //         .map(message => message);
    // }

    // watchS2317humidity(): Observable<any> {
    //     let openSubscriber = Subscriber.create(
    //         () => { });

    //     return this.websocketService2.createObservableSocket('ws://localhost:5000/s2317/humidity', openSubscriber)
    //         .map(message => message);
    // }

    // watchS2318temperature(): Observable<any> {
    //     let openSubscriber = Subscriber.create(
    //         () => this.websocketService.send({ productId: 56464564644 }));

    //     return this.websocketService.createObservableSocket('ws://localhost:5000/s2318/temperature', openSubscriber)
    //         .map(message => '{' + message + '}');
    // }

    // watchS2318humidity(): Observable<any> {
    //     let openSubscriber = Subscriber.create(
    //         () => this.websocketService.send({ productId: 56464564644 }))

    //     return this.websocketService.createObservableSocket('ws://localhost:5000/s2318/humidity', openSubscriber)
    //         .map(message => '{' + message + '}');
    // }




    // private redirectToSenzor() {
    //     this.router.navigate(['/senzor/1']);
    // }


    // private createObjectToMongoDB() {

    //     console.log('Dashboard GetCellarSpace()');

    //     var newOne = new CellarSpace();
    //     newOne.Name = "test-" + Math.random();
    //     // newOne.Type = CellarSpaceType.Building;

    //     // HTTP call
    //     this.iotService.GetCellarSpace(1)
    //         .subscribe(res => {
    //             let response = res;

    //             //BEZ CHYB ze serveru
    //             if (response.isOK) {


    //                 var i = 5;
    //             }
    //             //NON-VALID ze serveru
    //             else if (!response.isValid) {
    //                 //???
    //                 console.error(response.validations);
    //             }
    //             //custom ERROR ze serveru
    //             else if (response.isCustomError) {
    //                 //???
    //                 console.error(response.customErrorText);
    //             }
    //             //identity ERROR ze serveru
    //             else if (response.isIdentityError) {
    //                 //???
    //                 console.error(response.identityErrorText);
    //             }
    //             //EXCEPTION ze serveru
    //             else if (response.isException) {
    //                 //???
    //                 console.error(response.exceptionText);
    //             }

    //         },
    //         error => {
    //             console.error(error);
    //         },
    //         () => {
    //             console.log('getData() completed');
    //         });

    // }



    onBackButton(){
        this.router.navigate(['/']);
    }

    onBuilding1(){
        this.router.navigate(['/space']);
    }


    subscribewebsocket(): Observable<any> {
        let openSubscriber = Subscriber.create(
            () => {});

        return this.websocketService1.createObservableSocket('', openSubscriber)
            .map(message => message);
    }



}