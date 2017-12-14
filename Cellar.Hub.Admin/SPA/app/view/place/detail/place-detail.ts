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
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
import * as RouterActions from 'app/state/actions/router.actions';
import { LoadCellarPlaceAction, SaveCellarPlaceAction, DeleteCellarPlaceAction } from 'app/state/actions/place.actions'


@Component({
    templateUrl: './place-detail.html',
    styleUrls: ['./place-detail.scss']
})
export class PlaceDetail {

    item$: Observable<CellarPlace>;
    item_spaces$: Observable<CellarSpace[]>;

    private sub: any;


    constructor(
        private route: ActivatedRoute,
        private store: Store<ApplicationState>) {

        this.item$ = this.store.select(mapPlaceFromState);

    }


    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {

            let id = params['id']; // (+) converts string 'id' to a number
            this.store.dispatch(new LoadCellarPlaceAction(id));

        });
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









    selectItem(id: string) {
        this.store.dispatch(new RouterActions.Go({
            path: ['senzor/' + id]
        }));
    }



}



function mapPlaceFromState(state: ApplicationState): CellarPlace {
    if (state.uiState == undefined) {
        return undefined;
    }

    return state.uiState.selectedPlace;
}