import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SpinnerService {

    public spinnerSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

    constructor() { }

    show(): boolean {
        this.spinnerSubject.next(true);
        return true;
    }

    hide(): boolean {
        this.spinnerSubject.next(false);
        return false;
    }

    getMessage(): Observable<any> {
        return this.spinnerSubject.asObservable();
    }
}