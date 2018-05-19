import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'

import { SelectItem } from 'primeng/primeng';
import { DataTable } from 'primeng/primeng';

import { DatatableModel } from '../../../models/shared/datatableModel';


import { CellarSenzor } from '../../../entities/CellarSenzor';
import { ApplicationState } from 'app/state/state/application.state';
import { Store } from '@ngrx/store';

import * as RouterActions from 'app/state/actions/router.actions';
import { LoadAllCellarSenzorsAction } from 'app/state/actions/senzor.actions';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
    selector: 'senzor-list',
    templateUrl: './senzor-list.html',
    styleUrls: ['./senzor-list.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SenzorList implements OnInit {

    items$: Observable<CellarSenzor[]>;

    
    constructor(private store: Store<ApplicationState>) {
        this.items$ = this.store.select(mapSenzorsFromState);
    }

    ngOnInit() {
        this.store.dispatch(new LoadAllCellarSenzorsAction());
    }

    //zalozeni noveho produktu
    newSenzor() {
        this.store.dispatch(new RouterActions.Go({
            path: ['senzor/0']
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

    return state.storeData.senzors;
} 