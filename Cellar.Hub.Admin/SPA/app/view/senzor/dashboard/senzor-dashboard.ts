import {Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SelectItem} from 'primeng/primeng';

import { SharedService } from '../../../service/shared.service';

@Component({
    templateUrl: './senzor-dashboard.html'
})
export class SenzorDashboard implements OnInit {
    
    

    constructor(private sharedService: SharedService) { 
        this.sharedService.setCurrentRoute();
    }
    
    ngOnInit() {
        
        
    }

    

}