import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

declare var $: any;

@Component({
  selector: 'app-floor-3',
  templateUrl: './floor-3.component.html',
  styleUrls: ['./floor-3.component.scss']
})
export class Floor3Component implements OnInit {

  constructor(private sharedService: SharedService) { 
    
  }

  ngOnInit() {
    
  }

}
