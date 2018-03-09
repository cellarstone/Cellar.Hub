import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-floor-3',
  templateUrl: './floor-3.component.html',
  styleUrls: ['./floor-3.component.scss']
})
export class Floor3Component implements OnInit {

  constructor(private router: Router) { 
    
  }

  ngOnInit() {
    $("body").css("background-color", 'white');

    
  }

  // public onLoadButan(name: string) {
  //   this.router.navigate(
  //     ['/room', 'butan', 'reception', 'snacks'],  {queryParams: {allowEdit: '1'}, fragment:'loading'}
  //   );
  // }

}
