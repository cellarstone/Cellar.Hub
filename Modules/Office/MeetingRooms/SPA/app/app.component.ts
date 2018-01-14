import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';

import { DataService } from './services/data.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private service: DataService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router){

      this.sharedService.activeTab = "Home"
  }


  callSomeWebApi(){

    // var aaa = this.service.search().subscribe(data555 => {
    //   console.log(data555)
    // });

    // console.log(aaa);

    // var bbb = this.service.sendPerson().subscribe(data777 => {
    //   console.log(data777);
    // })


  }

  toHome(){
    this.router.navigate(['/']);
  }

  toReception(){
    this.router.navigate(['/reception']);
  }

  toCalendar(){
    this.router.navigate(['/calendar']);
  }

}