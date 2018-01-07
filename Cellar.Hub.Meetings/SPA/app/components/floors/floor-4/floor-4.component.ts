import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '@angular/router/src/events';
import { SharedService } from '../../../services/shared.service';

import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-floor-4',
  templateUrl: './floor-4.component.html',
  styleUrls: ['./floor-4.component.scss']
})
export class Floor4Component implements OnInit {

  ngOnInit() {
    
  }

  constructor(private sharedService: SharedService) {

  }
  

}
