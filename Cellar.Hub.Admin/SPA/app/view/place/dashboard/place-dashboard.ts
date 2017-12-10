import {Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SelectItem} from 'primeng/primeng';

import { CellarPlace } from '../../../entities/CellarPlace';


import { IoTService } from '../../../service/iot.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
import * as RouterActions from 'app/state/actions/router-actions';

@Component({
    templateUrl: './place-dashboard.html',
    styleUrls: ['./place-dashboard.scss']
})
export class PlaceDashboard implements OnInit {
    
    lat: number = 50.108445;
    lng: number = 14.452613;

    items: CellarPlace[];
    
    constructor(private store: Store<ApplicationState>,
        private iotservice: IoTService) { 
            
        }
    
    ngOnInit() {
        this.getData();
        
    }
    add()
    {
        this.store.dispatch(new RouterActions.Go({
            path: ['place/0']
        }));
    }


    selectItem(id: string){
        this.store.dispatch(new RouterActions.Go({
            path: ['place/'+id]
        }));
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