import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector:'member-footer',
    template:`<div><p > © 2018 Hagglr, Inc . </p></div>`
})

export class FooterComponent {
    userProfile: any;

    constructor(public router: Router,
        public _userSvc: UserService) {
    }

    ngOnInit() {
        
    }

}