import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateProfileComponent } from './components/updateprofile.component';
import { MemberProfileComponent } from './components/memberprofile.component';
import { DashboardComponent } from './components/dashboard.component';
import { DealBuilderComponent } from './components/dealbuilder.component';
import { NewDealComponent } from './components/newdeal.component';
import { MemberGuardService as MemberAuthGuard } from './../shared/services/membergaurd.service';
import { AdminComponent } from './components/admin.component';
import { MessagesComponent } from './components/messages.component';
import { PaypalPaymentComponent } from './components/paypalpayment.component';
import { PaypaysubscriptionComponent } from './components/paypaysubscription.component';

const routes: Routes = [
  { path: 'updateProfile', component: UpdateProfileComponent },
  { path: 'profile', component: MemberProfileComponent  },
  { path: 'payment', component: PaypalPaymentComponent  , canActivate: [MemberAuthGuard] },
  { path: 'subscription', component: PaypaysubscriptionComponent  , canActivate: [MemberAuthGuard] },
  { path: 'admin', component: AdminComponent  },
  { path: 'dashboard', component: DashboardComponent , canActivate: [MemberAuthGuard] },
  { path: 'dealbuilder', component: DealBuilderComponent , canActivate: [MemberAuthGuard]},
  { path: 'messages', component: MessagesComponent , canActivate: [MemberAuthGuard]},
  { path: 'adddeal', component: NewDealComponent, canActivate: [MemberAuthGuard]},
  { path: 'editdeal', component: NewDealComponent, canActivate: [MemberAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
