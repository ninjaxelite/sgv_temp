import { HttpClient } from "@angular/common/http";
import { Stammdaten } from "./Stammdaten";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Column } from "./column";

@Injectable()
export class CoreDataService {

    apiUrl: String = "http://localhost:8080/api/";

    header: Array<Column> = [];

    constructor(private http: HttpClient) {
        this.header.push(new Column("gattung", "GATT", true, true, true));
        this.header.push(new Column("ladeLaenge", "LADELAENGE", true, true, true));
        this.header.push(new Column("ladeGewicht", "LADEGEWICHT", true, true, true));

        //this.st this.http.get<Stammdaten[]>("/assets/core-data.json");
    }

    getTempSGVCoreData(): Observable<any[]> {
        return this.http.get<any[]>("/assets/core-data.json");
    }

    getSGVCoreData(pInx: number, pSize: number, sortings?: String, filters?: String): Observable<any> {
        //let stdObs: Observable<Stammdaten[]> = this.http.get<Stammdaten[]>("/assets/core-data.json");
        return this.http.get<any>(this.apiUrl + "stammdatenGattung?pageIdx="+pInx+"&pageSize="+pSize+"&sortings="+sortings+"&filters="+filters);
    }

    getTableHeader(): Array<Column> {
        return this.header;
    }

    /*insertNewStammdaten(sd: Stammdaten) {
        return this.http.post<any>(this.apiUrl + "stammdaten?pageIdx=0&pageSize=50","");
        // TODO: rest call for new data
    }

    deleteSelectedData(selectedData: Array<Stammdaten>): Array<Stammdaten> {
        selectedData.forEach(data => {
            let i = -1;
            (i = this.findIndex(this.stammdaten, data)) > -1 ? this.stammdaten.splice(i, 1) : "";
        });
        
        return this.stammdaten;
    }*/

    findIndex(st: Array<Stammdaten>, data: Stammdaten) {
        for (let i = 0; i < st.length; i++) {
            if (data.gattung == st[i].gattung && data.ladeGewicht == st[i].ladeGewicht && data.ladeLaenge == st[i].ladeLaenge) {
                return i;
            }
        };
        return -1;
    }
}