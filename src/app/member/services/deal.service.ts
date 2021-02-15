import { Injectable } from '@angular/core';

@Injectable({
    'providedIn': 'root'
})

export class DealService {
    dealsData: any;
    setDealsData(data: any) {
        this.dealsData = data;
    }

    getDealsData() {
        return this.dealsData;
    }

    resetDealsData() {
        this.dealsData = null;
    }
}
