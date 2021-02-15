import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './components/home.component';
import { RegistrationComponent } from './components/registration.component';
import { LoginComponent } from './components/login.component';
import { SharedModule } from './../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PricingComponent } from './components/pricing.component';
import { TermsComponent } from './components/terms.component';
import { PrivacyComponent } from './components/privacy.component';
import { PublicHeaderComponent } from './components/publicheader.component';
import { PublicFooterComponent } from './components/publicfooter.component';
import { RegConfirmationComponent } from './components/regconfirm.component';
import { ContactFormComponent } from './components/contactform.component';
import { ForgetpassEmailComponent } from './components/forgetpass-email.component';
import { ForgetpassConfirmpassComponent } from './components/forgetpass-confirmpass.component';

@NgModule({
    declarations: [
        HomeComponent,
        RegistrationComponent,
        LoginComponent,
        PricingComponent,
        TermsComponent,
        PrivacyComponent,
        PublicHeaderComponent,
        PublicFooterComponent,
        RegConfirmationComponent,
        ContactFormComponent,
        ForgetpassEmailComponent,
        ForgetpassConfirmpassComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        PublicRoutingModule,
        SharedModule,
        CarouselModule
    ],
    providers: [],
    bootstrap: []
})
export class PublicModule { }