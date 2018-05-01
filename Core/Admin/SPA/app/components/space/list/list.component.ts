import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CellarSpace } from 'app/entities/CellarSpace';
import { SelectItem, DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-space-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SpaceListComponent implements OnInit {

  @Input()
  items: Array<CellarSpace>;

  @Output()
  onSelect = new EventEmitter<CellarSpace>()


  rawItems: Array<CellarSpace>;
  selectedItem: CellarSpace;

  states: SelectItem[];

  page: number = 1;
  itemsPerPage: number = 50;
  search: string = '';

  @ViewChild('dt') dataTable: DataTable;


  constructor() { }

  ngOnInit() {

    this.states = [];
    this.states.push({ label: 'All States', value: null });
    this.states.push({ label: 'New', value: '1' });
    this.states.push({ label: 'Approved', value: '2' });
    this.states.push({ label: 'Frobidden', value: '3' });

  }

  onFilter(event) {
    if (event && event.filters) {
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
  onRowSelect(event) {
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


    this.onSelect.emit(event.data);

  }


  // wasSet: boolean = false;
  // ngAfterViewChecked()
  // {
  //     if (this.dataTable)
  //     {
  //         if (!this.wasSet)
  //         {
  //             this.setCurrentPage();
  //             this.wasSet = true;
  //         }
  //     }
  // }





  // setCurrentPage()
  // {
  //     if (this.dataTable)
  //     {

  //         // let n = 1;
  //         // let meta = this.sharedService.getCurrentDatatableMeta();
  //         // if (typeof meta !== "undefined")
  //         // {
  //         //     n = meta.currentPage;

  //         //     if (typeof meta.sortField !== "undefined")
  //         //     {
  //         //         this.dataTable.sortField = meta.sortField;
  //         //         this.dataTable.sortOrder = meta.sortOrder;
  //         //     }

  //         //     this.dataTable.filters = meta.filters;

  //         //     var asdf = {
  //         //         filters: meta.filters
  //         //     }


  //         //     this.onFilter(asdf);


  //         //     ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //         //     ////HACK aby zafungoval filtr !!!!!!!!!!!!!!!!
  //         //     ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //         //     this.changeDetectorRef.detectChanges();
  //         // }

  //         // if (n > 1)
  //         // {
  //         //     let paging = {
  //         //         first: n,
  //         //         rows: this.dataTable.rows
  //         //     };
  //         //     // the problem is that if we set sorting, the table is
  //         //     // always going back to page 1, so we set a timer to go
  //         //     // back to the current page ...
  //         //     let timer = Observable.timer(100);
  //         //     timer.subscribe(t =>
  //         //     {
  //         //         this.dataTable.paginate(paging)
  //         //     });
  //         // }



  //     }
  // }





}
