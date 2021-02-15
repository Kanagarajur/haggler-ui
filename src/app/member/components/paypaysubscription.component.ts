import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { MemberApi } from 'src/app/shared/services/memberApi';
import { IUserProfile } from 'src/app/shared/interfaces/iUserProfile';

@Component({
  selector: 'app-paypaysubscription',
  templateUrl: '../views/paypaysubscription.component.html'
})
export class PaypaysubscriptionComponent implements OnInit {
  userProfile!: IUserProfile;
  PaymentID: any;
  businessPlan: any;
  sumbitMode: any;
  basicAuth = environment.paypalAuth;
  constructor(public router: Router,
    public _userSvc: UserService,
    public _api: MemberApi,) { }

  ngOnInit() {
    this.initCompData();
  }

  private async initCompData() {
    this.userProfile = this._userSvc.getProfile();
    if (this.userProfile.businessId) {
      await this.getBusinessProfile(this.userProfile.businessId);
    }
  }

  getBusinessProfile(businessId: string) {
    return new Promise((resolve) => {
      resolve(
        this._api.getBusinessprofile(businessId).then(
          (res: any) => {
            //console.log(res);
            this.PaymentID = res.paypalPaymentId;
            this.businessPlan = res.businessPlan;
            this._userSvc.setUserData(res);
            //this.populateValue(res);
          },
          (error: any) => {

          }
        ))
    });
  }


  public onSignUpFree(): void {
    //console.log(this.PaymentID);
    //return;
    if (this.PaymentID != null  && this.PaymentID!='') {
      if (confirm('Are you sure you want to cancel free subscribtion?')) {
        this.SubcriptionCancel();
      }
    }
    else {
      setTimeout(() => {
        this.router.navigate(['member/payment'], { queryParams: { businessId: this.userProfile.businessId, plan: 'Free' }, queryParamsHandling: "merge" });
      }, 2000);
    }
  }

  public onSignUpPremium(): void {
    if (this.PaymentID != null  && this.PaymentID!='') {
      if (confirm('Are you sure you want to cancel premium subscribtion?')) {
        this.SubcriptionCancel();
      }
    }
    else {
      setTimeout(() => {
        this.router.navigate(['member/payment'], { queryParams: { businessId: this.userProfile.businessId, plan: 'Premium' }, queryParamsHandling: "merge" });
      }, 2000);
    }
  }

  getSubcriptionDetails(subcriptionId:any) {
    try {
      const self = this;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          //console.log("Get cancellation - ", this.responseText);
          var res = JSON.parse(this.responseText);
          if (res && res.status === 'CANCELLED') {
            let data = {
              "cancelDate": self.getDate(),
              "cancelRefId": subcriptionId,
              "paymentStatus": "Cancelled"
            }
            self._api.cancelPayPal(subcriptionId, data).subscribe(
              (res: any) => {
                location.reload();
                //console.log('cancel api success');
              },
              (error: any) => {
                //console.log(error);
              });
            alert('Paypal subscription cancelled successfully.');
            location.reload();
          }
          else {
            alert('Paypal subscription cancellation failed!... Please try later.');
          }
        }
      };
      xhttp.open('GET', environment.paypalSubscripURL + subcriptionId, true);
      xhttp.setRequestHeader('Authorization', this.basicAuth);
      xhttp.send();
    }
    catch (err) {
      //console.log(err);
    }
  }

  SubcriptionCancel() {
    try {
      const self = this;
      //self.getSubcriptionDetails(self.PaymentID);
      //return;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 204) {
          //console.log("doCancel - ", JSON.stringify(this.responseText));
          self.getSubcriptionDetails(self.PaymentID);
        }

      };
      xhttp.open('POST', environment.paypalSubscripURL + this.PaymentID + '/cancel', true);
      xhttp.setRequestHeader('Authorization', this.basicAuth);
      xhttp.setRequestHeader('Content-Type', 'application/json;odata=verbose');
      xhttp.send();
    }
    catch (err) {
      //console.log(err);
    }
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
}
