import { Component, ChangeDetectorRef } from "@angular/core";
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbTimepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DealModel } from '../model/deal.model';
import { MemberApi } from 'src/app/shared/services/memberApi';
import { DealService } from '../services/deal.service';
import { NgbdDealPrevModalContent } from '../modals/modal-dealpreview.component';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
    templateUrl: './../views/newdeal.component.html',
    styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
    .form-group.hidden {
      width: 0; height:0;
      margin: 0;
      border: none;
      padding: 0;
    }

    .form-group.hidden .hdn-control {
        width: 0; height:0;
        border: none;
        padding: 0;
      }

    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})

export class NewDealComponent {
    dealForm!: FormGroup;
    userProfile: any;
    submitted: boolean = false;
    hoveredDate!: NgbDate;
    fromDate!: NgbDate;
    toDate!: NgbDate;
    alert: any = { type: '', message: '' };
    weekdays = [
        { name: "mday", value: 'Monday', slug: 'M' },
        { name: "tday", value: 'Tuesday', slug: 'T' },
        { name: "wday", value: 'Wednesday', slug: 'W' },
        { name: "ttday", value: 'Thursday', slug: 'T' },
        { name: "fday", value: 'Friday', slug: 'F' },
        { name: "sday", value: 'Saturday', slug: 'S' },
        { name: "ssday", value: 'Sunday', slug: 'S' }
    ];
    selectedDaysNames: any;
    imagePath!: { name: any; data: any; };
    imageChanged!: boolean;
    imageSelected: any;
    dealpreviewDetails: any =
	{
	    restaurantImg: '', restaurantName: '-', restaurantURL: '-', restaurantDeals: '-', restaurantPhoneNo: '-', restaurantOfferImg: '', restaurantOfferPercent: '-', restaurantOfferDesc: '-'
	};
    profData: any;
    PaymentID: any;
    businessPlan: any;
    constructor(public router: Router,
        public fb: FormBuilder,
        public calendar: NgbCalendar,
        public formatter: NgbDateParserFormatter,
        public _userSvc: UserService,
        private _dealSvc: DealService,
        private cd: ChangeDetectorRef,
        public _api: MemberApi,
        public _model: DealModel,
        private _config: NgbTimepickerConfig,
        private modalService: NgbModal, private _imgSvc: ImageService) {
    }

