import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DataTable, SelectItem } from 'primeng/primeng';
import { CellarSenzor } from 'app/entities/CellarSenzor';
import { SharedService } from 'app/service/shared.service';
import { DatatableModel } from 'app/models/shared/datatableModel';

@Component({
  selector: 'app-senzor-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SenzorListComponent implements OnInit {

  @Input()
  items: CellarSenzor[] = [];

  @Output()
  onSelect = new EventEmitter<CellarSenzor>();

  rawItems: CellarSenzor[];
  selectedItem: CellarSenzor;

  states: SelectItem[];

  page: number = 1;
  itemsPerPage: number = 50;
  search: string = '';

  @ViewChild('dt') dataTable: DataTable;


  constructor(private sharedService: SharedService) { }

  ngOnInit() {

    this.states = [];
    this.states.push({ label: 'All States', value: null });
    this.states.push({ label: 'New', value: 'NEW' });
    this.states.push({ label: 'Approved', value: 'APPROVED' });
    this.states.push({ label: 'Frobidden', value: 'FORBIDDEN' });

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




  onFilter(event) {


    this.rawItems = this.items;


    if (event && event.filters) {
      var tempColl = new Array<CellarSenzor>();
      var tempColl2 = new Array<CellarSenzor>();



      if (event.filters["state.name"]) {
        let value = event.filters["state.name"].value;


        if (tempColl.length == 0) {
          for (let entry of this.rawItems) {

            if (entry.state.toLowerCase().includes(value.toLowerCase())) {
              tempColl.push(entry);
            }

          }
        }
        else {
          for (let entry of tempColl) {

            if (entry.state.toLowerCase().includes(value.toLowerCase())) {
              tempColl2.push(entry);
            }

          }
        }
      }



      if (tempColl2.length != 0) {
        this.items = tempColl2;
      }
      else if (tempColl2.length == 0) {
        this.items = tempColl;
      }
      else if (tempColl2.length == 0) {
        this.items = this.rawItems;
      }

    }
  }

  //Vybrani existujiciho produktu z kolekce
  onRowSelect(event) {
    var aaa = this.dataTable.filters;
    var bbb = this.dataTable.first; //cislo aktualniho radku ??
    var ccc = this.dataTable.multiSortMeta;
    var ddd = this.dataTable.page; //cislo aktualniho radku ??
    var eee = this.dataTable.paginatorPosition;
    var fff = this.dataTable.rows; //vyfiltrovane radky ??
    var ggg = this.dataTable.sortField;
    var hhh = this.dataTable.sortOrder;


    this.sharedService.datatable_Metadata = new DatatableModel();

    this.sharedService.datatable_Metadata.filters = this.dataTable.filters;
    this.sharedService.datatable_Metadata.sortField = this.dataTable.sortField;
    this.sharedService.datatable_Metadata.sortOrder = this.dataTable.sortOrder;
    this.sharedService.datatable_Metadata.multiSortMeta = this.dataTable.multiSortMeta;
    this.sharedService.datatable_Metadata.currentRows = this.dataTable.rows;
    this.sharedService.datatable_Metadata.currentPage = this.dataTable.first;



    console.log(event);
    console.log(event.data);

    var id = event.data.id;

    this.onSelect.emit(event.data);
  }

  // setCurrentPage()
  // {
  //     if (this.dataTable)
  //     {

  //         let n = 1;
  //         let meta = this.sharedService.getCurrentDatatableMeta();
  //         if (typeof meta !== "undefined")
  //         {
  //             n = meta.currentPage;

  //             if (typeof meta.sortField !== "undefined")
  //             {
  //                 this.dataTable.sortField = meta.sortField;
  //                 this.dataTable.sortOrder = meta.sortOrder;
  //             }

  //             this.dataTable.filters = meta.filters;

  //             var asdf = {
  //                 filters: meta.filters
  //             }


  //             this.onFilter(asdf);


  //             ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //             ////HACK aby zafungoval filtr !!!!!!!!!!!!!!!!
  //             ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //             this.changeDetectorRef.detectChanges();
  //         }

  //         if (n > 1)
  //         {
  //             let paging = {
  //                 first: n,
  //                 rows: this.dataTable.rows
  //             };
  //             // the problem is that if we set sorting, the table is
  //             // always going back to page 1, so we set a timer to go
  //             // back to the current page ...
  //             let timer = Observable.timer(100);
  //             timer.subscribe(t =>
  //             {

  //                 //PREDELAT
  //                 this.dataTable.paginate()
  //             });
  //         }



  //     }
  // }






}
