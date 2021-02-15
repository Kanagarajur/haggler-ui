import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { Router } from '@angular/router';

@Component({
    selector: 'public-header',
    templateUrl: './../views/publicheader.component.html',
    styleUrls: ['./../styles/publicheader.component.css']
})

export class PublicHeaderComponent extends BaseComponent {
    isHome: boolean = false;
    urlStr: string = '';

    constructor(public router: Router,) {
        super(router);
    }

    ngOnInit() {
        if (this.router) {
            let urlStr = this.router.url
            if(urlStr.indexOf('?') > -1) {
                urlStr = urlStr.split('?')[0];
            }
            let cleanUrlStr = urlStr.replace(/^\/|\/$/g, '');
            cleanUrlStr = cleanUrlStr.replace('/', '-');
            this.isHome = (cleanUrlStr === 'public');

            let routeUrl = urlStr.split('/');
            this.urlStr= routeUrl[routeUrl.length-1];
        }
    }
}