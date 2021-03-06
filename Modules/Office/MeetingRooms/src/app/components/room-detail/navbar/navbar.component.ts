import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  
  myDate = new Date();

  ngOnInit() {
    setInterval(() => {
      this.myDate = new Date();
    }, 1000);
  }

}
