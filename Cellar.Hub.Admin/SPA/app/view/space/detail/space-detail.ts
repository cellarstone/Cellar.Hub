//angular
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//primeNG
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

//cellarstone
// import { Space } from '../../../../entities/hck/product';
// import { Product } from '../../../../entities/catalog/product';
// import { ProductDetail } from '../../../../entities/catalog/ProductDetail';
// import { ProductState } from '../../../../entities/catalog/ProductState';
// import { Category } from '../../../../entities/catalog/Category';
// import { ProductImage } from '../../../../entities/catalog/ProductImage';
// import { ProductVideo } from '../../../../entities/catalog/ProductVideo';
// import { Producer } from '../../../../entities/catalog/Producer';
// import { ProductCategory } from '../../../../entities/catalog/ProductCategory';


// import { CatalogProductHckProduct } from '../../../../entities/business/catalogproducthckproduct';


// import { BusinessService } from '../../../../service/business.service';
// import { CatalogService } from '../../../../service/catalog.service';
// import { HckService } from '../../../../service/hck.service';



import { CellarSpace } from '../../../entities/CellarSpace';
import { CellarSenzor } from '../../../entities/CellarSenzor';


import { IoTService } from '../../../service/iot.service';
import { CdnService } from '../../../service/cdn.service';


//others
declare var jQuery: any;


//http + rxjs
import { Subject } from 'rxjs/Subject';
//import { CellarDTO } from '../../../../entities/http/CellarDTO';
import { Observable } from 'rxjs/Observable';
import { CellarDTO } from 'app/entities/http/CellarDTO';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
// import 'rxjs/add/operator/flatMap';


import * as RouterActions from 'app/state/actions/router-actions';


@Component({
    templateUrl: './space-detail.html',
    styleUrls: ['./space-detail.scss']
})
export class SpaceDetail {

    item: CellarSpace;
    item_subspaces: CellarSpace[];
    item_senzors: CellarSenzor[];


    private sub: any;
    page: number = 1;
    itemsPerPage: number = 50;
    search: string = '';


    validations: Message[] = [];
    messagesToUser: Message[] = [];


    addsenzorDisplay: boolean = false;
    addedsenzor: CellarSenzor;
    senzorTypes: SelectItem[];
    selectedSenzorType: string;

    addsubspaceDisplay: boolean = false;
    addedsubspace: CellarSpace;


    //validation properties
    isStateValid: boolean = true;
    isMainPictureValid: boolean = true;
    isNameValid: boolean = true;
    isPathValid: boolean = true;



