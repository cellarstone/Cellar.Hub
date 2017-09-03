﻿import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import { DatatableModel } from '../models/shared/datatableModel';

@Injectable()
export class SharedService
{
    public datatable_Metadata: DatatableModel;
    
    constructor()
    { }

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

