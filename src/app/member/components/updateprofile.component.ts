import { BaseComponent } from 'src/app/shared/components/base.component';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { MemberApi } from 'src/app/shared/services/memberApi';
import { CustomValidator } from 'src/app/shared/helpers/validation.helper';
import { from, Observable, Observer } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { IUserProfile } from 'src/app/shared/interfaces/iUserProfile';
import { ImageService } from 'src/app/shared/services/image.service';
import { Store, select } from '@ngrx/store';
import * as userState from '../reducers/user.reducer';
import { UserModel } from '../model/user.model';
import { PhoneNumberPipe } from 'src/app/shared/pipes/phonenumber.pipe';
import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './../views/updateprofile.component.html',
    styles: [`
    .profile-file-input {
        color: transparent;
        width:123px;
      }
      .profile-file-input::-webkit-file-upload-button {
        visibility: hidden;
      }
      .profile-file-input::before {
        content: 'Change Photo';
        color: #fff;
        display: inline-block;
        background: #1998d5;
        border-radius: 3px;
        padding: 5px 8px;
        outline: none;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        font-size: 10pt;
      }
      .profile-file-input:hover::before {
        border-color: #fafafa;
      }
      .profile-file-input:active {
        outline: 0;
      }
    `]
})

export class UpdateProfileComponent extends BaseComponent {
    profileForm!: FormGroup;
    submitted = false;
    userProfile!: IUserProfile;
    alert: any = { type: '', message: '' };
    categories!: [];
    subcategories!: [];
    deliveryOptions: { id: number, name: string }[] = [
                                                     { "id": 1, "name": "Door Dash" },
                                                     { "id": 2, "name": "Uber Eats" },
                                                      { "id": 3, "name": "Postmates" },
                                                     { "id": 4, "name": "GrubHub" }
                                                    ];
    deliveryView = false ;
    businessDeliveryOptions:{ id: number, name: string , siteUrl : string  }[] = [
                                                        { "id": 3, "name": "Postmates", "siteUrl": "https://Postmates-home" },
                                                       { "id": 4, "name": "GrubHub", "siteUrl": "https://Grubhub.com/home"}
                                                      ];
    showDeliveryList = true;
    selectedFile!: ImageSnippet;
    userProfileData!: IUserProfile;
    PaymentID: any;
    businessPlan: any;
    sumbitMode: any;
    basicAuth = environment.paypalAuth;

    @ViewChild('file') fileBtn!: ElementRef;
    imagePath: any;
    imageChanged: boolean = false;

    constructor(public router: Router,
        private fb: FormBuilder,
        public _userSvc: UserService,
        private _imgSvc: ImageService,
        public _api: MemberApi,
        private _model: UserModel,
        private _phoneNbr: PhoneNumberPipe,
        private store: Store<userState.State>) {
        super(router);
    }

    ngOnInit() {
        this.profileForm = this.fb.group({
            propName: [''],
            businessName: ['', Validators.required],
            businessCatg: ['', Validators.required],
            businessSubCatg: ['', Validators.required],
            deliveryOpt : ['0'],
            bussinessDeliveryUrl : ['',[Validators.required]],
            businessWebUrl: ['', [Validators.required, CustomValidator.urlValidator]],
            businessPhoneNumber: ['', Validators.required],
            inputAddress: ['', Validators.required],
            inputZip: ['', Validators.required],
            inputCity: ['', Validators.required],
            inputState: ['', Validators.required],
            inputCountry: ['']
        });

        this.initCompData();
    }

