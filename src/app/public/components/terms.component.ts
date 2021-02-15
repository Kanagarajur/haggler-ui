import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { Router } from '@angular/router';

@Component({
    templateUrl: './../views/terms.component.html',
    styles: [`
    ul {
        margin-left:20px;
    }
    ul li {
        list-style-type: disc;
    }

    h4 {
        border-style: solid;
        border-color: #1998d5;
        border-top-width: 1px;
        border-right-width: 0;
        border-bottom-width: 0;
        border-left-width: 15px;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    
    p.termsp {
        margin-bottom:20px;
    }
    `]
})

export class TermsComponent extends BaseComponent  {

    constructor(public _router: Router) {
        super(_router);
    }

}