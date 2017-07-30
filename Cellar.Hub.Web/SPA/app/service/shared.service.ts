import { Injectable } from '@angular/core';
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
}

