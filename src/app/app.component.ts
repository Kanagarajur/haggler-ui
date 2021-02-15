import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter} from 'rxjs/operators';
import { Subscription} from 'rxjs';

import { FacebookService } from 'src/app/shared/services/facebook.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Hagglr';
  routerSubscription!: Subscription;

  constructor(public router: Router,
    public _fbSvc: FacebookService) {}
  

  ngOnInit() {
    if (environment.production) {
      if (location.protocol === 'http:') {
        console.log("app.component.ngOnInit()")
        window.location.href = location.href.replace('http', 'https');
      }
    }
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });    

    this._fbSvc.loadFBSDK();
  }

  ngOnDestroy(){
    if (this.routerSubscription)
      this.routerSubscription.unsubscribe();
  }

}
