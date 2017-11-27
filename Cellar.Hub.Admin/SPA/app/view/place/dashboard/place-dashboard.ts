import {Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SelectItem} from 'primeng/primeng';

import { CellarPlace } from '../../../entities/CellarPlace';


import { SharedService } from '../../../service/shared.service';
import { IoTService } from '../../../service/iot.service';

@Component({
    templateUrl: './place-dashboard.html',
    styleUrls: ['./place-dashboard.scss']
})
export class PlaceDashboard implements OnInit {
    
    lat: number = 50.108445;
    lng: number = 14.452613;

    items: CellarPlace[];
    
    constructor(private router: Router,
        private sharedService: SharedService,
        private iotservice: IoTService) { 
            this.sharedService.setCurrentRoute();
        }
    
    ngOnInit() {
        this.getData();
        
    }
    add()
    {
        this.sharedService.route("place/0");
    }


    selectItem(id: string){
        this.sharedService.route("place/"+id);
    }


    //Ziskani dat ze serveru
    private getData()
    {
        console.log('PlaceDashboard getData()');
        
        //HTTP call
         this.iotservice.GetAllCellarPlaces()
            .subscribe(res =>
            {
                let response = res;

                //BEZ CHYB ze serveru
                if (response.isOK)
                {
                    this.items = <Array<CellarPlace>>response.data;


                    var i = 5;
                }
                //NON-VALID ze serveru
                else if (!response.isValid)
                {
                    //???
                    console.error(response.validations);
                }
                //custom ERROR ze serveru
                else if (response.isCustomError)
                {
                    //???
                    console.error(response.customErrorText);
                }
                //identity ERROR ze serveru
                else if (response.isIdentityError)
                {
                    //???
                    console.error(response.identityErrorText);
                }
                //EXCEPTION ze serveru
                else if (response.isException)
                {
                    //???
                    console.error(response.exceptionText);
                }

            },
            error =>
            {
                console.error(error);
            },
            () =>
            {
                console.log('getData() completed');
            });
    }




    //Helpers
    getNumber(value: string){
        return parseFloat(value);
    }
}