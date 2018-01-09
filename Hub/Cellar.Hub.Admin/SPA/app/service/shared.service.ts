import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Router, ActivatedRoute } from '@angular/router';

import { DatatableModel } from '../models/shared/datatableModel';

@Injectable()
export class SharedService
{
    public datatable_Metadata: DatatableModel;

    // public currentUrl: string;
    // public backButtonUrl: string = "/";
    
    constructor(private router: Router)
    { }


    // route(route: string){
    //     console.log("Route to > " + route);
    //     this.backButtonUrl = this.currentUrl;
    //     this.router.navigate([route]);
    // }

    // routeBack(){
    //     console.log("Route back > " + this.backButtonUrl);
    //     this.router.navigate([this.backButtonUrl]);
    // }

    // setCurrentRoute(){
    //     console.log("Set current Route > " + this.router.url);
    //     this.currentUrl = this.router.url;
    // }






    getCurrentDatatableMeta()
    {
        return this.datatable_Metadata;
    }

    
    getRandomNumberRounded(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
}

