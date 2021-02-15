import { Component, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PublicApi } from 'src/app/shared/services/publicApi';
//import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './../views/home.component.html',
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(5000, style({ opacity: 1 }))
      ])
    ]),
  ]
})
export class HomeComponent extends BaseComponent {
  title = 'hagglr';
  userLoggedIn: boolean = false;
  userName: string = 'User';
  refContact: any;
  @ViewChild('backToTop') backToTop: any;
  customOptions: OwlOptions = {
    //autoWidth: true,
    loop: true,
    items: 1,
    // margin: 10,
    // slideBy: 'page',
    // merge: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 2000,
    dotsSpeed: 500,
    animateOut: 'zoomOutLeft',
    animateIn: 'zoomInRight',
    dots: true,
    // dotsData: true,
    // mouseDrag: false,
    // touchDrag: false,
    // pullDrag: false,
    smartSpeed: 2000,
    // fluidSpeed: 499,
    dragEndSpeed: 350,
    nav: false
  }

  constructor(public router: Router,
    private _route: ActivatedRoute,
    private _api: PublicApi) {
    super(router);
  }

  ngOnInit() {
    //debugger;
    //this.loadScript();
    //window.addEventListener('scroll', this.scroll, true); //third parameter
    let userData = localStorage.getItem('userData');
    if (userData && typeof userData === "object") {
      this.userLoggedIn = true;
      let userData = JSON.parse(localStorage.getItem('userData')!);
      this.userName = userData.firstName;
    }

    this._route.queryParams.subscribe(params => {
      this.refContact = params['s'];
      if (this.refContact === 'contact') {
        this.scrollToContact();
      }
    });

    this.loadDialogFlowWeb();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  public loadScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'assets/scripts/slider-init.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  public scroll(event: any) {
    const number = event.srcElement.scrollTop;
    /*if (number > 50) {
      document.getElementsByClassName('scrolling-navbar')[0].classList.add('top-nav-collapse');
      
      let b2t_arrow = this.backToTop.querySelector('#arrow-up');
      if (number > 200) {
        b2t_arrow.style.display = 'block';
      } else {
        b2t_arrow.style.display = 'none';
      }
    } else {
      document.getElementsByClassName('scrolling-navbar')[0].classList.remove('top-nav-collapse');
    }*/

  }

  public scrollToContact() {
    const contactRefElement = document.querySelectorAll('#contact')[0];
    contactRefElement.scrollIntoView({ behavior: 'smooth' });
  }

  public gotoRegister(type: any) {
    console.log(type);
    this.router.navigate(['public/registration']);
  }

  public loadDialogFlowWeb() {
    const dfmElem = document.querySelector<HTMLInputElement>('df-messenger');
    if (dfmElem) {
      dfmElem.style.display = 'block';
    } else {
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      let df = document.createElement("df-messenger");
      df.setAttribute("chat-title", "Hagglr AI");
      df.setAttribute("chat-icon", this._api.getChatIconURL());
      df.setAttribute("agent-id", this._api.getAgentID());
      df.setAttribute("language-code", "en");
      var h = document.getElementsByTagName("body")[0];
      h.appendChild(s);
      h.appendChild(df);
    }

  }


  onAnimationEvent(event: AnimationEvent) {
  }
}