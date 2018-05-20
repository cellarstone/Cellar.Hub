import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable, interval, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
 
import { TweenMax, TimelineMax, Power1, Power4, Circ } from 'gsap';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})

export class BuildingListComponent implements OnInit {

  private unsubscribe$ = new Subject();
  
  counter$: Observable<any>;

  buildingSelection: HTMLElement;
  floor_1_2: HTMLElement;
  floor_2_2: HTMLElement;
  floor_3_2: HTMLElement;
  floor_4_2: HTMLElement;
  floor1: HTMLElement;
  floor2: HTMLElement;
  floor3: HTMLElement;
  floor4: HTMLElement;
  exit_2: HTMLElement;
  breno_2: HTMLElement;
  exit: HTMLElement;
  breno: HTMLElement;
  doors_outside_2: HTMLElement;
  doors_outside: HTMLElement;

  wall_1_from_2: HTMLElement;
  wall_2_from_2: HTMLElement;
  wall_1_from: HTMLElement;
  wall_2_from: HTMLElement;

  constructor() {}



  ngOnInit() {
    // $("body").css("background-color", 'var(--color-navy-dark-2)');
    this.counter$ = interval(1000).pipe(take(10));

    this.buildingSelection = document.getElementById("building-selection");
    this.floor_1_2 = document.getElementById("floor-1-2");
    this.floor_2_2 = document.getElementById("floor-2-2");
    this.floor_3_2 = document.getElementById("floor-3-2");
    this.floor_4_2 = document.getElementById("floor-4-2");
    this.floor1 = document.getElementById("floor-1");
    this.floor2 = document.getElementById("floor-2");
    this.floor3 = document.getElementById("floor-3");
    this.floor4 = document.getElementById("floor-4");
    this.exit_2 = document.getElementById("exit-2");
    this.breno_2 = document.getElementById("breno-2");
    this.exit = document.getElementById("exit");
    this.breno = document.getElementById("breno");
    this.doors_outside_2 = document.getElementById("doors-outside-2");
    this.doors_outside = document.getElementById("doors-outside");
    this.wall_1_from_2 = document.getElementById("wall-1-from-2");
    this.wall_2_from_2 = document.getElementById("wall-2-from-2");
    this.wall_1_from = document.getElementById("wall-1-from");
    this.wall_2_from = document.getElementById("wall-2-from");
  }

  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  startCloseAnimation() {
    setTimeout(() => {
      this.showInside();
      this.counter$.pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (x) => console.log(x),
        () => this.closeInside()
      );
    }, 0)    
  }

  showInside() {
    let startAnimation = new TimelineMax();

    

    startAnimation
      .to(this.buildingSelection, .5, {attr: {viewBox: "400 250 1400 800"}, ease: Power1.easeOut})
      .add('0') 
      .to(this.floor_1_2, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.floor_2_2, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.floor_3_2, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.floor_4_2, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.floor1, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.floor2, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.floor3, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.floor4, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.exit_2, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.breno_2, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.exit, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.breno, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.doors_outside_2, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      .to(this.doors_outside, 0.75, { autoAlpha: 0, ease: Power4.easeInOut }, '0')
      // .add('3')
      .to(this.wall_1_from_2, 1, { x: -150, autoAlpha: 0, ease: Circ.easeOut }, '0')
      .to(this.wall_2_from_2, 1, { x: 150, autoAlpha: 0, ease: Circ.easeOut }, '0')
      .to(this.wall_1_from, 1, { x: -150, autoAlpha: 0, ease: Circ.easeOut }, '0')
      .to(this.wall_2_from, 1, { x: 150, autoAlpha: 0, ease: Circ.easeOut }, '0') 
    return startAnimation;
  }

  closeInside() {
    let stopAnimation = new TimelineMax();

    stopAnimation
    .to(this.buildingSelection, .5, {attr: {viewBox: "0 0 1920 1080"}, ease: Power1.easeInOut})
    .add('1')
    .to(this.wall_1_from_2, 1, { x: 0, autoAlpha: 1, ease: Circ.easeOut }, '1')
    .to(this.wall_2_from_2, 1, { x: 0, autoAlpha: 1, ease: Circ.easeOut }, '1')
    .to(this.wall_1_from, 1, { x: 0, autoAlpha: 1, ease: Circ.easeOut }, '1')
    .to(this.wall_2_from, 1, { x: 0, autoAlpha: 1, ease: Circ.easeOut }, '1')
    .add('2')
    .to(this.floor_1_2, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.floor_2_2, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.floor_3_2, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.floor_4_2, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.floor1, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.floor2, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.floor3, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.floor4, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.exit_2, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.breno_2, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.exit, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.breno, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.doors_outside_2, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2')
    .to(this.doors_outside, .75, { autoAlpha: 1, ease: Power4.easeInOut }, '2');
    return stopAnimation;
  }

}

