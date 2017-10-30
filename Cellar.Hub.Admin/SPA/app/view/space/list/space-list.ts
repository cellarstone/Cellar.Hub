import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable'

import { SelectItem } from 'primeng/primeng';
import { DataTable } from 'primeng/primeng';

// import { DatatableModel } from '../../../../models/shared/datatableModel';
// import { SharedService } from '../../../../service/shared.service';


// import { Product } from '../../../../entities/catalog/product';
// import { CatalogService } from '../../../../service/catalog.service';


@Component({
    selector: 'space-list',
    templateUrl: './space-list.html',
    styleUrls: ['./space-list.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SpaceList implements OnInit {
    
    private sub: any;

    // rawItems: Array<Product>;
    // items: Array<Product>;
    // selectedItem: Product;

    states: SelectItem[];

    gbpczkCourse: number = 31
    usdczkCourse: number = 25;


    imageCDNaddress: string = "https://internetaveci.blob.core.windows.net/img/";

    page: number = 1;
    itemsPerPage: number = 50;
    search: string = '';

    @ViewChild('dt') dataTable: DataTable;







    constructor(private route: ActivatedRoute,
        private router: Router,
        // private catalogService: CatalogService,
        // private sharedService: SharedService,
        private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit()
    {
        this.getData();

        this.states = [];
        this.states.push({ label: 'All States', value: null });
        this.states.push({ label: 'New', value: 'NEW' });
        this.states.push({ label: 'Approved', value: 'APPROVED' });
        this.states.push({ label: 'Frobidden', value: 'FORBIDDEN' });

    }


    wasSet: boolean = false;
    ngAfterViewChecked()
    {
        if (this.dataTable)
        {
            if (!this.wasSet)
            {
                this.setCurrentPage();
                this.wasSet = true;
            }
        }
    }




    //zalozeni noveho produktu
    newProduct()
    {
        this.router.navigate(['catalog/product', 0]);
    }



    //Ziskani dat ze serveru
    private getData()
    {
        console.log('CatalogProductList getData()');
        
        // HTTP call
        //  this.catalogService.GetProducts()
        //     .subscribe(res =>
        //     {
        //         let response = res;

        //         //BEZ CHYB ze serveru
        //         if (response.isOK)
        //         {
        //             this.items = <Array<Product>>response.data;

        //             this.rawItems = <Array<Product>>response.data;


        //             var i = 5;
        //         }
        //         //NON-VALID ze serveru
        //         else if (!response.isValid)
        //         {
        //             //???
        //             console.error(response.validations);
        //         }
        //         //custom ERROR ze serveru
        //         else if (response.isCustomError)
        //         {
        //             //???
        //             console.error(response.customErrorText);
        //         }
        //         //identity ERROR ze serveru
        //         else if (response.isIdentityError)
        //         {
        //             //???
        //             console.error(response.identityErrorText);
        //         }
        //         //EXCEPTION ze serveru
        //         else if (response.isException)
        //         {
        //             //???
        //             console.error(response.exceptionText);
        //         }

        //     },
        //     error =>
        //     {
        //         console.error(error);
        //     },
        //     () =>
        //     {
        //         console.log('getData() completed');
        //     });
    }













    onFilter(event)
    {
        if (event && event.filters)
        {
            // var tempColl = new Array<Product>();
            // var tempColl2 = new Array<Product>();


            // if (event.filters["producer.name"])
            // {
            //     let value = event.filters["producer.name"].value;
            //     for (let entry of this.rawItems)
            //     {

            //         if (entry.producer.name.toLowerCase().includes(value.toLowerCase()))
            //         {
            //             tempColl.push(entry);
            //         }

            //     }
            // }

            // if (event.filters["state.name"])
            // {
            //     let value = event.filters["state.name"].value;


            //     if (tempColl.length == 0)
            //     {
            //         for (let entry of this.rawItems)
            //         {

            //             if (entry.state.name.toLowerCase().includes(value.toLowerCase()))
            //             {
            //                 tempColl.push(entry);
            //             }

            //         }
            //     }
            //     else
            //     {
            //         for (let entry of tempColl)
            //         {

            //             if (entry.state.name.toLowerCase().includes(value.toLowerCase()))
            //             {
            //                 tempColl2.push(entry);
            //             }

            //         }
            //     }
            // }



            // if (tempColl2.length != 0)
            // {
            //     this.items = tempColl2;
            // }
            // else if (tempColl2.length == 0)
            // {
            //     this.items = tempColl;
            // }
            // else if (tempColl2.length == 0)
            // {
            //     this.items = this.rawItems;
            // }
            
        }
    }

    //Vybrani existujiciho produktu z kolekce
    onRowSelect(event)
    {
        //var aaa = this.dataTable.filters;
        //var bbb = this.dataTable.first; //cislo aktualniho radku ??
        //var ccc = this.dataTable.multiSortMeta;
        //var ddd = this.dataTable.page; //cislo aktualniho radku ??
        //var eee = this.dataTable.paginatorPosition;
        //var fff = this.dataTable.rows; //vyfiltrovane radky ??
        //var ggg = this.dataTable.sortField;
        //var hhh = this.dataTable.sortOrder;


        // this.sharedService.datatable_Metadata = new DatatableModel();

        // this.sharedService.datatable_Metadata.filters = this.dataTable.filters;
        // this.sharedService.datatable_Metadata.sortField = this.dataTable.sortField;
        // this.sharedService.datatable_Metadata.sortOrder = this.dataTable.sortOrder;
        // this.sharedService.datatable_Metadata.multiSortMeta = this.dataTable.multiSortMeta;
        // this.sharedService.datatable_Metadata.currentRows = this.dataTable.rows;
        // this.sharedService.datatable_Metadata.currentPage = this.dataTable.first;



        console.log(event);
        console.log(event.data);

        var id = event.data.id;

        this.router.navigate(['catalog/product', id]);
    }

    setCurrentPage()
    {
        if (this.dataTable)
        {

            // let n = 1;
            // let meta = this.sharedService.getCurrentDatatableMeta();
            // if (typeof meta !== "undefined")
            // {
            //     n = meta.currentPage;

            //     if (typeof meta.sortField !== "undefined")
            //     {
            //         this.dataTable.sortField = meta.sortField;
            //         this.dataTable.sortOrder = meta.sortOrder;
            //     }

            //     this.dataTable.filters = meta.filters;

            //     var asdf = {
            //         filters: meta.filters
            //     }


            //     this.onFilter(asdf);


            //     ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //     ////HACK aby zafungoval filtr !!!!!!!!!!!!!!!!
            //     ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //     this.changeDetectorRef.detectChanges();
            // }

            // if (n > 1)
            // {
            //     let paging = {
            //         first: n,
            //         rows: this.dataTable.rows
            //     };
            //     // the problem is that if we set sorting, the table is
            //     // always going back to page 1, so we set a timer to go
            //     // back to the current page ...
            //     let timer = Observable.timer(100);
            //     timer.subscribe(t =>
            //     {
            //         this.dataTable.paginate(paging)
            //     });
            // }



        }
    }


















    
}
