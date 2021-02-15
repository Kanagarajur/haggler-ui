import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { MemberApi } from 'src/app/shared/services/memberApi';
declare var paypal:any;

@Component(
    {
        templateUrl: '../views/paypal.component.html',
        styles: []
    }
)
export class PaypalPaymentComponent extends BaseComponent implements OnInit {
    planId: any;
    businessId: any;
    currentDate: any;
    currentDateWithMonths: any;
    paymentStatus: any;
    businessPlan: any;
    planPrice: any;
    @ViewChild('paypal') paypalElement!: ElementRef;
    basicAuth = environment.paypalAuth;
    
    constructor(public router: Router, private route: ActivatedRoute, private _api: MemberApi) {
        super(router);
        this.route.queryParams.subscribe(params => {
            this.businessId = params['businessId'];
            this.businessPlan = params['plan']
            //console.log('businessId - ', this.businessId);
            //console.log('businessPlan - ', this.businessPlan);
            if (this.businessId == null || this.businessPlan == null) {
                this.router.navigate(['member/profile']);
            }
        });
    }

    ngOnInit(): void {
        const self = this;
        if (this.businessPlan == 'Free') {
            this.planId = environment.paypalFreePlanID;
            this.planPrice = "99";
            //console.log('free - ' + this.planId);
        }
        else {
            this.planId = environment.paypalPremiumPlanID;
            this.planPrice = "149";
            //console.log('premium - ' + this.planId);
        }

        this.LoadDate();
        paypal.Buttons({
            createSubscription: function (data:any, actions:any) {
                return actions.subscription.create({
                    'plan_id': self.planId
                });
            },
            onApprove: function (data:any, actions: any) {
                self.getSubcriptionDetails(data.subscriptionID);
            },
            onCancel: function (data: any, actions: any) {

                let res = {
                    "businessId": self.businessId,
                    "transactionId": null,
                    "invoiceId": null,
                    "paymentSubsDate": self.currentDate,
                    "firstPayDate": self.currentDateWithMonths,
                    "paymentType": "Paypal",
                    "paymentResponse": data,
                    "amount": self.planPrice,
                    "paymentStatus": "Cancel",
                    "businessPlan": self.businessPlan
                };

                self._api.updatePayPal(res).subscribe(
                    (data: any) => {
                        self.paymentStatus = "Payment cancelled by user";
                        self.router.navigate(['member/profile']);
                        //console.log("cancel success.");
                    },
                    (error: any) => {
                        //console.log(JSON.stringify(error));
                    });

            },
            onError: function (err: any) {

                let res = {
                    "businessId": self.businessId,
                    "transactionId": null,
                    "invoiceId": null,
                    "paymentSubsDate": self.currentDate,
                    "firstPayDate": self.currentDateWithMonths,
                    "paymentType": "Paypal",
                    "paymentResponse": err,
                    "amount": self.planPrice,
                    "paymentStatus": "Failed"
                };

                self._api.updatePayPal(res).subscribe(
                    (res: any) => {
                        self.paymentStatus = "Payment Error";
                    },
                    (error: any) => {
                    });

            }

        }).render('#ppdiv');
    }

    LoadDate() {
        this.currentDate = this.getDate();
        this.currentDateWithMonths = this.getDateWithMonths();
        //console.log(this.currentDate);
        //console.log(this.currentDateWithMonths);
    }
    getSubcriptionDetails(subcriptionId: string) {
        const self = this;
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var data = JSON.parse(this.responseText);
                //console.log("Get Subscription - ", JSON.parse(this.responseText));

                let obj = {
                    "businessId": self.businessId,
                    "transactionId": data.id,
                    "invoiceId": data.id,
                    "paymentSubsDate": self.currentDate,
                    "firstPayDate": self.currentDateWithMonths,
                    "paymentType": "Paypal",
                    "paymentResponse": this.responseText,
                    "amount": self.planPrice,
                    "paymentStatus": "Paid",
                    "businessPlan": self.businessPlan,
                    "paypalPaymentId": data.id
                };

                self._api.updatePayPal(obj).subscribe(
                    (res: any) => {
                        self.paymentStatus = "Payment completed successfully";
                        self.router.navigate(['member/dealbuilder']);
                    },
                    (error: any) => {
                    });
            }
        };
        xhttp.open('GET', environment.paypalSubscripURL + subcriptionId, true);
        xhttp.setRequestHeader('Authorization', this.basicAuth);

        xhttp.send();
    }

    getDate() {
        var d = new Date();
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    getDateWithMonths() {
        var d = new Date();
        var month = '' + (d.getMonth() + 4);
        var day = '' + d.getDate();
        var year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
}