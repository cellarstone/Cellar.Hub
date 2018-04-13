import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { trigger, state, animate, transition, group, query, style } from '@angular/animations';

import { ApiService } from './services/api.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeState', [
      transition('* => *', [
        group([
          query(':enter', [
            style({
              // transform: 'translateX(-100%)',
              opacity: 0
            }),
            animate('.75s ease-out',)
          ], {optional: true}),
          query(':leave', [
            animate('.5s ease-in', style({
              // transform: 'translateX(0)',
              opacity: 0
            }))
          ], {optional: true})
        ])
        
      ])
    ])
  ]
})
export class AppComponent {
  constructor(private service: ApiService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router){

      this.sharedService.activeTab = "Home"

  }

  getAnimationData(outlet: RouterOutlet) {
    const routeData = outlet.activatedRouteData['animation'];
    if(!routeData) {
      return 'rootPage';
    }
    return routeData['page'];
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
