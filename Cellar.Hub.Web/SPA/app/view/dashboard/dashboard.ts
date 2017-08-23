import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { WebsocketMessage } from '../../entities/websocket/WebsocketMessage';
import { CellarSpace } from '../../entities/CellarSpace';
import { CellarSpaceType } from '../../entities/CellarSpaceType';

import { IoTService } from '../../service/iot.service';
import { WebsocketService } from '../../service/websocket.service';
import { SharedService } from '../../service/shared.service';



import "gsap";
// declare var $: any
declare var TimelineMax: any;
declare var TweenMax: any;
declare var MorphSVGPlugin: any;
declare var Cubic: any;
declare var Power0: any;
declare var morphSVG: any;


@Component({
    templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {

    CHAT_URL = 'ws://localhost:4000/';
    public messages: Subject<WebsocketMessage>;

    constructor(private iotService: IoTService,
        private websocketService: WebsocketService,
        private sharedService: SharedService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {

        let building1 = document.getElementById("building1");
        let building4 = document.getElementById("building4");
        let building5 = document.getElementById("building5");

        let scene_buildings = new TimelineMax({ yoyo: true, repeat: -1 });
        scene_buildings.from(building1, 1, { scale: this.getRandomNumber(0.7, 1.5), transformOrigin: "50% 50%", ease: Power0.easeOut, yoyo: true })
            .from(building4, 1, { scale: this.getRandomNumber(0.7, 1.5), transformOrigin: "50% 50%", ease: Power0.easeOut, yoyo: true }, 0)
            .from(building5, 1, { scale: this.getRandomNumber(0.7, 1.5), transformOrigin: "50% 50%", ease: Power0.easeOut, yoyo: true }, 0);

    }



    getRandomNumberRounded(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }





    private redirectToSenzor() {
        this.router.navigate(['/senzor/1']);
    }


    private createObjectToMongoDB() {

        console.log('Dashboard GetCellarSpace()');

        var newOne = new CellarSpace();
        newOne.Name = "test-" + Math.random();
        newOne.Type = CellarSpaceType.Building;

        // HTTP call
        this.iotService.GetCellarSpace(1)
            .subscribe(res => {
                let response = res;

                //BEZ CHYB ze serveru
                if (response.isOK) {


                    var i = 5;
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


    private subscribewebsocket() {
        this.messages = <Subject<WebsocketMessage>>this.websocketService
        .connect(this.CHAT_URL)
        .map((response: MessageEvent): WebsocketMessage => {
            let data = JSON.parse(response.data);
            return {
                topic: data.topic,
                data: data.data
            }
        });
    }



}