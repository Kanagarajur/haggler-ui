import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { Store, select } from '@ngrx/store';
import * as userState from '../reducers/user.reducer';

@Component({
    selector: 'member-header',
    templateUrl: './../views/header.component.html',
    styleUrls: ['./../styles/memberheader.component.css']
})

export class HeaderComponent {
    userProfile: any;
    activePage: any;
    isAdmin!: boolean;
    //Subscription Object
    userDetails: any;

    constructor(public router: Router,
        private store: Store<userState.State>,
        public _userSvc: UserService) {
    }

    ngOnInit() {
        this.userDetails = this.store.pipe(select(userState.getUserDetails)).subscribe(
            (result) => {
                this.userProfile = result;
            }
        );
        let urlStr = this.router.url;
        let urlStrArr = urlStr.split('/');
        this.activePage = urlStrArr[urlStrArr.length - 1];

        let adminUser = ['support@hagglr.ai','test5@gmail.com'];
        let userEmail = this.userProfile.emailAddress.toLowerCase();
        const checkUser = (user: any) => user === userEmail;
        this.isAdmin = adminUser.some(checkUser);
    }

    logout() {
        if (this._userSvc.logout()) {
            this.router.navigate(['public/login']);
        }
    }

}