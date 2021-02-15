import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberApi } from 'src/app/shared/services/memberApi';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: '../views/modal.component.html',
  styles: [`
  .dealDetailCard .title {
    font-size: 1.3rem;
    font-weight:400;
    color:#000;
    margin-bottom:8px;
  }

  .dealDetailCard .callout {
    color:#00a863;
    font-size: 1.3rem;
    font-weight:400;
    margin-bottom:8px;
  }

  .dealDetailCard .duration, .dealDetailCard .content-section {
    font-size:0.9rem;
    font-weight:300;
    color:#303437;
  }

  .dealDetailCard .duration .hgl {
    font-weight:600;
  }

  .dealDetailCard .content-section {

  }
  `]
})
export class NgbdModalContent {
  @Input() dealId: any;
  alert: any = { type: '', message: '' }
  dealDetail: any;
  imageURL: any;
  dayDetail: string = '';
  dealCallout: string = '';

  constructor(public activeModal: NgbActiveModal,
    private _api: MemberApi,
    private _imgSvc: ImageService) { }

  ngOnInit() {

    this._api.getDeal(this.dealId).subscribe(
      (res: any) => {
        if (res.dealimageId) {
          let url = this._api.getImageURL(res.dealimageId);
          this._imgSvc.getBase64ImageFromURL(url).subscribe((base64data: any) => {
            this.imageURL = 'data:image/jpg;base64,' + base64data;
          });
        } else {
          this.imageURL = 'assets/images/defbus.png';
        }
        this.dealDetail = res;
        this.dayDetail = this.getDayVerbiage(res);
        this.dealCallout = this.getCalloutVerbiage(res);
      },
      (error: any) => {
        this.alert.type = 'danger';
        this.alert.message = 'Unable to fetch the deal details. Please try again later.'
      });
  }

  getNgbTime(timeStr: any) {
    timeStr = "0000" + timeStr;
    let dateObj = timeStr.substr(-4);
    let hour = +dateObj.substr(0, 2);
    let timeObj = {
      hour: (hour > 12) ? hour - 12 : hour,
      minute: +dateObj.substr(2, 2),
      meridian: (hour > 12) ? 'PM' : 'AM'
    };

    return timeObj.hour + ':' + timeObj.minute + ' ' + timeObj.meridian
  }

  getDayVerbiage(data: any) {
    let days = (data.days.length === 7) ? 'All days' : 'Every ' + data.days.join(', ');
    return days + ' at ' + this.getNgbTime(data.starttime) + ' to ' + this.getNgbTime(data.endtime);
  }

  getCalloutVerbiage(data: any) {
    let dealVerb: any;
    switch (data.dealType) {
      case 'Dollar':
        dealVerb = data.discount + ' USD';
        break;
      case 'Percentage':
        dealVerb = data.discount + '%';
        break;
      case 'Custom Deal':
        dealVerb = '$' + data.discount;
        break;
      default:
        dealVerb = '$' + data.discount;
        break;
    }
    return 'up to ' + dealVerb + ' off';
  }
}
