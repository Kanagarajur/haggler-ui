import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';

@Component({
    templateUrl: './../views/privacy.component.html',
    styles: [`
    h2 {
        margin-bottom:0px;
    }
    span {
        font-size: 14px;
        font-weight: normal;
        color: #969494;
    }
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

export class PrivacyComponent extends BaseComponent {
    //nop
}