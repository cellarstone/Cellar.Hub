import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable'

import { SelectItem } from 'primeng/primeng';
import { DataTable } from 'primeng/primeng';

import { DatatableModel } from '../../../models/shared/datatableModel';
import { SharedService } from '../../../service/shared.service';


import { CellarSenzor } from '../../../entities/CellarSenzor';
import { IoTService } from '../../../service/iot.service';
import { ApplicationState } from 'app/state/state/application.state';
import { Store } from '@ngrx/store';

import * as RouterActions from 'app/state/actions/router-actions';
import { LoadCellarSenzorsAction } from 'app/state/actions/actions';

@Component({
    selector: 'senzor-list',
    templateUrl: './senzor-list.html',
    styleUrls: ['./senzor-list.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SenzorList implements OnInit {

    private items$: Observable<CellarSenzor[]>;

    
    constructor(private route: ActivatedRoute,
        private router: Router,
        private store: Store<ApplicationState>,
        private iotservice: IoTService,
        private sharedService: SharedService,
        private changeDetectorRef: ChangeDetectorRef) {

        this.items$ = this.store.select(mapSenzorsFromState);

    }

    ngOnInit() {
        this.store.dispatch(new LoadCellarSenzorsAction());
    }

    //zalozeni noveho produktu
    newSenzor() {
        this.store.dispatch(new RouterActions.Go({
            path: ['senzor/' + 0]
        }));
    }

    selectSenzor(item: CellarSenzor){
        this.store.dispatch(new RouterActions.Go({
            path: ['senzor/' + item.id]
        }));
    }


}



function mapSenzorsFromState(state: ApplicationState): CellarSenzor[]{
    if (state.storeData == undefined) {
        return undefined;
    }

    console.log(state.storeData.senzors);

    return state.storeData.senzors;
} 