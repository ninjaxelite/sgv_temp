import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiColumn } from './api-column';


@Injectable()
export class TableService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Array<any>> {
    return this.http.get<Array<any>>('/assets/data.json');
  }

  getColumns(): Observable<Array<ApiColumn>> {
    return this.http.get<Array<ApiColumn>>('/assets/header.json');
  }

}
