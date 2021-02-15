import { Component, ViewChild, ElementRef } from "@angular/core";
import { BaseComponent } from 'src/app/shared/components/base.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { MemberApi } from 'src/app/shared/services/memberApi';
import { ImageService } from 'src/app/shared/services/image.service';
import { Store } from '@ngrx/store';
import * as userState from '../reducers/user.reducer';

@Component({
    templateUrl: './../views/dashboard.component.html',
})

export class DashboardComponent extends BaseComponent {
    userProfile: any;

    constructor(public router: Router,
        public _api: MemberApi,
        public _userSvc: UserService,
        private _imgSvc: ImageService,
        private store: Store<userState.State>) {
        super(router);
    }

    ngOnInit() {
        this.userProfile = this._userSvc.getProfile();
        this.getProfileDetails();
    }

    getProfileDetails() {
        this._api.getProfileByEmail(this.userProfile.emailAddress).subscribe(
            (res: any) => {
                if (res.businessId) {
                    this._userSvc.setUserData(res);
                    localStorage.setItem('userData', JSON.stringify(res));

                    if (res.businessImageId) {
                        let url = this._api.getImageURL(res.businessImageId);
                        this._imgSvc.getBase64ImageFromURL(url).subscribe((base64data: any) => {
                            this.store.dispatch({
                                type: 'SET_IMAGE_URL',
                                payload: { 'imagePath': 'data:image/jpg;base64,' + base64data }
                            });
                        });
                    }
                }
            },
            (error: any) => {
                //nop
            });
    }
}