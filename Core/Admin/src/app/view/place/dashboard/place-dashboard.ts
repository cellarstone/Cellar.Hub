import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';

import { CellarPlace } from '../../../entities/CellarPlace';


import { IoTService } from '../../../service/iot.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
import * as RouterActions from 'app/state/actions/router.actions';
import { Observable } from 'rxjs';

import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
import { LoadAllCellarPlacesAction } from 'app/state/actions/place.actions';

@Component({
    templateUrl: './place-dashboard.html',
    styleUrls: ['./place-dashboard.scss']
})
export class PlaceDashboard implements OnInit {

    colorMap: any;

    lat: number = 50.108445;
    lng: number = 14.452613;

    items$: Observable<CellarPlace[]>;

    constructor(private store: Store<ApplicationState>) {
        this.colorMap = { 1: 'newStatePanel', 2: 'approvedStatePanel', 3: 'forbiddenStatePanel' };
        this.items$ = this.store.select(mapPlacesFromState);
    }

    ngOnInit() {
        this.store.dispatch(new LoadAllCellarPlacesAction());
    }
    newPlace() {
        this.store.dispatch(new RouterActions.Go({
            path: ['place/0']
        }));
    }
    selectItem(id: string) {
        this.store.dispatch(new RouterActions.Go({
            path: ['place/' + id]
        }));
    }

    //Helpers
    getNumber(value: string) {
        return parseFloat(value);
    }
}



function mapPlacesFromState(state: ApplicationState): CellarPlace[]{
    if (state.storeData == undefined) {
        return undefined;
    }

    console.log(state.storeData.places);

    return state.storeData.places;
} 