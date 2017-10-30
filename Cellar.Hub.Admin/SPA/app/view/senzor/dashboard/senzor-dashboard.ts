import {Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SelectItem} from 'primeng/primeng';

@Component({
    templateUrl: './senzor-dashboard.html'
})
export class SenzorDashboard implements OnInit {
    
    

    constructor(private router: Router) { }
    
    ngOnInit() {
        
        
    }

    

    add()
    {
        this.router.navigate(['senzor/0']);
    }

}