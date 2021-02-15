import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration.component';
import { LoginComponent } from './components/login.component';
import { HomeComponent } from './components/home.component';
import { PricingComponent } from './components/pricing.component';
import { TermsComponent } from './components/terms.component';
import { PrivacyComponent } from './components/privacy.component';
import { RegConfirmationComponent } from './components/regconfirm.component';
import { ForgetpassEmailComponent } from './components/forgetpass-email.component';
import { ForgetpassConfirmpassComponent } from './components/forgetpass-confirmpass.component';
import { ContactFormComponent } from './components/contactform.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'regconfirm', component: RegConfirmationComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacypolicy', component: PrivacyComponent },
  { path: 'contact', component: ContactFormComponent },
  { path: 'forgotpassEmail', component: ForgetpassEmailComponent },
  { path: 'forgotpassConfirm', component: ForgetpassConfirmpassComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
