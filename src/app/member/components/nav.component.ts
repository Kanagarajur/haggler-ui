import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector:'member-nav',
    templateUrl:'./../views/nav.component.html'
})

export class NavComponent {
    userProfile: any;
    activePage: any;
    constructor(public router: Router,		
        public _userSvc: UserService) {
    }

    ngOnInit() {
        let urlStr = this.router.url;
        let urlStrArr =  urlStr.split('/');
        this.activePage = urlStrArr[urlStrArr.length-1];
        
    }

}