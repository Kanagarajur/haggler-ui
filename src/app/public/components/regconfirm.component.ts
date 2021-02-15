import { BaseComponent } from 'src/app/shared/components/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { PublicApi } from 'src/app/shared/services/publicApi';

@Component({
    templateUrl: '../views/regconfirm.component.html'
})

export class RegConfirmationComponent extends BaseComponent {

    private paramsSubscription!: Subscription;
    emailToken!: string;
    countDown: any = null;

    constructor(public _route: Router,
        private _actRoute: ActivatedRoute,
        private _api: PublicApi) {
        super(_route);
    }

    ngOnInit() {
        this.paramsSubscription = this._actRoute.queryParams.subscribe(params => {
            this.emailToken = params['token'];
            this.validateToken();
        });
    }

    ngOnDestroy() {
        if (this.paramsSubscription) {
            this.paramsSubscription.unsubscribe();
        }
    }

    validateToken() {
        if (typeof this.emailToken === 'string') {
            let reqObj = this.emailToken;
            this._api.confirm(reqObj).subscribe(
                (res: any) => {
                    //TODO:Handle user session setting here.
                    this.handleTimeAndRedirect();
                },
                (error: any) => {
                    //nop
                });
        }
    }

    handleTimeAndRedirect() {
        let timer = 16;
        setInterval(() => {
            if (timer > 0)
                timer--;
            this.countDown = (timer > 1) ? timer + " seconds" : timer + " second"
        }, 1000);

        setTimeout(() => {
            this.router.navigate(['/member/profile']);
        }, 16000);
    }
}