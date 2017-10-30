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


//others
declare var jQuery: any;


//http + rxjs
import { Subject } from 'rxjs/Subject';
//import { CellarDTO } from '../../../../entities/http/CellarDTO';
import { Observable } from 'rxjs/Observable';



@Component({
    templateUrl: './space-detail.html',
    styleUrls: ['./space-detail.scss']
})
export class SpaceDetail
{

    item: CellarSpace;


    allSenzors: Array<CellarSenzor>;

    private sub: any;
    page: number = 1;
    itemsPerPage: number = 50;
    search: string = '';


    imageCDNaddress: string = "https://internetaveci.blob.core.windows.net/img/";
    

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
        public iotservice: IoTService)
    {
        
    }


    ngOnInit()
    {
        //*********************************/
        //CALL WEBAPI - GET DATA
        //*********************************/
        this.getData();
    }
    ngOnDestroy()
    {
        this.sub.unsubscribe();
    }




    //*********************************/
    /* PRODUKT */
    //*********************************/

    private getData()
    {
        this.sub = this.route.params.subscribe(params =>
        {
            let id = params['id']; // (+) converts string 'id' to a number

            //novy produkt
            if (id == 0)
            {
                //založíme nový produkt
                this.item = new CellarSpace();

                //Product-State
                this.item.state = "1";
            }
            //editace existujiciho produktu
            else
            {

                //zjistíme informace o produktu
                this.iotservice.GetCellarSpace(id.toString())
                    .subscribe(art =>
                    {
                        let response = art;

                        

                        //BEZ CHYB ze serveru
                        if (response.isOK)
                        {
                            this.item = <CellarSpace>response.data;

                        }
                        //NON-VALID ze serveru
                        else if (!response.isValid)
                        {
                            //???
                            console.error(response.validations);
                        }
                        //custom ERROR ze serveru
                        else if (response.isCustomError)
                        {
                            //???
                            console.error(response.customErrorText);
                        }
                        //identity ERROR ze serveru
                        else if (response.isIdentityError)
                        {
                            //???
                            console.error(response.identityErrorText);
                        }
                        //EXCEPTION ze serveru
                        else if (response.isException)
                        {
                            //???
                            console.error(response.exceptionText);
                        }
                    },
                    error =>
                    {
                        console.error(error);
                    },
                    () =>
                    {
                        console.log('getData() completed');
                    });

            }
        });
    }


    private saveProduct()
    {



        

        //validace
        if (this.item.state === "0")
        {
            this.validations.push({
                severity: 'warn',
                summary: 'State',
                detail: 'State is required'
            });
            this.isStateValid = false;
        }
        else
        {
            this.isStateValid = true;
        }
        if (!this.item.image)
        {
            this.validations.push({
                severity: 'warn',
                summary: 'Main Image',
                detail: 'Main Image is required'
            });
            this.isMainPictureValid = false;
        }
        else
        {
            this.isMainPictureValid = true;
        }
        if (!this.item.name)
        {
            this.validations.push({
                severity: 'warn',
                summary: 'Name',
                detail: 'Name is required'
            });
            this.isNameValid = false;
        }
        else
        {
            this.isNameValid = true;
        }
        if (!this.item.path)
        {
            this.validations.push({
                severity: 'warn',
                summary: 'Path',
                detail: 'Path is required'
            });
            this.isPathValid = false;
        }
        else
        {
            this.isPathValid = true;
        }


        if (this.validations.length == 0)
        {

            //UPDATE produktu
            if (this.item.id != undefined)
            {
                this.iotservice.UpdateCellarSpace(this.item)
                    .subscribe(art =>
                    {
                        let response = art;

                        //BEZ CHYB ze serveru
                        if (response.isOK)
                        {
                            this.item = <CellarSpace>response.data;


                            this.messagesToUser.push({
                                severity: 'success',
                                summary: '! UPDATED !',
                                detail: 'Product has been updated'
                            });
                        }
                        //NON-VALID ze serveru
                        else if (!response.isValid)
                        {
                            //???
                            console.error(response.validations);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Non-valid'
                            });
                        }
                        //custom ERROR ze serveru
                        else if (response.isCustomError)
                        {
                            //???
                            console.error(response.customErrorText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Custom Error -' + response.customErrorText
                            });
                        }
                        //identity ERROR ze serveru
                        else if (response.isIdentityError)
                        {
                            //???
                            console.error(response.identityErrorText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Identity Error -' + response.identityErrorText
                            });
                        }
                        //EXCEPTION ze serveru
                        else if (response.isException)
                        {
                            //???
                            console.error(response.exceptionText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Exception -' + response.exceptionText
                            });
                        }
                    },
                    error =>
                    {
                        console.error(error);

                        this.messagesToUser.push({
                            severity: 'error',
                            summary: 'From ???',
                            detail: error
                        });
                    },
                    () =>
                    {
                        console.log('saveProduct() completed');
                    });
            }
            //ZALOZENI noveho produktu
            else
            {
                this.iotservice.AddCellarSpace(this.item)
                    .subscribe(art =>
                    {
                        let response = art;

                        //BEZ CHYB ze serveru
                        if (response.isOK)
                        {
                            this.item = <CellarSpace>response.data;


                            //this.messagesToUser.push({
                            //    severity: 'success',
                            //    summary: '! ADDED !',
                            //    detail: 'Product has been added'
                            //});

                            this.router.navigate(['space/' + this.item.id]);

                        }
                        //NON-VALID ze serveru
                        else if (!response.isValid)
                        {
                            //???
                            console.error(response.validations);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Non-valid'
                            });
                        }
                        //custom ERROR ze serveru
                        else if (response.isCustomError)
                        {
                            //???
                            console.error(response.customErrorText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Custom Error -' + response.customErrorText
                            });
                        }
                        //identity ERROR ze serveru
                        else if (response.isIdentityError)
                        {
                            //???
                            console.error(response.identityErrorText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Identity Error -' + response.identityErrorText
                            });
                        }
                        //EXCEPTION ze serveru
                        else if (response.isException)
                        {
                            //???
                            console.error(response.exceptionText);

                            this.messagesToUser.push({
                                severity: 'error',
                                summary: 'From Server',
                                detail: 'Exception -' + response.exceptionText
                            });
                        }
                    },
                    error =>
                    {
                        console.error(error);

                        this.messagesToUser.push({
                            severity: 'error',
                            summary: 'From ???',
                            detail: error
                        });
                    },
                    () =>
                    {
                        console.log('saveProduct() completed');
                    });
            }

        }
    }





    // //*********************************/
    // //STATE
    // //*********************************/

    public selectState(e: any)
    {
        var aaa = e.srcElement.innerHTML.toLowerCase();




        // for (var i = 0; i < this.statesList.length; i++)
        // {
        //     var abcd = this.statesList[i];

        //     if (abcd.name.toLowerCase() == aaa)
        //     {
        //         this.item.state = abcd;
        //     }
        // }





        if (aaa === "new")
        {
            this.item.state = "1";

            

            jQuery("#new").removeClass();
            jQuery("#approved").removeClass();
            jQuery("#forbidden").removeClass();

            jQuery("#new").addClass("btn btn-warning");
            jQuery("#approved").addClass("btn");
            jQuery("#forbidden").addClass("btn");
        }
        else if (aaa === "approved")
        {
            this.item.state = "2";

            jQuery("#new").removeClass();
            jQuery("#approved").removeClass();
            jQuery("#forbidden").removeClass();

            jQuery("#new").addClass("btn");
            jQuery("#approved").addClass("btn btn-success");
            jQuery("#forbidden").addClass("btn");
        }
        else if (aaa === "forbidden")
        {
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

    public addMainPictureChangeEvent(fileInput: any)
    {

        if (fileInput.target.files && fileInput.target.files[0])
        {
            let fileToUpload = fileInput.target.files[0];
            console.log(fileToUpload.name);

            this.iotservice.uploadFullSmall(fileToUpload)
                .subscribe(art =>
                {
                    let response = art;

                    //BEZ CHYB ze serveru
                    if (response.isOK)
                    {
                        
                        var url = response.data as string;
                        

                        this.item.image = url;
                        
                        console.log(this.item.image);
                        

                    }
                    //NON-VALID ze serveru
                    else if (!response.isValid)
                    {
                        //???
                        console.error(response.validations);
                    }
                    //custom ERROR ze serveru
                    else if (response.isCustomError)
                    {
                        //???
                        console.error(response.customErrorText);
                    }
                    //identity ERROR ze serveru
                    else if (response.isIdentityError)
                    {
                        //???
                        console.error(response.identityErrorText);
                    }
                    //EXCEPTION ze serveru
                    else if (response.isException)
                    {
                        //???
                        console.error(response.exceptionText);
                    }
                },
                error =>
                {
                    console.error(error);
                },
                () =>
                {
                    console.log('addMainPictureChangeEvent() completed');
                });

        }
    }







    private getAllSenzors()
    {
        console.log('SpaceDetail getAllSenzors()');

        // HTTP call
        this.iotservice.GetCellarSenzors()
            .subscribe(res =>
            {
                let response = res;

                //BEZ CHYB ze serveru
                if (response.isOK)
                {
                    this.allSenzors = <Array<CellarSenzor>>response.data;
                }
                //NON-VALID ze serveru
                else if (!response.isValid)
                {
                    //???
                    console.error(response.validations);
                }
                //custom ERROR ze serveru
                else if (response.isCustomError)
                {
                    //???
                    console.error(response.customErrorText);
                }
                //identity ERROR ze serveru
                else if (response.isIdentityError)
                {
                    //???
                    console.error(response.identityErrorText);
                }
                //EXCEPTION ze serveru
                else if (response.isException)
                {
                    //???
                    console.error(response.exceptionText);
                }

            },
            error =>
            {
                console.error(error);

            },
            () =>
            {
                console.log('getAllSenzors() completed');
            });
    }


    private selectSenzor(event)
    {
        var id = event.data.id;
        console.log(id);

        // let newOne = new CatalogProductHckProduct();
        // newOne.catalogProductId = this.item.id;
        // newOne.hckProductId = id;


        // /*********************************************************/
        // /*********************************************************/
        // //SPUSTENI NAJEDNOU / PARALLELNE - ForkJoin
        // /*********************************************************/
        // /*********************************************************/

        // Observable.forkJoin(
        //     this.businessService.AddCatalogProductHckProduct(newOne),
        //     this.hckService.GetProduct(id)
        // ).subscribe(
        //     data =>
        //     {
        //         var data1 = <CellarDTO>data[0];

        //         //BEZ CHYB ze serveru
        //         if (data1.isOK)
        //         {
        //             var resultGet = <boolean>data1.data;
        //             if (resultGet == true)
        //             {


        //                 var data2 = <CellarDTO>data[1];

        //                 //BEZ CHYB ze serveru
        //                 if (data2.isOK)
        //                 {
        //                     var resultHck = <HckProduct>data2.data;
        //                     if (!this.itemhckitems)
        //                     {
        //                         this.itemhckitems = new Array<HckProduct>();
        //                     }

        //                     this.itemhckitems.push(resultHck);
        //                 }
        //                 //NON-VALID ze serveru
        //                 else if (!data2.isValid)
        //                 {
        //                     //???
        //                     console.error(data2.validations);
        //                 }
        //                 //custom ERROR ze serveru
        //                 else if (data2.isCustomError)
        //                 {
        //                     //???
        //                     console.error(data2.customErrorText);
        //                 }
        //                 //identity ERROR ze serveru
        //                 else if (data2.isIdentityError)
        //                 {
        //                     //???
        //                     console.error(data2.identityErrorText);
        //                 }
        //                 //EXCEPTION ze serveru
        //                 else if (data2.isException)
        //                 {
        //                     //???
        //                     console.error(data2.exceptionText);
        //                 }




        //             }
        //             else
        //             {
        //                 console.log("??????????");
        //             }
        //         }
        //         //NON-VALID ze serveru
        //         else if (!data1.isValid)
        //         {
        //             //???
        //             console.error(data1.validations);
        //         }
        //         //custom ERROR ze serveru
        //         else if (data1.isCustomError)
        //         {
        //             //???
        //             console.error(data1.customErrorText);
        //         }
        //         //identity ERROR ze serveru
        //         else if (data1.isIdentityError)
        //         {
        //             //???
        //             console.error(data1.identityErrorText);
        //         }
        //         //EXCEPTION ze serveru
        //         else if (data1.isException)
        //         {
        //             //???
        //             console.error(data1.exceptionText);
        //         }

        //     },
        //     err =>
        //     {
        //         console.error(err);
        //     }
        //     );

        //console.log(this.itemhckitems);
    }



    onBack()
    {
        this.router.navigate(['spaces/dashboard']);
    }


}