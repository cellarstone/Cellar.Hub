import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscriber } from 'rxjs'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

//Cellarstone
import { SharedService } from '../../service/shared.service';
import { WebsocketMessage } from '../../entities/websocket/WebsocketMessage';
import { CellarSpace } from '../../entities/CellarSpace';
import { IoTService } from '../../service/iot.service';


//SVG inline
import { SVGCacheService } from 'ng-inline-svg';


//GSAP
import "gsap";
declare var TimelineMax: any;
declare var TweenMax: any;
declare var MorphSVGPlugin: any;
declare var Cubic: any;
declare var Power0: any;
declare var morphSVG: any;


@Component({
    templateUrl: './dashboard2.html',
    styleUrls: ['./dashboard2.scss']
})
export class Dashboard2 implements OnInit {

    
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


}