    colorMap: any;
    iconMap: any;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<ApplicationState>,
        public iotservice: IoTService,
        public cdnservice: CdnService) {


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
        // this.iconMap = { 
        //     'CellarSenzorTemperaturev10' : 'fa fa-thermometer-quarter', 
        //     'CellarSenzor Temperature v2.0': 'fa fa-thermometer-full', 
        //     'CellarSenzor Motion v1.0': 'forbiddenState' ,
        //     'CellarSenzor CO2 v1.0': 'forbiddenState' ,
        //     'CellarSenzor Smoke v1.0': 'forbiddenState' ,
        //     'CellarSenzor OpenClose v1.0': 'forbiddenState' ,
        //     'CellarSenzor Power v1.0': 'fa fa-power-off ' ,
        //     'CellarSenzor Camera v1.0': 'fa fa-video-camera' 
        // };
    }

    setSenzorTypeIcon(type: string)
    {
        let result = "";

        switch(type){
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


    ngOnInit() {
        //*********************************/
        //CALL WEBAPI - GET DATA
        //*********************************/
        this.getData();
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }




    //*********************************/
    /* PRODUKT */
    //*********************************/

    private getData() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id']; // (+) converts string 'id' to a number

            //novy produkt
            if (id == 0) {
                //založíme nový produkt
                this.item = new CellarSpace();

                //Product-State
                this.item.state = "1";
            }
            //editace existujiciho produktu
            else {

                //zjistíme informace o produktu
                // this.iotservice.GetCellarSpace(id.toString())
                //     .subscribe(art => {
                //         let response = art;



                //         //BEZ CHYB ze serveru
                //         if (response.isOK) {
                //             this.item = <CellarSpace>response.data;

                //         }
                //         //NON-VALID ze serveru
                //         else if (!response.isValid) {
                //             //???
                //             console.error(response.validations);
                //         }
                //         //custom ERROR ze serveru
                //         else if (response.isCustomError) {
                //             //???
                //             console.error(response.customErrorText);
                //         }
                //         //identity ERROR ze serveru
                //         else if (response.isIdentityError) {
                //             //???
                //             console.error(response.identityErrorText);
                //         }
                //         //EXCEPTION ze serveru
                //         else if (response.isException) {
                //             //???
                //             console.error(response.exceptionText);
                //         }
                //     },
                //     error => {
                //         console.error(error);
                //     },
                //     () => {
                //         console.log('GetCellarSpace() completed');
                //     });



                this.iotservice.GetCellarSpace(id.toString())
                    //GET SUBSPACES
                    .flatMap(ressss => {

                        let sometehing = <CellarSpace>ressss.data;
                        console.log(sometehing);

                        let ss2 = new CellarSpace().New(ressss.data);

                        let subspacesPath = ss2.getSubPath();

                        this.iotservice.GetCellarSpaces(subspacesPath)
                            .subscribe(aaa => {

                                this.item_subspaces = <CellarSpace[]>aaa.data;

                                console.log(this.item_subspaces);

                            });




                        return Observable.of(ressss);
                    })
                    //GET SENZORS
                    .flatMap(ressss => {

                        let sometehing = <CellarSpace>ressss.data;
                        console.log(sometehing);

                        let ss2 = new CellarSpace().New(ressss.data);
                        
                        let subspacesPath = ss2.getSubPath();

                        this.iotservice.GetCellarSenzors(subspacesPath)
                            .subscribe(aaa => {

                                this.item_senzors = <CellarSenzor[]>aaa.data;

                                console.log(this.item_senzors);

                            });




                        return Observable.of(ressss);
                    })

                    //SAVE SPACE
                    .subscribe(art => {
                        let response = art;





                        //BEZ CHYB ze serveru
                        if (response.isOK) {

                            let temp = <CellarSpace>response.data;
                            this.item = new CellarSpace().New(temp);

                            console.log(this.item);

                        }
                        //NON-VALID ze serveru
                        else if (!response.isValid) {
                            //???
                            console.error(response.validations);
                        }
                        //custom ERROR ze serveru
                        else if (response.isCustomError) {
                            //???
                            console.error(response.customErrorText);
                        }
                        //identity ERROR ze serveru
                        else if (response.isIdentityError) {
                            //???
                            console.error(response.identityErrorText);
                        }
                        //EXCEPTION ze serveru
                        else if (response.isException) {
                            //???
                            console.error(response.exceptionText);
                        }
                    },
                    error => {
                        console.error(error);
                    },
                    () => {
                        console.log('GetCellarSpace() completed');
                    });


                //pridat nacteni vsech senzoru

                //pridat nacteni vsech meetings

                //pridat nacteni vsech orders





            }
        });
    }


    private saveProduct() {





        //validace
        if (this.item.state === "0") {
            this.validations.push({
                severity: 'warn',
                summary: 'State',
                detail: 'State is required'
            });
            this.isStateValid = false;
        }
        else {
            this.isStateValid = true;
        }
        if (!this.item.image) {
            this.validations.push({
                severity: 'warn',
                summary: 'Main Image',
                detail: 'Main Image is required'
            });
            this.isMainPictureValid = false;
        }
        else {
            this.isMainPictureValid = true;
        }
        if (!this.item.name) {
            this.validations.push({
                severity: 'warn',
                summary: 'Name',
                detail: 'Name is required'
            });
            this.isNameValid = false;
        }
        else {
            this.isNameValid = true;
        }
        if (!this.item.path) {
            this.validations.push({
                severity: 'warn',
                summary: 'Path',
                detail: 'Path is required'
            });
            this.isPathValid = false;
        }
        else {
            this.isPathValid = true;
        }


        if (this.validations.length == 0) {

            //UPDATE produktu
            if (this.item.id != undefined) {
                this.iotservice.UpdateCellarSpace(this.item)
                    .subscribe(art => {
                        let response = art;

                        //BEZ CHYB ze serveru
                        if (response.isOK) {
                            let temp = <CellarDTO>response.data;
                            
                            //everything is OK

                            this.store.dispatch(new RouterActions.Back());

                            // this.messagesToUser.push({
                            //     severity: 'success',
                            //     summary: '! UPDATED !',
                            //     detail: 'Product has been updated'
                            // });
                        }
                        //NON-VALID ze serveru
                        else if (!response.isValid) {
                            //???
                            console.error(response.validations);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Non-valid'
                            });
                        }
                        //custom ERROR ze serveru
                        else if (response.isCustomError) {
                            //???
                            console.error(response.customErrorText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Custom Error -' + response.customErrorText
                            });
                        }
                        //identity ERROR ze serveru
                        else if (response.isIdentityError) {
                            //???
                            console.error(response.identityErrorText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Identity Error -' + response.identityErrorText
                            });
                        }
                        //EXCEPTION ze serveru
                        else if (response.isException) {
                            //???
                            console.error(response.exceptionText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Exception -' + response.exceptionText
                            });
                        }
                    },
                    error => {
                        console.error(error);

                        this.messagesToUser.push({
                            severity: 'error',
                            summary: 'From ???',
                            detail: error
                        });
                    },
                    () => {
                        console.log('saveProduct() completed');
                    });
            }
            //ZALOZENI noveho produktu
            else {
                this.iotservice.AddCellarSpace(this.item)
                    .subscribe(art => {
                        let response = art;

                        //BEZ CHYB ze serveru
                        if (response.isOK) {

                            let temp = <CellarSpace>response.data;
                            this.item = new CellarSpace().New(temp);


                            //this.messagesToUser.push({
                            //    severity: 'success',
                            //    summary: '! ADDED !',
                            //    detail: 'Product has been added'
                            //});

                            this.store.dispatch(new RouterActions.Back());
                            
                        }
                        //NON-VALID ze serveru
                        else if (!response.isValid) {
                            //???
                            console.error(response.validations);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Non-valid'
                            });
                        }
                        //custom ERROR ze serveru
                        else if (response.isCustomError) {
                            //???
                            console.error(response.customErrorText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Custom Error -' + response.customErrorText
                            });
                        }
                        //identity ERROR ze serveru
                        else if (response.isIdentityError) {
                            //???
                            console.error(response.identityErrorText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Identity Error -' + response.identityErrorText
                            });
                        }
                        //EXCEPTION ze serveru
                        else if (response.isException) {
                            //???
                            console.error(response.exceptionText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Exception -' + response.exceptionText
                            });
                        }
                    },
                    error => {
                        console.error(error);

                        this.messagesToUser.push({
                            severity: 'error',
                            summary: 'From ???',
                            detail: error
                        });
                    },
                    () => {
                        console.log('saveProduct() completed');
                    });
            }

        }
    }





    // //*********************************/
    // //STATE
    // //*********************************/

    public selectState(e: any) {
        var aaa = e.srcElement.innerHTML.toLowerCase();




        // for (var i = 0; i < this.statesList.length; i++)
        // {
        //     var abcd = this.statesList[i];

        //     if (abcd.name.toLowerCase() == aaa)
        //     {
        //         this.item.state = abcd;
        //     }
        // }





        if (aaa === "new") {
            this.item.state = "1";



            jQuery("#new").removeClass();
            jQuery("#approved").removeClass();
            jQuery("#forbidden").removeClass();

            jQuery("#new").addClass("btn btn-warning");
            jQuery("#approved").addClass("btn");
            jQuery("#forbidden").addClass("btn");
        }
        else if (aaa === "approved") {
            this.item.state = "2";

            jQuery("#new").removeClass();
            jQuery("#approved").removeClass();
            jQuery("#forbidden").removeClass();

            jQuery("#new").addClass("btn");
            jQuery("#approved").addClass("btn btn-success");
            jQuery("#forbidden").addClass("btn");
        }
        else if (aaa === "forbidden") {
            this.item.state = "3";

            jQuery("#new").removeClass();
            jQuery("#approved").removeClass();
            jQuery("#forbidden").removeClass();

            jQuery("#new").addClass("btn");
            jQuery("#approved").addClass("btn");
            jQuery("#forbidden").addClass("btn btn-danger");
        }


    }









    //*********************************/
    /* IMAGES */
    //*********************************/

    //File upload - main picture

    public addMainPictureChangeEvent(fileInput: any) {

        if (fileInput.target.files && fileInput.target.files[0]) {
            let fileToUpload = fileInput.target.files[0];
            console.log(fileToUpload.name);

            this.cdnservice.upload(fileToUpload)
                .subscribe(art => {
                    let response = art;

                    //BEZ CHYB ze serveru
                    if (response.isOK) {

                        var url = response.data as string;


                        this.item.image = url;

                        console.log(this.item.image);


                    }
                    //NON-VALID ze serveru
                    else if (!response.isValid) {
                        //???
                        console.error(response.validations);
                    }
                    //custom ERROR ze serveru
                    else if (response.isCustomError) {
                        //???
                        console.error(response.customErrorText);
                    }
                    //identity ERROR ze serveru
                    else if (response.isIdentityError) {
                        //???
                        console.error(response.identityErrorText);
                    }
                    //EXCEPTION ze serveru
                    else if (response.isException) {
                        //???
                        console.error(response.exceptionText);
                    }
                },
                error => {
                    console.error(error);
                },
                () => {
                    console.log('addMainPictureChangeEvent() completed');
                });

        }
    }





    //*********************************/
    /* SENZORS */
    //*********************************/



    private showaddSenzor() {
        this.addsenzorDisplay = true;

        this.addedsenzor = new CellarSenzor();
        this.addedsenzor.path = this.item.getSubPath();
    }


    private addSenzor() {
        this.addsenzorDisplay = false;

        this.addedsenzor.type = this.selectedSenzorType;

        this.iotservice.AddCellarSenzor(this.addedsenzor)
            .subscribe(art => {
                let response = art;

                //BEZ CHYB ze serveru
                if (response.isOK) {
                    var itemr = <CellarSenzor>response.data;

                    this.item_senzors.push(itemr);

                    this.addedsenzor = new CellarSenzor();
                    this.addedsenzor.path = this.item.path + this.item.name.toLowerCase();

                    //this.messagesToUser.push({
                    //    severity: 'success',
                    //    summary: '! ADDED !',
                    //    detail: 'Product has been added'
                    //});

                }
                //NON-VALID ze serveru
                else if (!response.isValid) {
                    //???
                    console.error(response.validations);

                    this.messagesToUser.push({
                        severity: 'error',
                        summary: 'From Server',
                        detail: 'Non-valid'
                    });
                }
                //custom ERROR ze serveru
                else if (response.isCustomError) {
                    //???
                    console.error(response.customErrorText);

                    this.messagesToUser.push({
                        severity: 'error',
                        summary: 'From Server',
                        detail: 'Custom Error -' + response.customErrorText
                    });
                }
                //identity ERROR ze serveru
                else if (response.isIdentityError) {
                    //???
                    console.error(response.identityErrorText);

                    this.messagesToUser.push({
                        severity: 'error',
                        summary: 'From Server',
                        detail: 'Identity Error -' + response.identityErrorText
                    });
                }
                //EXCEPTION ze serveru
                else if (response.isException) {
                    //???
                    console.error(response.exceptionText);

                    this.messagesToUser.push({
                        severity: 'error',
                        summary: 'From Server',
                        detail: 'Exception -' + response.exceptionText
                    });
                }
            },
            error => {
                console.error(error);

                this.messagesToUser.push({
                    severity: 'error',
                    summary: 'From ???',
                    detail: error
                });
            },
            () => {
                console.log('addSenzor() completed');
            });


        console.log(this.addedsenzor);
    }

    private selectSenzor(id: string){
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
        this.addedsubspace.path = this.item.getSubPath();
        
    }



    private addSubspace() {
        this.addsubspaceDisplay = false;



        this.iotservice.AddCellarSpace(this.addedsubspace)
            .subscribe(art => {
                let response = art;

                //BEZ CHYB ze serveru
                if (response.isOK) {
                    var itemr = <CellarSpace>response.data;

                    this.item_subspaces.push(itemr);

                    this.addedsubspace = new CellarSpace();
                    this.addedsubspace.path = this.item.path + this.item.name.toLowerCase();

                    //this.messagesToUser.push({
                    //    severity: 'success',
                    //    summary: '! ADDED !',
                    //    detail: 'Product has been added'
                    //});


                }
                //NON-VALID ze serveru
                else if (!response.isValid) {
                    //???
                    console.error(response.validations);

                    this.messagesToUser.push({
                        severity: 'error',
                        summary: 'From Server',
                        detail: 'Non-valid'
                    });
                }
                //custom ERROR ze serveru
                else if (response.isCustomError) {
                    //???
                    console.error(response.customErrorText);

                    this.messagesToUser.push({
                        severity: 'error',
                        summary: 'From Server',
                        detail: 'Custom Error -' + response.customErrorText
                    });
                }
                //identity ERROR ze serveru
                else if (response.isIdentityError) {
                    //???
                    console.error(response.identityErrorText);

                    this.messagesToUser.push({
                        severity: 'error',
                        summary: 'From Server',
                        detail: 'Identity Error -' + response.identityErrorText
                    });
                }
                //EXCEPTION ze serveru
                else if (response.isException) {
                    //???
                    console.error(response.exceptionText);

                    this.messagesToUser.push({
                        severity: 'error',
                        summary: 'From Server',
                        detail: 'Exception -' + response.exceptionText
                    });
                }
            },
            error => {
                console.error(error);

                this.messagesToUser.push({
                    severity: 'error',
                    summary: 'From ???',
                    detail: error
                });
            },
            () => {
                console.log('addSubspace() completed');
            });


        console.log(this.addedsubspace);
    }


    private selectSubspace(id: string){
        this.store.dispatch(new RouterActions.Go({
            path: ['space/' + id]
        }));
    }






}