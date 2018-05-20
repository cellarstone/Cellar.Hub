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
import { FileService } from '../../../service/file.service';

//http + rxjs
import { Subject, Observable } from 'rxjs';
//import { CellarDTO } from '../../../../entities/http/CellarDTO';
import { CellarDTO } from 'app/entities/http/CellarDTO';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
// import 'rxjs/add/operator/flatMap';


import * as RouterActions from 'app/state/actions/router.actions';
import { LoadCellarSpaceAction, SaveCellarSpaceAction, DeleteCellarSpaceAction } from 'app/state/actions/space.actions';
import { DeleteCellarSenzorAction, SaveCellarSenzorAction } from 'app/state/actions/senzor.actions';
import { CellarMeetingRoom } from 'app/entities/CellarMeetingRoom';
import { LoadCellarMeetingRoomAction, CleanSelectedCellarMeetingRoomAction, SaveCellarMeetingRoomAction, DeleteCellarMeetingRoomAction } from 'app/state/actions/office.actions';


@Component({
    templateUrl: './space-detail.html',
    styleUrls: ['./space-detail.scss']
})
export class SpaceDetail {

    error$: Observable<string>;
    item$: Observable<CellarSpace>;
    item_subspaces$: Observable<CellarSpace[]>;
    item_senzors$: Observable<CellarSenzor[]>;


    item_meetingRoom$: Observable<CellarMeetingRoom>;

    private sub: any;


    addsenzorDisplay: boolean = false;
    addedsenzor: CellarSenzor;
    senzorTypes: SelectItem[];
    selectedSenzorType: string;
    typesImages: Map<string, string> = new Map<string, string>();
    selectedTypeImage: string = "";

    addsubspaceDisplay: boolean = false;
    addedsubspace: CellarSpace;

    space: string = 'Space Overview';
    pathCheck: any;

    itemID: string;
    colorMap: any;


    constructor(
        private route: ActivatedRoute,
        private store: Store<ApplicationState>,
        public iotservice: IoTService) {


        this.senzorTypes = [];
        this.senzorTypes.push({ label: 'Select Type', value: null });
        this.senzorTypes.push({ label: 'CellarSenzor Temperature v1.0', value: 'CellarSenzor Temperature v1.0' });
        // this.senzorTypes.push({ label: 'CellarSenzor Temperature v2.0', value: 'CellarSenzor Temperature v2.0' });
        this.senzorTypes.push({ label: 'CellarSenzor Motion v1.0', value: 'CellarSenzor Motion v1.0' });
        // this.senzorTypes.push({ label: 'CellarSenzor CO2 v1.0', value: 'CellarSenzor CO2 v1.0' });
        // this.senzorTypes.push({ label: 'CellarSenzor Smoke v1.0', value: 'CellarSenzor Smoke v1.0' });
        // this.senzorTypes.push({ label: 'CellarSenzor OpenClose v1.0', value: 'CellarSenzor OpenClose v1.0' });
        this.senzorTypes.push({ label: 'CellarSenzor Power v1.0', value: 'CellarSenzor Power v1.0' });
        // this.senzorTypes.push({ label: 'CellarSenzor Camera v1.0', value: 'CellarSenzor Camera v1.0' });

        this.typesImages.set("CellarSenzor Temperature v1.0", "assets/images/senzortypes/dht11.jpeg");
        // this.typesImages.set("CellarSenzor Temperature v2.0", "assets/images/senzortypes/dht22.jpg");
        this.typesImages.set("CellarSenzor Motion v1.0", "assets/images/senzortypes/pir.jpeg");
        // this.typesImages.set("CellarSenzor CO2 v1.0", "assets/images/senzortypes/co2.jpg");
        // this.typesImages.set("CellarSenzor Smoke v1.0", "assets/images/senzortypes/smoke.jpeg");
        // this.typesImages.set("CellarSenzor OpenClose v1.0", "assets/images/senzortypes/openclose.png");
        this.typesImages.set("CellarSenzor Power v1.0", "assets/images/senzortypes/relay.jpeg");
        // this.typesImages.set("CellarSenzor Camera v1.0", "assets/images/senzortypes/camera.jpeg");

        this.colorMap = { 1: 'newStatePanel', 2: 'approvedStatePanel', 3: 'forbiddenStatePanel' };

        this.item$ = this.store.select(mapSpaceFromState);
        this.item_subspaces$ = this.store.select(mapSpacesFromState);
        this.item_senzors$ = this.store.select(mapSenzorsFromState);
        this.item_meetingRoom$ = this.store.select(mapMeetingRoomFromState);
        this.error$ = this.store.select(mapErrorFromState);
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {

            let id = params['id']; // (+) converts string 'id' to a number
            this.itemID = id;


            console.log("ASDFASDF33333");
            console.log(id);

            this.store.dispatch(new LoadCellarSpaceAction(id));
            if(id != "0"){
                this.store.dispatch(new LoadCellarMeetingRoomAction(id));
            }
        });

        this.pathCheck = {
            newPlace0: this.route.snapshot.params['id']
          }
      
      
          if (this.pathCheck.newPlace0 === '0') {
           return this.space = 'New Space';
          } else {
              return this.space = 'Space Overview';
          }
    }
    ngOnDestroy() {
        console.log("destroy");

        this.store.dispatch(new CleanSelectedCellarMeetingRoomAction());

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




    saveMeetingRoomSetting(email: string){
        let result = new CellarMeetingRoom();
        result.id = this.itemID;
        result.email = email;
        this.store.dispatch(new SaveCellarMeetingRoomAction(result));
        console.log("save email: " + email);
    }

    
    deleteMeetingRoomSetting(){
        this.store.dispatch(new DeleteCellarMeetingRoomAction(this.itemID));
        this.store.dispatch(new CleanSelectedCellarMeetingRoomAction());
        console.log("delete email for id : " + this.itemID);
    }













    //*********************************/
    /* SENZORS */
    //*********************************/


    getSenzorTypeImage(type: string) {
        return  this.typesImages.get(type);
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

    private cancelSubspace() {
        this.addsubspaceDisplay = false;
    }

    private addSenzor() {
        this.addsenzorDisplay = false;
        this.addedsenzor.type = this.selectedSenzorType;

        this.store.dispatch(new SaveCellarSenzorAction(this.addedsenzor));
    }

    private cancelSenzor() {
        this.addsenzorDisplay = false;
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

        console.log(id);
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


function mapMeetingRoomFromState(state: ApplicationState): CellarMeetingRoom {
    if (state.uiState == undefined) {
        return undefined;
    }

    return state.uiState.selectedMeetingRoom;
}


function mapErrorFromState(state: ApplicationState): string {
    if (state.uiState == undefined) {
        return undefined;
    }

    return state.uiState.error;
}