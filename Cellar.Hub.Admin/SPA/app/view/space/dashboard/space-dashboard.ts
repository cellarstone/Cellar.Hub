import {Component,OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';


import { CellarSpace } from '../../../entities/CellarSpace';


import { SharedService } from '../../../service/shared.service';
import { IoTService } from '../../../service/iot.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';

import * as RouterActions from 'app/state/actions/router-actions';

@Component({
    templateUrl: './space-dashboard.html'
})
export class SpaceDashboard implements OnInit {
    
    items: Array<CellarSpace>;


    constructor(private store: Store<ApplicationState>,
                private iotservice: IoTService) { 
        }
    
    ngOnInit() {
        this.getData();
        
    }

    

    add()
    {
        this.store.dispatch(new RouterActions.Go({
            path: ['space/' + 0]
        }));
    }


    selectItem(id: string){
        this.store.dispatch(new RouterActions.Go({
            path: ['space/' + 0]
        }));
    }


    //Ziskani dat ze serveru
    private getData()
    {
        console.log('SpaceDashboard getData()');
        
        //HTTP call
         this.iotservice.GetCellarSpaces("/")
            .subscribe(res =>
            {
                let response = res;

                //BEZ CHYB ze serveru
                if (response.isOK)
                {
                    this.items = <Array<CellarSpace>>response.data;


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

}