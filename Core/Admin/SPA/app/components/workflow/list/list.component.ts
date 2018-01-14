import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { CellarWorkflow } from 'app/entities/CellarWorkflow';
import { SelectItem, DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class WorkflowListComponent implements OnInit {

  @Input()
  items: Array<CellarWorkflow>;

  @Output()
  onSelect = new EventEmitter<CellarWorkflow>()


  rawItems: Array<CellarWorkflow>;
  selectedItem: CellarWorkflow;

  states: SelectItem[];

  page: number = 1;
  itemsPerPage: number = 50;
  search: string = '';

  @ViewChild('dt') dataTable: DataTable;


  constructor() { }

  ngOnInit() {

    this.states = [];
    this.states.push({ label: 'All States', value: null });
    this.states.push({ label: 'New', value: 'NEW' });
    this.states.push({ label: 'Approved', value: 'APPROVED' });
    this.states.push({ label: 'Frobidden', value: 'FORBIDDEN' });

  }

  onFilter(event) {
    if (event && event.filters) {
      
    }
  }

  onRowSelect(event) {

    var id = event.data.id;
    this.onSelect.emit(event.data);

  }


}
