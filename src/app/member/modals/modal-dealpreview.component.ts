import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberApi } from 'src/app/shared/services/memberApi';
import { UserService } from 'src/app/shared/services/user.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { Router } from '@angular/router';


@Component({
  selector: 'ngbd-modal-dealpreview',
  templateUrl: '../views/modal-dealpreview.component.html',
  styleUrls: ['../styles/modal-dealpreview.component.css']

})
export class NgbdDealPrevModalContent extends BaseComponent {
  userProfile: any;
  alert: any = { type: '', message: '' }
  @Input() dealDetail: any;
  imageURL!: string;
  dealId!: string;
  profData: any;
  showDeal: boolean = false;
  dealpreviewDetails: any =
    {
      restaurantImg: '', restaurantName: '-', restaurantURL: '-', restaurantDeals: '-', restaurantPhoneNo: '-', restaurantOfferImg: '', restaurantOfferPercent: '-', restaurantOfferDesc: '-'
    };
  dealTypes = { DEALTYPE_DOLLAR: 'Dollar', DEALTYPE_PERCENTAGE: 'Percentage', DEALTYPE_CUSTOMDEAL: 'Custom Deal', };

  constructor(public router: Router, public activeModal: NgbActiveModal,
    private _api: MemberApi, public _userSvc: UserService, private _imgSvc: ImageService) {
    super(router);
  }

  ngOnInit() {
    this.getDealDetails()
  }

  getDealDetails() {
    if (this.dealDetail.dealName && this.dealDetail.dealName != '') {
      if (this.dealDetail.dealType && this.dealDetail.dealType != '' && this.dealDetail.dealType == this.dealTypes.DEALTYPE_DOLLAR) {
        this.dealpreviewDetails.restaurantDeals = "up to " + this.dealDetail.dollarDiscount + " USD off";
      }
      else if (this.dealDetail.dealType && this.dealDetail.dealType != '' && this.dealDetail.dealType == this.dealTypes.DEALTYPE_PERCENTAGE) {
        this.dealpreviewDetails.restaurantDeals = "up to " + this.dealDetail.dollarDiscount + "% off";
      }
      else {
        this.dealpreviewDetails.restaurantDeals = "up to $" + this.dealDetail.dollarDiscount + " off";
      }
    }
    this.dealpreviewDetails.restaurantDeals = "Show Deals " + this.dealpreviewDetails.restaurantDeals
    if (this.dealDetail.dollarDiscount && this.dealDetail.dollarDiscount != '') {
      this.dealpreviewDetails.restaurantOfferPercent = this.dealDetail.dollarDiscount + '%';
    }
    this.dealpreviewDetails.restaurantOfferDesc = this.dealDetail.dealName;
    this.dealpreviewDetails.restaurantOfferImg = this.dealDetail.dealImage;

    // rest details
    this.dealpreviewDetails.restaurantImg = this.dealDetail.restaurantImg;
    this.dealpreviewDetails.restaurantName = this.dealDetail.restaurantName;
    this.dealpreviewDetails.restaurantURL = this.dealDetail.restaurantURL;
    this.dealpreviewDetails.restaurantPhoneNo = this.dealDetail.restaurantPhoneNo;
  }

  showDealDetails() {
    if (this.showDeal === false) {
      this.showDeal = true;
    }
  }
}