    ngOnInit() {
        this.dealForm = this.fb.group({
            dealName: ['', Validators.required],
            dealDescription: [''],
            dealType: ['', Validators.required],
            dollarDiscount: ['', Validators.required],
            minimumPurchase: [''],
            totalCoupons: ['', Validators.required],
            fromDate: [''],
            toDate: [''],
            fromTime: [{ hour: 9, minute: 0 }],
            toTime: [{ hour: 23, minute: 0 }],
            days: this.createDaysCheckboxes(this.weekdays),
            disclaimer: ['']
        });

        this.userProfile = this._userSvc.getProfile();
        this._model.resetModelData();
        this._model.setMerchantDetails(this.userProfile);
        if (this.router.url === '/member/editdeal') {
            let dealsData = this._dealSvc.getDealsData();
            if (!dealsData) {
                this.router.navigate(['member/dealbuilder']);
            } else {
                this.populateValue(dealsData);
            }
        } else {
            this.fromDate = this.calendar.getToday();
            this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
            this._model.dealStatus = 'Active';
        }

        this.dealForm.get('dealType')!.valueChanges
            .subscribe(value => {
                if (value === 'Custom Deal') {
                    this.dealForm.get('dollarDiscount')!.clearValidators();
                    this.dealForm.get('dollarDiscount')!.updateValueAndValidity();
                } else {
                    this.dealForm.get('dollarDiscount')!.setValidators([Validators.required]);
                    this.dealForm.get('dollarDiscount')!.updateValueAndValidity()
                }
            });
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
                        this.profData = res;
                        this.PaymentID = res.paypalPaymentId;
                        this.businessPlan = res.businessPlan;
                        if (res.businessImageId) {
                            let url = this._api.getImageURL(res.businessImageId);
                            this._imgSvc.getBase64ImageFromURL(url).subscribe((base64data: any) => {
                                this.dealpreviewDetails.restaurantImg = 'data:image/jpg;base64,' + base64data;

                            });
                        } else {
                            this.dealpreviewDetails.restaurantImg = 'assets/images/defbus.png';
                        }
                        this.dealpreviewDetails.restaurantName = this.profData.businessName;
                        this.dealpreviewDetails.restaurantURL = this.profData.businessUrl;
                        this.dealpreviewDetails.restaurantPhoneNo = this.profData.phone;

                    },
                    (error: any) => {

                    }
                ))
        });
    }

    get f() {
        return this.dealForm.controls;
    }

    goback() {
        this.router.navigate(['/member/dealbuilder']);
    }

    populateValue(data: any) {
        this.dealForm.patchValue({
            dealName: data.name,
            dealDescription: data.description,
            dealType: data.dealType,
            dollarDiscount: data.discount,
            minimumPurchase: data.minpurchase,
            totalCoupons: data.couponlimit,
            fromTime: this.getNgbTime(data.starttime),
            toTime: this.getNgbTime(data.endtime),
            days: data.days,
            disclaimer: data.disclaimer
        });

        this._model.dealsId = data.id;
        this.fromDate = this.getNgbDate(data.fromdate);
        this.toDate = this.getNgbDate(data.todate);

        this._model.dealimage = data.dealimageId;
        this._model.dealfilename = data.dealfilename;
        this._model.dealStatus = data.dealstatus;
    }

    getNgbDate(dateStr: any) {
        let dateObj = new Date(dateStr);
        return <NgbDate>{
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            day: dateObj.getDate()
        }
    }

    getNgbTime(timeStr: any) {
        if (typeof timeStr === "number")
            timeStr = timeStr.toString();

        timeStr = timeStr.split('.').join('');
        timeStr = "0000" + timeStr;
        let dateObj = timeStr.substr(-4);
        return {
            hour: +dateObj.substr(0, 2),
            minute: +dateObj.substr(2, 2),
        };
    }

    createDaysCheckboxes(daysData: any) {
        const arr = daysData.map((day: any) => {
            return new FormControl(day.selected || false);
        });
        return new FormArray(arr);
    }

    getSelectedDaysName() {
        let i = 0;
        let selectedDays: string[] = [];
        this.dealForm.controls.days["controls"].forEach((control: any) => {
            if (control.value) {
                selectedDays.push(this.weekdays[i].value);
            }
            i++;
        });
        this._model.setDays(selectedDays)
    }

    onFileChange(event: any) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = (_event) => {
                let imageURL: any = reader.result;
                this.imageSelected = imageURL;
                this.imagePath = {
                    'name': file.name,
                    'data': imageURL.split(',')[1]
                };
                this.imageChanged = true;
            }
            this.cd.markForCheck();
        }
    }

    async onFirstSubmit() {
        this.getSelectedDaysName();
        this.submitted = true;
        if (this.dealForm.valid) {

            if (this.imageChanged) {
                let imageData = {
                    "source": "deals",
                    "filename": this.imagePath.name,
                    "image": this.imagePath.data
                };
                let uploadResp: any = await this._api.uploadImage(imageData);
                if (uploadResp.id) {
                    this._model.dealimage = uploadResp.id
                    this._model.dealfilename = uploadResp.filename;
                }
            }

            this.dealForm.value.fromDate = this.fromDate
            this.dealForm.value.toDate = this.toDate
            let reqObj = this._model.transformData(this.dealForm);
            this._api.saveDeals(reqObj).subscribe(
                (res: any) => {
                    this.alert.type = 'success';
                    this.alert.message = 'New deal has been added successfully.! Please wait..';
                    this._model.resetModelData();
                    this.imageChanged = false;
		    if (this.PaymentID == null || this.PaymentID == '') {
                        this.router.navigate(['member/subscription']);
                    }
                    else {
			setTimeout(() => {
			    this.router.navigate(['member/dealbuilder']);
			}, 2000);
		    }
                },
                (error: any) => {

                });
        }

    }
    goCancel() {
        this.router.navigate(['/member/subscription']);
    }
    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
            this.toDate = date;
        } else {
            this.toDate!;
            this.fromDate = date;
        }
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
    }

    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
        const parsed = this.formatter.parse(input);
        return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }

    goPreview(formvalues: FormGroup) {
        const modalRef = this.modalService.open(NgbdDealPrevModalContent, { size: 'lg', windowClass: "dealpreviewclass" });
        modalRef.componentInstance.dealDetail = { dealName: formvalues.controls["dealName"].value, dealType: formvalues.controls["dealType"].value, dollarDiscount: formvalues.controls["dollarDiscount"].value, dealDescription: formvalues.controls["dealDescription"].value, dealImage: this.imageSelected, restaurantImg: this.dealpreviewDetails.restaurantImg, restaurantName: this.dealpreviewDetails.restaurantName, restaurantURL: this.dealpreviewDetails.restaurantURL, restaurantPhoneNo: this.dealpreviewDetails.restaurantPhoneNo };
    }
}