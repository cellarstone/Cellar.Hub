import {Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SelectItem} from 'primeng/primeng';

@Component({
    templateUrl: './space-dashboard.html'
})
export class SpaceDashboard implements OnInit {
    
    barData: any;

    constructor(private router: Router) { }
    
    ngOnInit() {
        this.barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#00acac',
                    borderColor: '#00acac',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#2f8ee5',
                    borderColor: '#2f8ee5',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }
        
    }

    

    add()
    {
        this.router.navigate(['space/0']);
    }

}