    private async initCompData() {
        this.userProfile = this._userSvc.getProfile();
        if (this.userProfile.businessId) {
            await this.getBusinessProfile(this.userProfile.businessId);
            this.getCategories();
            this.addDeliveryOption();
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
                        this.populateValue(res);
                    },
                    (error: any) => {

                    }
                ))
        });
    }

    getCategories() {
        this.userProfile = this._userSvc.getProfile();
        this._api.getCatgories().subscribe(
            (res: any) => {
                this.categories = res;
                const categoriesList = from(this.categories).pipe(pluck('name'));
                categoriesList.subscribe((category) => {
                    if (category === this.userProfile.category) {
                        this.getSubCategories(this.userProfile.category!);
                    }
                });
            },
            (error: any) => {
                this.alert.type = 'danger';
                this.alert.message = 'Unable to reach server. Try again later.';
            });
    }

    getSubCategories(category: string) {
        this._api.getSubCatgories(category).subscribe(
            (res: any) => {
                this.subcategories = res.subCategories;
            },
            (error: any) => {
                this.alert.type = 'danger';
                this.alert.message = 'Unable to reach server. Try again later.';
            });
    }

    populateValue(data: any) {
        this.profileForm.patchValue({
            propName: data.firstName,
            businessName: data.businessName,
            businessPhoneNumber: this._phoneNbr.transform((data.phone == null) ? '' : data.phone),
            inputAddress: data.streetAddress,
            inputZip: data.zipCode,
            inputCity: data.city,
            inputState: data.state,
            inputCountry: data.country,
            businessCatg: data.category,
            businessSubCatg: data.subCategory,
            businessWebUrl: data.businessUrl
        });

        //data.businessImageId = '5eac8c2930ceaf1e48eb3ce6';

        this.userProfileData = {
            'businessImageId': data.businessImageId,
            'businessImageName': data.businessImageName
        }
        if (data.businessImageId) {
            let url = this._api.getImageURL(data.businessImageId);
            this._imgSvc.getBase64ImageFromURL(url).subscribe((base64data: any) => {
                this.userProfileData.imageURL = 'data:image/jpg;base64,' + base64data;
            });
        } else {
            this.userProfileData.imageURL = 'assets/images/defbus.png';
        }
    }

    get f() {
        return this.profileForm.controls;
    }

    prepareReqObj() {
        this.userProfileData = {
            ...this.userProfileData,
            "businessId": this.userProfile.businessId,
            "businessName": this.profileForm.value.businessName,
            "emailAddress": this.userProfile.emailAddress,
            "firstName": this.profileForm.value.propName,
            "lastName": null,
            "phone": this.profileForm.value.businessPhoneNumber,
            "zipCode": this.profileForm.value.inputZip,
            "latitude": null,
            "longitude": null,
            "businessImageId": this.userProfileData.businessImageId,
            "businessImageName": this.userProfileData.businessImageName,
            "fax": null,
            "category": this.profileForm.value.businessCatg,
            "subCategory": this.profileForm.value.businessSubCatg,
            "businessUrl": this.profileForm.value.businessWebUrl,
            "streetAddress": this.profileForm.value.inputAddress,
            "city": this.profileForm.value.inputCity,
            "state": this.profileForm.value.inputState,
            "status": this.userProfile.status,
            "country": this.userProfile.country,
            "businessPlan": this.userProfile.businessPlan,
            "paypalPaymentId": this.userProfile.paypalPaymentId
        };
        return this._model.transformData(this.userProfileData);
    }

    async onSubmit() {
        this.submitted = true;
        // TODO: Use EventEmitter with form value
        if (this.profileForm.valid) {
            if (this.imageChanged) {
                let imageData = {
                    "source": "business",
                    "filename": this.imagePath.name,
                    "image": this.imagePath.data
                };
                let uploadResp: any = await this._api.uploadImage(imageData);
                if (uploadResp.id) {
                    this.userProfileData.businessImageId = uploadResp.id
                    this.userProfileData.businessImageName = uploadResp.filename;
                }
            }
            this._api.updateProfile(this.prepareReqObj()).subscribe(
                (res: any) => {
                    this.imageChanged = false;
                    this.alert.type = 'success';
                    this.alert.message = 'Profile updated successfully!.';

                    // if (this.PaymentID == null || this.PaymentID =='') {
                    //     this.router.navigate(['member/subscription']);
                    // }
                    setTimeout(() => {
                        this.router.navigate(['member/dealbuilder']);
                    }, 2000);

                    this._userSvc.setUserData(this.userProfileData)

                    this.store.dispatch({
                        type: 'SET_PROF_DATA',
                        payload: this.userProfileData
                    });

                },
                (error: any) => {
                    this.alert.type = 'danger';
                    this.alert.message = 'Please check the input data';
                });
        }
    }

    trackByFn(index: any, item: any) {
        if (!item) return null;
        return index;
    }

    loadSubCatg() {
        let catg: string = this.profileForm.value.businessCatg;
        catg = catg.toLowerCase();
        this.getSubCategories(catg);

        this.deliveryView = (catg == 'restaurant') ? true : false; // verify deliveryOptions to display
        //get all delivery list from DB
        this.addDeliveryOption();

    }


    /**
          this method added for delivery options management for 'restaurant' business
    */
    addDeliveryOption(){


          console.log("Adding selected option <<<");

          // businessDeliveryOptions = get list from DB and remove default assigned data
          this.showDeliveryList = (this.businessDeliveryOptions.length>0) ? true : false;
    }

    deleteDeliveryOption(delDelv: any){

      let delId = delDelv;
      console.log("delete this id "+delId);
    }

    goback() {
        this.router.navigate(['/member/profile']);
    }

    preview(files: any) {
        if (files.length === 0)
            return;

        //this.imagePath = files[0];

        let mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.alert.message = "Only images are supported.";
            return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.userProfileData.imageURL = reader.result;
            this.imagePath = {
                'name': files[0].name,
                'data': this.userProfileData.imageURL.split(',')[1]
            };
            this.imageChanged = true;
        }
    }

    goCancel()
    {
        this.router.navigate(['/member/subscription']);
    }
}

class ImageSnippet {
    constructor(public src: string, public file: File) { }
}
