import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscriber } from 'rxjs'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { SVGCacheService } from 'ng-inline-svg';

@Component({
  templateUrl: './space-detail.html',
  styleUrls: ['./space-detail.scss']
})
export class SpaceDetail implements OnInit {



  constructor(private router: Router,
              private svgService: SVGCacheService) {
    svgService.setBaseUrl({ baseUrl: 'http://localhost:8881/' });
 }




  ngOnInit() {
    
  }


  onFloor1(){
    this.router.navigate(['/subspace/1']);
  }

  onFloor2(){
    this.router.navigate(['/subspace/2']);
  }

  onFloor3(){
    this.router.navigate(['/subspace/3']);
  }

  onFloor4(){
    this.router.navigate(['/subspace/4']);
  }


  onBackButton() {
    this.router.navigate(['/dashboard']);
  }
}