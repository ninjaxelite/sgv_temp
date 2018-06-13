export enum ColumnType {
    STRING,
    INTEGER,
    DATETIME
}
export interface ApiColumn {
    id: Number;
    classFieldName: String;
    columnType: ColumnType;
    filterColumnType: ColumnType;
    displayName: String;
    filterable: Boolean;
    sortable: Boolean;
}

