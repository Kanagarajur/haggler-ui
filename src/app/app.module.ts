import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent2 } from './footer/footer.component';
import { SharedModule} from './shared/shared.module';
import { PublicModule} from './public/public.module';
//import { FooterComponent } from './member/components/footer.component';
import { StoreModule } from '@ngrx/store';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
//import { SocialLoginModule,SocialAuthServiceConfig, GoogleLoginProvider,   FacebookLoginProvider } from 'angularx-social-login';
//import { MemberModule } from './member/member.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent2,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot({}),
    SharedModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy},
     ],
  bootstrap: [AppComponent]
})


export class AppModule { }
