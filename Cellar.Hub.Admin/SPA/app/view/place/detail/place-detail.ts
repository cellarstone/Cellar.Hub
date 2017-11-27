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



import { CellarPlace } from '../../../entities/CellarPlace';
import { CellarSpace } from '../../../entities/CellarSpace';

import { SharedService } from '../../../service/shared.service';
import { IoTService } from '../../../service/iot.service';


//others
declare var jQuery: any;


//http + rxjs
import { Subject } from 'rxjs/Subject';
//import { CellarDTO } from '../../../../entities/http/CellarDTO';
import { Observable } from 'rxjs/Observable';



@Component({
    templateUrl: './place-detail.html',
    styleUrls: ['./place-detail.scss']
})
export class PlaceDetail {
    private sub: any;

    lat: number = 50.108445;
    lng: number = 14.452613;

    item: CellarPlace;
    item_spaces: CellarSpace[];



    validations: Message[] = [];
    messagesToUser: Message[] = [];

    //validation properties
    isStateValid: boolean = true;
    isMainPictureValid: boolean = true;
    isNameValid: boolean = true;
    isPathValid: boolean = true;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService,
        public iotservice: IoTService) {
            this.sharedService.setCurrentRoute();
    }


    ngOnInit() {
        this.getData();
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }




    //*********************************/
    /* PLACE */
    //*********************************/

    private getData() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id']; // (+) converts string 'id' to a number

            //novy produkt
            if (id == 0) {
                //založíme nový produkt
                this.item = new CellarPlace();

                //Product-State
                this.item.state = "1";
            }
            //editace existujiciho produktu
            else {

                //zjistíme informace o produktu
                this.iotservice.GetCellarPlace(id.toString())
                    //GET SUBSPACES
                    .flatMap(ressss => {

                        let sometehing = <CellarPlace>ressss.data;
                        console.log(sometehing);

                        let ss2 = new CellarPlace().New(ressss.data);

                        let subspacesPath = ss2.getSubPath();

                        this.iotservice.GetCellarSpaces(subspacesPath)
                            .subscribe(aaa => {

                                this.item_spaces = <CellarSpace[]>aaa.data;

                                console.log(this.item_spaces);

                            });




                        return Observable.of(ressss);
                    })
                    .subscribe(art => {
                        let response = art;



                        //BEZ CHYB ze serveru
                        if (response.isOK) {
                            this.item = <CellarPlace>response.data;


                            this.lat = parseFloat(this.item.latitude);
                            this.lng = parseFloat(this.item.longtitude);

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
                        console.log('getData() completed');
                    });

            }
        });
    }


    private savePlace() {





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
        // if (!this.item.path)
        // {
        //     this.validations.push({
        //         severity: 'warn',
        //         summary: 'Path',
        //         detail: 'Path is required'
        //     });
        //     this.isPathValid = false;
        // }
        // else
        // {
        //     this.isPathValid = true;
        // }


        if (this.validations.length == 0) {

            //UPDATE produktu
            if (this.item.id != undefined) {
                this.iotservice.UpdateCellarPlace(this.item)
                    .subscribe(art => {
                        let response = art;

                        //BEZ CHYB ze serveru
                        if (response.isOK) {
                            this.item = <CellarPlace>response.data;


                            this.messagesToUser.push({
                                severity: 'success',
                                summary: '! UPDATED !',
                                detail: 'Product has been updated'
                            });
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
                this.iotservice.AddCellarPlace(this.item)
                    .subscribe(art => {
                        let response = art;

                        //BEZ CHYB ze serveru
                        if (response.isOK) {
                            this.item = <CellarPlace>response.data;


                            //this.messagesToUser.push({
                            //    severity: 'success',
                            //    summary: '! ADDED !',
                            //    detail: 'Product has been added'
                            //});

                            this.router.navigate(['place/' + this.item.id]);

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
                        console.log('savePlace() completed');
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




    selectItem(id: string){
        this.sharedService.route("space/"+id);
    }



}