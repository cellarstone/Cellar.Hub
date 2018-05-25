import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  constructor(private swUpdate: SwUpdate) { 
    //set automatically interval to check a new version
      interval(60000)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          console.log("check for update");
            this.swUpdate.checkForUpdate()
                          .then(() => {
                            console.log('checkForUpdate completed')
                          })
                          .catch(err => {
                            console.error(err);
                          });
        });
  }

  ngOnInit() {
    console.log("ngOnInit");
    //if service worker is enabled
    if (this.swUpdate.isEnabled) {
      console.log("service worker is enabled");

      //refresh browser if user agreed
      this.swUpdate.available
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((event) => {
          console.log("new update available");
          if (confirm("New version available. Reload App ? :-)")) {
            window.location.reload();
          }
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
