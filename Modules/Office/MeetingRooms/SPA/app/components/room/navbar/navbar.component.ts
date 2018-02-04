import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { DatePipe } from '@angular/common';

declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  activeTab: string;

  constructor(
    public sharedService: SharedService,
    private router: Router
  ) { 
  }
  myDate = new Date();

  ngOnInit() {
    setInterval(() => {         //replaced function() by ()=>
      this.myDate = new Date();
      // console.log(this.myDate); // just testing if it is working
    }, 1000);
    console.log(this.router.url)
  }
  

  onHome(){
    this.sharedService.activeTab = "Home";
    this.router.navigate(['/room/:id/home']);
  }

  onCalendar(){
    this.sharedService.activeTab = "Calendar";
    this.router.navigate(['/room/:id/calendar'])
  }

  onReception(){
    this.sharedService.activeTab = "Reception";
    this.router.navigate(['/room/:id/reception'])
  }

}
