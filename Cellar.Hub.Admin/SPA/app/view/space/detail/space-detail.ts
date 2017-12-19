//angular
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//primeNG
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

//cellarstone
import { CellarSpace } from '../../../entities/CellarSpace';
import { CellarSenzor } from '../../../entities/CellarSenzor';


import { IoTService } from '../../../service/iot.service';
import { CdnService } from '../../../service/cdn.service';

//http + rxjs
import { Subject } from 'rxjs/Subject';
//import { CellarDTO } from '../../../../entities/http/CellarDTO';
import { Observable } from 'rxjs/Observable';
import { CellarDTO } from 'app/entities/http/CellarDTO';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
// import 'rxjs/add/operator/flatMap';


import * as RouterActions from 'app/state/actions/router.actions';
import { LoadCellarSpaceAction, SaveCellarSpaceAction, DeleteCellarSpaceAction } from 'app/state/actions/space.actions';
import { DeleteCellarSenzorAction, SaveCellarSenzorAction } from 'app/state/actions/senzor.actions';


@Component({
    templateUrl: './space-detail.html',
    styleUrls: ['./space-detail.scss']
})
export class SpaceDetail {

    error$: Observable<string>;
    item$: Observable<CellarSpace>;
    item_subspaces$: Observable<CellarSpace[]>;
    item_senzors$: Observable<CellarSenzor[]>;


    private sub: any;


    addsenzorDisplay: boolean = false;
    addedsenzor: CellarSenzor;
    senzorTypes: SelectItem[];
    selectedSenzorType: string;

    addsubspaceDisplay: boolean = false;
    addedsubspace: CellarSpace;




    colorMap: any;


    constructor(
        private route: ActivatedRoute,
        private store: Store<ApplicationState>,
        public iotservice: IoTService) {


        this.senzorTypes = [];
        this.senzorTypes.push({ label: 'Select Type', value: null });
        this.senzorTypes.push({ label: 'CellarSenzor Temperature v1.0', value: 'CellarSenzor Temperature v1.0' });
        this.senzorTypes.push({ label: 'CellarSenzor Temperature v2.0', value: 'CellarSenzor Temperature v2.0' });
        this.senzorTypes.push({ label: 'CellarSenzor Motion v1.0', value: 'CellarSenzor Motion v1.0' });
        this.senzorTypes.push({ label: 'CellarSenzor CO2 v1.0', value: 'CellarSenzor CO2 v1.0' });
        this.senzorTypes.push({ label: 'CellarSenzor Smoke v1.0', value: 'CellarSenzor Smoke v1.0' });
        this.senzorTypes.push({ label: 'CellarSenzor OpenClose v1.0', value: 'CellarSenzor OpenClose v1.0' });
        this.senzorTypes.push({ label: 'CellarSenzor Power v1.0', value: 'CellarSenzor Power v1.0' });
        this.senzorTypes.push({ label: 'CellarSenzor Camera v1.0', value: 'CellarSenzor Camera v1.0' });

        this.colorMap = { 1: 'newState', 2: 'approvedState', 3: 'forbiddenState' };

        this.item$ = this.store.select(mapSpaceFromState);
        this.item_subspaces$ = this.store.select(mapSpacesFromState);
        this.item_senzors$ = this.store.select(mapSenzorsFromState);
        this.error$ = this.store.select(mapErrorFromState);
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {

            let id = params['id']; // (+) converts string 'id' to a number

            this.store.dispatch(new LoadCellarSpaceAction(id));

        });

    }
    ngOnDestroy() {
        console.log("destroy");

        this.sub.unsubscribe();
    }




    //*********************************/
    /* SPACE */
    //*********************************/

    private saveSpace(item: CellarSpace) {
        this.store.dispatch(new SaveCellarSpaceAction(item));
    }

    private deleteSpace(item: CellarSpace) {
        this.store.dispatch(new DeleteCellarSpaceAction(item));
    }

    private cancelSpace() {
        this.store.dispatch(new RouterActions.Back());
    }














    //*********************************/
    /* SENZORS */
    //*********************************/


    setSenzorTypeIcon(type: string) {
        let result = "";

        switch (type) {
            case "CellarSenzorTemperaturev10": {
                result = 'fa fa-thermometer-quarter'
                break;
            }
            case "CellarSenzor Temperature v2.0": {
                result = 'fa fa-thermometer-full'
                break;
            }
            case "CellarSenzor Motion v1.0": {
                result = 'forbiddenState'
                break;
            }
            case "CellarSenzor CO2 v1.0": {
                result = 'forbiddenState'
                break;
            }
            case "CellarSenzor Smoke v1.0": {
                result = 'forbiddenState'
                break;
            }
            case "CellarSenzor OpenClose v1.0": {
                result = 'forbiddenState'
                break;
            }
            case "CellarSenzor Power v1.0": {
                result = 'fa fa-power-off'
                break;
            }
            case "CellarSenzor Camera v1.0": {
                result = 'fa fa-video-camera'
                break;
            }
            default: {
                result = 'fa fa-question'
            }
        }

        return result;
    }



    private showaddSenzor() {
        this.addsenzorDisplay = true;

        this.addedsenzor = new CellarSenzor();
        this.item$.subscribe((value: CellarSpace) => {
            if (value) {
                let newOne = new CellarSpace().New(value);
                this.addedsenzor.path = newOne.getSubPath();
            }
        });
    }


    private addSenzor() {
        this.addsenzorDisplay = false;
        this.addedsenzor.type = this.selectedSenzorType;

        this.store.dispatch(new SaveCellarSenzorAction(this.addedsenzor));

    }

    private selectSenzor(id: string) {
        this.store.dispatch(new RouterActions.Go({
            path: ['senzor/' + id]
        }));
    }





    //*********************************/
    /* SUB-SPACES */
    //*********************************/



    private showaddSubspace() {
        this.addsubspaceDisplay = true;

        this.addedsubspace = new CellarSpace();
        this.item$.subscribe((value) => {
            if (value) {
                let newOne = new CellarSpace().New(value);
                this.addedsubspace.path = newOne.getSubPath();
            }
        });

    }

    private addSubspace() {
        this.addsubspaceDisplay = false;

        this.store.dispatch(new SaveCellarSpaceAction(this.addedsubspace));

    }

    private selectSubspace(id: string) {
        this.store.dispatch(new RouterActions.Go({
            path: ['space/' + id]
        }));
    }






}




function mapSpaceFromState(state: ApplicationState): CellarSpace {
    if (state.uiState == undefined) {
        return undefined;
    }

    return state.uiState.selectedSpace;
}


function mapSpacesFromState(state: ApplicationState): CellarSpace[] {
    if (state.storeData == undefined) {
        return undefined;
    }

    return state.storeData.spaces;
}


function mapSenzorsFromState(state: ApplicationState): CellarSenzor[] {
    if (state.storeData == undefined) {
        return undefined;
    }

    return state.storeData.senzors;
}

function mapErrorFromState(state: ApplicationState): string {
    if (state.uiState == undefined) {
        return undefined;
    }

    return state.uiState.error;
}