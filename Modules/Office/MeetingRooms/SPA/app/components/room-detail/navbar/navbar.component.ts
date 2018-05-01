import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';

import * as moment from 'moment';

declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  //activeTab: string;

  // constructor(
  //   private router: Router,
  //   private route: ActivatedRoute
  // ) { 
  // }
  myDate = new Date();
  //currentTime: string = '';

  ngOnInit() {
    setInterval(() => {
      this.myDate = new Date();
    }, 1000);
    // console.log(this.router.url)
    
  }

  public onHome(){
    //this.sharedService.activeTab = "Home";
    // this.router.navigate(['/room/:id/home']);
  }

  public onCalendar(){
    //this.sharedService.activeTab = "Calendar";
    // this.router.navigate(['/room/:id/calendar'])
  }

  public onReception(){
    //this.sharedService.activeTab = "Reception";
    // this.router.navigate(['/room/:id/reception'])
  }

}
