import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';

@Injectable()
export class DealModel {
    merchantId: any = null;
    merchantName: any = null;
    dealname!: string;
    description!: string;
    customDesc!: string;
    category: any;
    subCatg: any;
    zipCode: any;
    city:any;
    datepipe = new DatePipe('en-us');
    selectedDays: any;
    dealfilename : any;
    dealimage: any;
    dealsId: any;
    dealStatus:any;

    resetModelData() {
        this.dealsId = null;
    }

    setMerchantDetails(data: any) {
        this.merchantId = data.businessId;
        this.merchantName = data.businessName;
        this.category = data.category;
        this.subCatg = data.subCategory;
        this.zipCode = data.zipCode;
        this.city = data.city;
    }

    setCustomDealModel(customDeal: any) {
        this.customDesc = customDeal;
    }

    transformDate(dataObj: any) {
        let dateObj = new Date(dataObj.year, dataObj.month - 1, dataObj.day);
        return this.datepipe.transform(dateObj, 'yyyy-MM-dd')!.toLocaleUpperCase() + "T00:00:00.000Z"; 
    }

    transformTime(timeObj: any) {
        //let fromMinute = ("0" + timeObj.minute).slice(-2);
        return timeObj.hour;
    }

    setDays(daysArr:any) {
        this.selectedDays = daysArr;
        if(daysArr.length < 1) {
            this.selectedDays = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ]
        }
    }

    setFileName(data:any) {
        this.dealfilename = data.file;
    }

    transformData(data: any) {
        let formDt = data.value;
        return {
            "id":this.dealsId,
            "merchantid": this.merchantId,
            "merchantname": this.merchantName,
            "category": this.category,
            "subCategory": this.subCatg,
            "zipCode": this.zipCode,
            "city":this.city,
            "name": formDt.dealName,
            "description": formDt.dealDescription,
            "dealType": formDt.dealType,
            "discount": formDt.dollarDiscount,
            "minpurchase": formDt.minimumPurchase,
            "fromdate": this.transformDate(formDt.fromDate), //"2020-01-01T17:00:00.000Z"
            "todate": this.transformDate(formDt.toDate),// "2020-03-01T22:00:00.000Z",
            "starttime": this.transformTime(formDt.fromTime),
            "endtime":this.transformTime(formDt.toTime),
            "days": this.selectedDays,
            "dealfilename": this.dealfilename,
            "dealimageId": this.dealimage,
            "dealQRCodeId": null,
            "couponlimit": formDt.totalCoupons,
            "disclaimer": formDt.disclaimer,
            "dealstatus": this.dealStatus

        }
    }
}