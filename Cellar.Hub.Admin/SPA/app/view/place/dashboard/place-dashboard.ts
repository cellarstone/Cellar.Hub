import {Component,OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';

@Component({
    templateUrl: './place-dashboard.html',
    styleUrls: ['./place-dashboard.scss']
})
export class PlaceDashboard implements OnInit {
    
    lat: number = 50.108445;
    lng: number = 14.452613;
    
    ngOnInit() {
        
    }
}