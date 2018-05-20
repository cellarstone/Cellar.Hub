import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private swUpdate: SwUpdate){}

  ngOnInit(){
    //if service worker is enabled
      if(this.swUpdate.isEnabled){
        //set automatically interval to check a new version
        interval(60000).subscribe(() => {
          this.swUpdate.checkForUpdate();
        });
        //refresh browser if user agreed
        this.swUpdate.available.subscribe((event) => {
          if(confirm("New version available. Reload App ? :-)")){
            window.location.reload();
          }
        });
      }
  }
}
