import { LazyLoadEvent, FilterMetadata } from 'primeng/primeng';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Column } from './column';
import { Table, TableHeaderCheckbox } from 'primeng/table';
import { CoreDataService } from './core-data.service';
import { SpinnerService } from '../../shared/spinner/spinner.service';
import { Stammdaten, STDDataIndicators } from './Stammdaten';

@Component({
  selector: 'app-core-data',
  templateUrl: './core-data.component.html',
  styleUrls: ['./core-data.component.scss'],
  providers: [CoreDataService]
})
export class CoreDataComponent implements OnInit {

  @ViewChild('dt') table: Table;
  @ViewChild('divOverlay') divOverlay: ElementRef;
  @ViewChild('tabHeaderChbx') tabHeaderChbx: TableHeaderCheckbox;

  @HostListener('keydown', ['$event']) onKeyDown(e) {
    // tab
    if (e.keyCode == 9) {
      this.onEditComplete(null, e);
    }
  }

  selectedData: Array<Stammdaten> = [];
  header: Array<Column> = [];
  stammdaten: Array<Stammdaten> = [];
  stdDataIndicators: STDDataIndicators;
  editable: Boolean = true;
  currentlyEditing: Boolean = false;
  inEditMode: Boolean = false;
  newRow: HTMLElement;
  newSTD: Stammdaten;

  rows: number = 20;
  rowPerPage: number[] = [10, 20, 30];
  totalRows: number;
  loading: boolean = false;

  constructor(private coreDataService: CoreDataService, private spinner: SpinnerService) { }

  ngOnInit() {
    // uncomment this 
    /*this.spinner.show();

    this.coreDataService.getTempSGVCoreData().subscribe(_data => {
      this.stammdaten = _data.map(d => {
        return { gattung: d.gatt, ladeLaenge: d.ladelaenge, ladeGewicht: d.ladegewicht };
      });
      this.divOverlay.nativeElement.style = "opacity: 1; pointer-events: all;";
      this.spinner.hide();
    });*/
    // -------------------

    this.loading = true;
    this.coreDataService.getTableHeader().forEach(c => this.header.push(c));
  }

  loadLazy(e: LazyLoadEvent) {
    //this.spinner.show();
    let f: String = ""; // filtering
    let s: String = ""; // sorting
    
    // set filter
    for (let p in e.filters) {
      f += p + ':' + e.filters[p].value + ',';
    }
    f.endsWith(',') ? f = f.slice(0, f.length - 1) : f;
    // set sorting
    e.multiSortMeta !== undefined ? e.multiSortMeta.forEach(p => s = p.field + ':' + (p.order == 1 ? 'ASC' : 'DESC')) : "";
    s === "" ? s = "ladeGewicht:DESC" : s;
    
    this.loading = true;
    this.coreDataService.getSGVCoreData(e.first / e.rows, e.rows, s, f).subscribe(_data => {
      this.stdDataIndicators = _data;
      this.stammdaten = this.stdDataIndicators.content;
      this.totalRows = this.stdDataIndicators.totalElements;
      this.loading = false;

      this.spinner.hide();
      this.divOverlay.nativeElement.style = 'opacity: 1; pointer-events: all;';
    });
  }

  addRow(dt: Table) {
    // TODO use service here
    if (this.newRow == null) {
      dt.editingCell = null;
      this.newSTD = new Stammdaten('', '', '');
      this.stammdaten.unshift(this.newSTD);
      this.jumpToNewCell(dt);
    }
  }

  deleteToggle(dt: Table) {
    //this.stammdaten = this.coreDataService.deleteSelectedDataXXXX(this.selectedData);
    this.selectedData = [];
    if (this.stammdaten.length == 0) {
      this.tabHeaderChbx.checked = false;
    }
  }

  onRowSelect(dt: Table, e) {
    this.closeEditingCell(dt);
    if (!this.isRowValid(this.newSTD)) {
      this.newRow = null;
    }
  }

  onEditComplete(dt: Table, e) {
    this.removeNewRowIfEmpty();
    if (!this.isNewRowStillEmpty()) {
      this.newRow.parentElement.style.outline = 'transparent';
      this.newRow = null;
    }

    if (this.isRowValid(this.newSTD)) {
      //this.coreDataService.insertNewStammdaten(this.newSTD);
    }
  }

  onEditInit(dt: Table, e) {
  }

  onEditCancel(dt: Table, e) {
    if (this.removeNewRowIfEmpty()) {
      this.newRow = null;
    }
  }

  findRow(rowIndex) {
    if (rowIndex != 0 && this.removeNewRowIfEmpty()) {
      this.newRow = null;
    }
  }

  jumpToNewCell(dt: Table) {
    setTimeout(() => {
      this.newRow = document.getElementById('gattung0');
      this.newRow.parentElement.style.outline = 'rgb(255, 87, 87) solid thin';
      dt.editingCell = this.newRow;
      dt.domHandler.addClass(dt.editingCell, 'ui-editing-cell');
      dt.zone.runOutsideAngular(() => {
        setTimeout(() => {
          let focusable = dt.domHandler.findSingle(dt.editingCell, 'input, textarea');
          if (focusable) {
            focusable.focus();
            //document.getElementById(colName.field + '0').getElementsByTagName('input')[0].placeholder = colName.field.toString().toUpperCase();
          }
        }, 50);
      });
    }, 50);
  }

  removeNewRowIfEmpty(): Boolean {
    for (let i = 0; i < this.stammdaten.length; i++) {
      let s = this.stammdaten[i];
      if (!s.gattung && !s.ladeGewicht && !s.ladeLaenge) {
        this.stammdaten.splice(this.stammdaten.indexOf(s), 1);
        return true;
      }
    }
    return false;
  }

  isNewRowStillEmpty(): Boolean {
    let newSTD: Stammdaten = this.stammdaten[0];
    if (!newSTD.gattung || !newSTD.ladeGewicht || !newSTD.ladeLaenge) {
      return true;
    }
    return false;
  }

  closeEditingCell(dt: Table) {
    if (this.isValid(dt)) {
      dt.domHandler.removeClass(dt.editingCell, 'ui-editing-cell');
      dt.editingCell = null;
    }
  }

  isRowValid(st: Stammdaten): Boolean {
    return st.gattung && st.ladeGewicht && st.ladeLaenge ? true : false;
  }

  isValid(dt) {
    return (dt.editingCell && dt.domHandler.find(dt.editingCell, '.ng-invalid.ng-dirty').length === 0);
  }
}
