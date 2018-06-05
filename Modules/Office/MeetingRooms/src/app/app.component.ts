import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { trigger, state, animate, transition, group, query, style } from '@angular/animations';
import { Store } from '@ngrx/store';
import { ApplicationState } from './state/state/application.state';
import { LoadAllMeetingRoomsAction } from 'app/state/actions/application.actions';
import { SwUpdate } from '@angular/service-worker';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
            animate('.75s ease-out', )
          ], { optional: true }),
          query(':leave', [
            animate('.5s ease-in', style({
              // transform: 'translateX(0)',
              opacity: 0
            }))
          ], { optional: true })
        ])

      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  getAnimationData(outlet: RouterOutlet) {
    const routeData = outlet.activatedRouteData['animation'];
    if (!routeData) {
      return 'rootPage';
    }
    return routeData['page'];
  }

  private unsubscribe$ = new Subject();

  constructor(private swUpdate: SwUpdate) {
    //if service worker is enabled
    if (this.swUpdate.isEnabled) {
      console.log("service worker is enabled");

      //refresh browser if user agreed
      this.swUpdate.available
        // .pipe(
        //     takeUntil(this.unsubscribe$)
        // )
        .subscribe((event) => {
          console.log("new update available");
          if (confirm("New version available. Reload App ? :-)")) {
            window.location.reload();
          }
        });
    }
  }

  ngOnInit() {

    // VARIANT 1 - UNFORTUNATELLY DOESN'T WORK YET    
    //set automatically interval to check a new version
    // interval(60000)
    //     .pipe(
    //         takeUntil(this.unsubscribe$)
    //     )
    //     .subscribe(() => {
    //         console.log("check for update");
    //         this.swUpdate.checkForUpdate()
    //             .then(() => {
    //                 console.log('checkForUpdate completed')
    //             })
    //             .catch(err => {
    //                 console.error(err);
    //             });
    //     });

    // VARIANT 2 - UNFORTUNATELLY DOESN'T WORK YET    
    //setInterval(() => { this.checkForUpdate(); }, 1000 * 60);

  }

  // VARIANT 2 - UNFORTUNATELLY DOESN'T WORK YET    
  // checkForUpdate(){
  //     console.log("check for update");
  //                 this.swUpdate.checkForUpdate()
  //                     .then(() => {
  //                         console.log('checkForUpdate completed')
  //                     })
  //                     .catch(err => {
  //                         console.error(err);
  //                     });
  // }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
