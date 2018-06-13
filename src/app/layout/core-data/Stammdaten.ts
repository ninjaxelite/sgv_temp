export class STDDataIndicators {

    content: Array<Stammdaten>;
    first: Boolean;
    last: Boolean;
    number: number;
    numberOfElements: number;
    size: number;
    sort: any;
    totalElements: number;
    totalPages: number;

    constructor(content: Array<Stammdaten>, first: Boolean, last: Boolean, number: number, numberOfElements: number, size: number,
        sort: any, totalElements: number, totalPages: number) {
        this.content = content;
        this.first = first;
        this.last = last;
        this.number = number;
        this.numberOfElements = numberOfElements;
        this.size = size;
        this.sort = sort;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

}

export class Stammdaten {

    constructor(public gattung: String, public ladeLaenge: String, public ladeGewicht: String) { }
}