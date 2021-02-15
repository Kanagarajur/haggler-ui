import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template:``
})
export class BaseComponent {
    constructor(public router: Router) {
        if (this.router) {
            let urlStr = this.router.url
            if(urlStr.length > 0 && urlStr.indexOf('?') > 0) {
                urlStr = urlStr.split('?')[0];
            }
            urlStr = urlStr.replace(/^\/|\/$/g, '');
            urlStr = urlStr.replace('/','-');
            let body = document.getElementsByTagName('body')[0];
            body.className = '';   //remove the class
            let className = (urlStr === '') ? 'home-pg' : urlStr + '-pg';
            body.classList.add(className);   //add the class
        }

    }
}