import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable'

import { CellarSpace } from '../../entities/CellarSpace';

import { IoTService } from '../../service/iot.service';
import { SharedService } from '../../service/shared.service';



import "gsap";
declare var $: any
declare var TimelineMax: any;
declare var TweenMax: any;
declare var MorphSVGPlugin: any;
declare var Cubic: any;
declare var Power0: any;
declare var morphSVG: any;


@Component({
    templateUrl: './login.html'
})
export class Login implements OnInit {



    constructor(
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
    let cloud1 = document.getElementById("cloud1");
    let cloud2 = document.getElementById("cloud2");
    let cloud3 = document.getElementById("cloud3");
    let cloud4 = document.getElementById("cloud4");


    let sun = document.getElementById("main");
    let shine1 = document.getElementById("shine1");
    let shine2 = document.getElementById("shine2");
    let shine3 = document.getElementById("shine3");


    let bird1 = document.getElementById("bird1");
    let bird2 = document.getElementById("bird2");
    let bird3 = document.getElementById("bird3");
    let bird4 = document.getElementById("bird4");



    let grass1 = $("#grass111 path");
    let grass2 = $("#grass222 path");

    let motionPath = $("#motionPath");

    //TweenMax.to(cloud1, 1, {opacity:0, y: 50});


    let scene_clouds = new TimelineMax({ yoyo: true, repeat: -1 });
    scene_clouds.to(cloud1, 20, { x: this.getRandomNumberRounded(550, -550), ease: Power0.easeIn })
      .to(cloud2, 20, { x: this.getRandomNumberRounded(550, -550), ease: Power0.easeIn }, 0)
      .to(cloud3, 20, { x: this.getRandomNumberRounded(550, -550), ease: Power0.easeIn }, 0)
      .to(cloud4, 20, { x: this.getRandomNumberRounded(550, -550), ease: Power0.easeInd }, 0);



    let rndN1 = this.getRandomNumber(0.7, 1.5);

    let scene_sun = new TimelineMax({ yoyo: true, repeat: -1 });
    scene_sun.from(shine1, 1, { scale: this.getRandomNumber(0.7, 1.5), transformOrigin: "50% 50%", ease: Power0.easeOut, yoyo: true })
      .from(shine2, 1, { scale: this.getRandomNumber(0.7, 1.5), transformOrigin: "50% 50%", ease: Power0.easeOut, yoyo: true }, 0)
      .from(shine3, 1, { scale: this.getRandomNumber(0.7, 1.5), transformOrigin: "50% 50%", ease: Power0.easeOut, yoyo: true }, 0);





    // let scene_birds = new TimelineMax({ yoyo: true, repeat: -1 });
    // scene_birds.to(bird1, 1, { scale: this.getRandomNumber(0.7, 1.5), transformOrigin: "50% 50%", ease: Power0.easeOut, yoyo: true })
    //   .to(bird2, 1, { x: this.getRandomNumberRounded(550, -550),ease: Power0.easeIn }, 0)
    //   .to(bird3, 1, { x: this.getRandomNumberRounded(550, -550), ease: Power0.easeIn }, 0)
    //   .to(bird4, 1, { scale: this.getRandomNumber(0.7, 1.5), transformOrigin: "50% 50%", ease: Power0.easeOut, yoyo: true }, 0);


    //MOTION PATH
    var bezier = MorphSVGPlugin.pathDataToBezier("#motionPath");
    

    // BIRDS
    let scene_birds = new TimelineMax();
    scene_birds.to(bird1, 10, { bezier, ease: Power0.easeIns, yoyo: true, repeat: -1 })

    // GRASS LEFT
    for (var index = 0; index < grass1.length; index++) {
      var elementttt = grass1[index];
      TweenMax.to(elementttt, 1, { skewX: this.getRandomNumber(5, 10), transformOrigin: "50% 50%", ease: Power0.easeOut, yoyo: true, repeat: -1 });
    }

    // GRASS RIGHT
    for (var index = 0; index < grass2.length; index++) {
      var elementttt = grass2[index];
      TweenMax.to(elementttt, 1, { skewX: this.getRandomNumber(5, 10), transformOrigin: "50% 50%", ease: Power0.easeOut, yoyo: true, repeat: -1 });
    }

    // TweenMax.to("#motionPath", 5, {drawSVG:"0%"});

    // FOREST BOOM - PHYSICS 2D
    // var element = $("#forest path");
    // for (var index = 0; index < element.length; index++) {
    //   var elementttt = element[index];

    //   var rn1 = this.getRandomNumberRounded(300, 500);
    //   var an1 = this.getRandomNumberRounded(-90, -45);

    //   TweenMax.to(elementttt, 6, { physics2D: { velocity: rn1, angle: an1, gravity: 300 } });
    // }



  }



    getRandomNumberRounded(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }





    public login() {

        console.log('loginclicked');
        this.router.navigate(['/dashboard']);
    }


}