import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TableService } from './table.service';
import { ViewChild } from '@angular/core';
import { Column2 } from './column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableService]
})
export class TableComponent implements OnInit {
  columns: Column2[];
  data: any[];
  selectedRows: any[];
  selectedColumns: Column2[];

  constructor(private service: TableService) { }

  ngOnInit() {
    this.service.getData().subscribe(_data => { this.data = _data; });
    this.service.getColumns().subscribe(
      _columns => {
        this.columns = _columns.map<Column2>(column => {
          return {
            id: column.id,
            value: 'EVU_' + column.classFieldName.toUpperCase(),
            columnType: column.columnType,
            filterColumnType: column.filterColumnType,
            label: column.displayName.toString(),
            filterable: column.filterable,
            sortable: column.sortable
          };
        });
        this.selectedColumns = this.columns;
      }
    );
  }
}
