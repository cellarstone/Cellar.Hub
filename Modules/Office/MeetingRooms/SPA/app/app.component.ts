import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { trigger, state, animate, transition, group, query, style } from '@angular/animations';
import { Store } from '@ngrx/store';
import { ApplicationState } from './state/state/application.state';
import { LoadAllMeetingRoomsAction } from 'app/state/actions/application.actions';

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
export class AppComponent{

  // constructor(private store: Store<ApplicationState>) {}

  // ngOnInit() {
  //   this.store.dispatch(new LoadAllMeetingRoomsAction());
  // }

  getAnimationData(outlet: RouterOutlet) {
    const routeData = outlet.activatedRouteData['animation'];
    if(!routeData) {
      return 'rootPage';
    }
    return routeData['page'];
  }


}
