import { ColumnType } from './api-column';
import { SelectItem } from 'primeng/components/common/selectitem';

export interface Column2 extends SelectItem {
    id: Number;
    value: any;
    columnType: ColumnType;
    filterColumnType: ColumnType;
    label: string;
    filterable: Boolean;
    sortable: Boolean;
}

export class Column {
    field: String;
    header: String;
    editable: Boolean = false;
    sortable: Boolean = true;
    filterable: Boolean = true;
    type: ColumnType;

    constructor(field: String, header: String, editable: Boolean, sortable: Boolean, filterable: Boolean, type?: ColumnType) {
        this.field = field;
        this.header = header;
        this.editable = editable;
        this.sortable = sortable;
        this.filterable = filterable;
        this.type = type;
    }
}