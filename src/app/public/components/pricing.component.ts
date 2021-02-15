import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { Router } from '@angular/router';

@Component({
    selector: 'pricing-info',
    templateUrl: './../views/pricing.component.html',
    styleUrls:['./../styles/pricing.component.css']
})

export class PricingComponent extends BaseComponent {
    //nop
    constructor(public router: Router) {
        super(router);
    }
    
    gotoRegister(type:any) {
       // console.log(type);
        this.router.navigate(['public/registration']);
    }
}