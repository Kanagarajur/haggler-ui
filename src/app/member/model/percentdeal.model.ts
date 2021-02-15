import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()

export class PercentDealModel {

    datepipe = new DatePipe('en-us');
    discount: number;
    minPurchase: number;
    products: Array<string>;
    fromDate: string;
    toDate: string;
    startTime: string;
    endTime: string;
    days: Array<string>;
    couponLimit: number;
    disclaimer: string;

    setPdData(formData: any) {
        let data = formData.value;
        this.discount = data.percentDiscount;
        this.minPurchase = data.minimumPurchase;
        this.products = [];
        let fromDt = new Date(data.fromDate.year, data.fromDate.month - 1, data.fromDate.day);
        this.fromDate = this.datepipe.transform(fromDt, 'MMM-dd-yyyy').toLocaleUpperCase();

        let toDt = new Date(data.toDate.year, data.toDate.month - 1, data.toDate.day);
        this.toDate = this.datepipe.transform(toDt, 'MMM-dd-yyyy').toLocaleUpperCase();
        let fromMinute = ("0" + data.fromTime.minute).slice(-2);
        this.startTime = (data.fromTime.hour > 12) ? (data.fromTime.hour - 12) + ":" + fromMinute + " PM" : data.fromTime.hour + ":" + fromMinute + " AM";
        let toTime = ("0" + data.toTime.minute).slice(-2)
        this.endTime = (data.toTime.hour > 12) ? (data.toTime.hour - 12) + ":" + toTime + " PM" : data.toTime.hour + ":" + toTime + " AM";
        this.days = [];
        this.couponLimit = data.totalCoupons;
        this.disclaimer = data.disclaimer;
    }

    transformReq() {
        if (this.discount) {
            return {
                "discount": this.discount, //"20",
                "minpurchase": this.minPurchase, //"50",
                "products": this.products,
                /*[
                    "All Items"
                ]*/
                "fromdate": this.fromDate, //"Mar-15-2019",
                "todate": this.toDate, //"Apr-15-2019",
                "starttime": this.startTime, //"5 PM",
                "endtime": this.endTime, //"7 PM",
                "days": this.days,
                /* [
                    "Tuesday",
                    "Thursday"
                ] */
                "percentdealfilename": "percent.gif",
                "percentdealimage": null,
                "percentQRcode": null,
                "couponlimit": null,
                "disclaimer": this.disclaimer //"All Rights reserved by merchant"
            }
        } else {
            return {}
        }
    }
}
