//angular
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//primeNG
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

//cellarstone
import { CellarPlace } from '../../../entities/CellarPlace';
import { CellarSpace } from '../../../entities/CellarSpace';

import { IoTService } from '../../../service/iot.service';




//http + rxjs
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
import * as RouterActions from 'app/state/actions/router.actions';
import { LoadCellarPlaceAction, SaveCellarPlaceAction, DeleteCellarPlaceAction } from 'app/state/actions/place.actions'
import { SaveCellarSpaceAction } from 'app/state/actions/space.actions';


@Component({
    templateUrl: './place-detail.html',
    styleUrls: ['./place-detail.scss']
})
export class PlaceDetail {
    colorMap: any;

    item$: Observable<CellarPlace>;
    item_spaces$: Observable<CellarSpace[]>;

    private sub: any;

    addsubspaceDisplay: boolean = false;
    addedsubspace: CellarSpace;

    urlCheck: any;
    place: string = '';

    constructor(
        private route: ActivatedRoute,
        private store: Store<ApplicationState>) {
        this.colorMap = { 1: 'newStatePanel', 2: 'approvedStatePanel', 3: 'forbiddenStatePanel' };

        this.item$ = this.store.select(mapPlaceFromState);
        this.item_spaces$ = this.store.select(mapSpacesFromState);
    }


    ngOnInit() {
        
        this.sub = this.route.params.subscribe(params => {

            let id = params['id']; // (+) converts string 'id' to a number
            this.store.dispatch(new LoadCellarPlaceAction(id));

        });

        this.urlCheck = {
            newPlace0: this.route.snapshot.params['id']
        }

        if (this.urlCheck.newPlace0 === '0') {
            return this.place = 'New place';
        } else {
            return this.place = 'Place overview';
        }
        
        

    }
    ngOnDestroy() {
        console.log("destroy");
        this.sub.unsubscribe();
    }





    //*********************************/
    /* PLACE */
    //*********************************/

    private savePlace(item: CellarPlace) {
        console.log(item);
        this.store.dispatch(new SaveCellarPlaceAction(item));
    }


    private deletePlace(item: CellarPlace) {
        this.store.dispatch(new DeleteCellarPlaceAction(item));
    }

    private cancelPlace() {
        this.store.dispatch(new RouterActions.Back());
    }







    private showaddSubspace() {
        this.addsubspaceDisplay = true;

        this.addedsubspace = new CellarSpace();
        this.item$.subscribe((value) => {
            if (value) {
                var nameTemp = value.name.replace(/ /g, "-");
                this.addedsubspace.path = "/"+nameTemp.toLowerCase();
            }
        });

    }

    private addSubspace() {
        this.addsubspaceDisplay = false;

        this.store.dispatch(new SaveCellarSpaceAction(this.addedsubspace));

    }

    selectSpace(id: string) {
        this.store.dispatch(new RouterActions.Go({
            path: ['space/' + id]
        }));
    }

    


}



function mapPlaceFromState(state: ApplicationState): CellarPlace {
    if (state.uiState == undefined) {
        return undefined;
    }

    return state.uiState.selectedPlace;
}

function mapSpacesFromState(state: ApplicationState): CellarSpace[] {
    if (state.storeData == undefined) {
        return undefined;
    }

    return state.storeData.spaces;
}