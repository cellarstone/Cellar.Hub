import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscriber } from 'rxjs'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { WebsocketMessage } from '../../entities/websocket/WebsocketMessage';
import { CellarSpace } from '../../entities/CellarSpace';

import { IoTService } from '../../service/iot.service';
import { SharedService } from '../../service/shared.service';


import { SVGCacheService } from 'ng-inline-svg';


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
        private sharedService: SharedService,
        private route: ActivatedRoute,
        private router: Router,
        private svgService: SVGCacheService) {
            svgService.setBaseUrl({ baseUrl: 'http://localhost:8881/' });
         }

    ngOnInit() {
    }


    // 1. Get Spaces with parentId = 0
    getSpaces(){
        this.iotService.GetCellarSpace().subscribe(
                data => {
                    console.log(data);
    
                    
                },
                error => console.error(error));
    }



   

    onBackButton(){
        this.router.navigate(['/']);
    }

    onHall1(){
        this.router.navigate(['/space/1']);
    }

    onHall2(){
        this.router.navigate(['/space2/2']);
    }



}