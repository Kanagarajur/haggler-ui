import { BaseComponent } from 'src/app/shared/components/base.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { MemberApi } from 'src/app/shared/services/memberApi';
import { ImageService } from 'src/app/shared/services/image.service';
import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
    templateUrl: './../views/memberprofile.component.html'
})

export class MemberProfileComponent extends BaseComponent {
    profileForm!: FormGroup;
    submitted = false;
    userProfile: any;
    alert: any = { type: '', message: '' };
    categories!: [];
    subcategories!: [];
    profData: any;
    imageURL!: string;
    catgDisplayName: any;
    subCatgDisplayName: any;

    constructor(public router: Router,
        public _userSvc: UserService,
        private _imgSvc: ImageService,
        public _api: MemberApi) {
        super(router);
    }

    ngOnInit() {
        this.initCompData();
    }

    private async initCompData() {
        this.userProfile = this._userSvc.getProfile();
        if (this.userProfile.businessId) {
            await this.getBusinessProfile(this.userProfile.businessId);
            this.getCategories();
        }
    }

    getBusinessProfile(businessId: string) {
        return new Promise((resolve) => {
            resolve(
                this._api.getBusinessprofile(businessId).then(
                    (res: any) => {
                        this.profData = res;
                        if (res.businessImageId) {
                            let url = this._api.getImageURL(res.businessImageId);
                            this._imgSvc.getBase64ImageFromURL(url).subscribe((base64data: any) => {
                                this.imageURL = 'data:image/jpg;base64,' + base64data;
                            });
                        } else {
                            this.imageURL = 'assets/images/defbus.png';
                        }
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
                const categoriesList = from(res).pipe(map((cat: any) => {
                    return cat;
                }));
                categoriesList.subscribe((category: any) => {
                    if (category.name === this.userProfile.category) {
                        this.catgDisplayName = category.displayName;
                        this.getSubCategories(this.userProfile.category);
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
                //this.subcategories = res.subCategories;
                const subCatgList = from(res.subCategories).pipe(map((cat: any) => {
                    return cat;
                }));
                subCatgList.subscribe((item: any) => {
                    if (item.name === this.userProfile.subCategory) {
                        this.subCatgDisplayName = item.displayName;
                    }
                });
            },
            (error: any) => {
                this.alert.type = 'danger';
                this.alert.message = 'Unable to reach server. Try again later.';
            });
    }

    trackByFn(index: any, item: any) {
        if (!item) return null;
        return index;
    }
}