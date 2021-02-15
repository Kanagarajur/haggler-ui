import { Injectable } from '@angular/core';

@Injectable({
    'providedIn': 'root'
})
export class FacebookService {

     FB: any ;
     

    constructor() {
        //nop
    }


    loadFBSDK() {
        (window as any).fbAsyncInit = function () {
           
            this.FB.init({
                appId: '2663860653899817',
                cookie: true,
                xfbml: true,
                version: 'v7.0'
            });

             this.FB.Event.subscribe('send_to_messenger', function (e: any) {
                  // callback for events triggered by the plugin
                  console.log(e);
              });
        };

        (function (d, s, id) {
            var js: any; 
            var fjs: any;
            fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.setAttribute("crossorigin", "anonymous");
            js.setAttribute("async","");
            js.setAttribute("defer","");
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
}