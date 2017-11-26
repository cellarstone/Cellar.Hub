import {Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SelectItem} from 'primeng/primeng';


import { CellarSpace } from '../../../entities/CellarSpace';


import { SharedService } from '../../../service/shared.service';
import { IoTService } from '../../../service/iot.service';

@Component({
    templateUrl: './space-dashboard.html'
})
export class SpaceDashboard implements OnInit {
    
    items: Array<CellarSpace>;


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
        this.sharedService.route("space/0");
    }


    selectItem(id: string){
        this.sharedService.route("space/"+id);
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