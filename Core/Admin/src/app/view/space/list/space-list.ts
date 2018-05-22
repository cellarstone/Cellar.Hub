import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'

import { CellarSpace } from '../../../entities/CellarSpace';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';

import * as RouterActions from 'app/state/actions/router.actions';
import { LoadCellarSpacesAction, LoadAllCellarSpacesAction } from 'app/state/actions/space.actions';


@Component({
    selector: 'space-list',
    templateUrl: './space-list.html',
    styleUrls: ['./space-list.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SpaceList implements OnInit {

    items$: Observable<CellarSpace[]>;

    constructor(private store: Store<ApplicationState>) {
        this.items$ = this.store.select(mapSpacesFromState);
    }

    ngOnInit() {
        this.store.dispatch(new LoadAllCellarSpacesAction())
    }

    //zalozeni noveho produktu
    newSpace() {
        this.store.dispatch(new RouterActions.Go({
            path: ['space/' + 0]
        }));
    }

    selectSpace(item: CellarSpace){
        this.store.dispatch(new RouterActions.Go({
            path: ['space/' + item.id]
        }));
    }

}

function mapSpacesFromState(state: ApplicationState): CellarSpace[]{
    if (state.storeData == undefined) {
        return undefined;
    }

    // console.log(state.storeData.spaces);

    return state.storeData.spaces;
} 
