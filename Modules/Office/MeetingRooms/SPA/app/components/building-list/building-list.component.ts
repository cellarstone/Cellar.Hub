import { Component, OnInit, OnDestroy } from '@angular/core';

import "gsap";
declare var TimelineMax: any;
declare var TweenMax: any;
// declare var MorphSVGPlugin: any;
// declare var Cubic: any;
// declare var Power0: any;
// declare var morphSVG: any;
declare var Power4: any;
declare var Circ: any;
declare var $: any;
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})

export class BuildingListComponent implements OnInit {

  viewBox:any = '0 0 1920 1080';

  counter$: Observable<any>;
  dom$: Observable<any>;

  constructor() {
    
  }

  ngOnInit() {

    this.counter$ = Observable.interval(1000)
      .take(10)
  }

  startCloseAnimation() {
    this.viewBox = '300 175 1550 800';
    this.showInside();
    this.counter$.subscribe(
      (x) => console.log(x),
      (error) => console.log(error),
      () => this.closeInside()
    );
    
  }

  showInside() {
    let startAnimation = new TimelineMax();
    startAnimation
      .add('0')
      .to('#floor-1-2', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#floor-2-2', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#floor-3-2', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#floor-4-2', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#floor-1', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#floor-2', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#floor-3', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#floor-4', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#exit-2', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#breno-2', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#exit', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#breno', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#doors-outside-2', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to('#doors-outside', 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .add('3')
      .to('#wall-1-from-2', 1.5, { x: -150, autoAlpha: 0, ease: Circ.easeOut }, '3')
      .to('#wall-2-from-2', 1.5, { x: 150, autoAlpha: 0, ease: Circ.easeOut }, '3')
      .to('#wall-1-from', 1.5, { x: -150, autoAlpha: 0, ease: Circ.easeOut }, '3')
      .to('#wall-2-from', 1.5, { x: 150, autoAlpha: 0, ease: Circ.easeOut }, '3')
    return startAnimation;
  }

  closeInside() {
    this.viewBox = '0 0 1920 1080'
    let stopAnimation = new TimelineMax();
    stopAnimation
    .add('1')
    .to('#wall-1-from-2', 1.5, { x: 0, autoAlpha: 1, ease: Circ.easeOut }, '1')
    .to('#wall-2-from-2', 1.5, { x: 0, autoAlpha: 1, ease: Circ.easeOut }, '1')
    .to('#wall-1-from', 1.5, { x: 0, autoAlpha: 1, ease: Circ.easeOut }, '1')
    .to('#wall-2-from', 1.5, { x: 0, autoAlpha: 1, ease: Circ.easeOut }, '1')
    .add('2')
    .to('#floor-1-2', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#floor-2-2', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#floor-3-2', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#floor-4-2', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#floor-1', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#floor-2', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#floor-3', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#floor-4', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#exit-2', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#breno-2', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#exit', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#breno', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#doors-outside-2', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to('#doors-outside', .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
  }

  ngOnDestroy() {
    let stopSubscription$ = this.counter$.subscribe();
    stopSubscription$.unsubscribe();
  }

}

