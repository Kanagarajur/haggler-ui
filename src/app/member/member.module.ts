import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberRoutingModule } from './member-routing.module';
import { UpdateProfileComponent } from './components/updateprofile.component';
import { MemberProfileComponent } from './components/memberprofile.component';
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './components/dashboard.component';
import { DealBuilderComponent } from './components/dealbuilder.component';
import { HeaderComponent } from './components/header.component';
import { NavComponent } from './components/nav.component';
import { FooterComponent } from './components/footer.component';
import { NewDealComponent } from './components/newdeal.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { DealModel } from './model/deal.model';
import { ChartsModule } from 'ng2-charts';
import { NgbdModalContent } from './modals/modal.component';
import { AdminComponent } from './components/admin.component';

//Charts
import { BarChartComponent } from './components/charts/barchart.component';
import { LineChartComponent } from './components/charts/linechart.component';

//Utility
import { PaginationComponent } from './components/pagination.component';

//NgRx
import { StoreModule } from '@ngrx/store';
import { DealReducer } from './reducers/deal.reducer';
import { UserReducer } from './reducers/user.reducer';
import { MessagesComponent } from './components/messages.component';
import { NgbdContactModalContent } from './modals/modal-contact.component';
import { NgbdDealPrevModalContent } from './modals/modal-dealpreview.component';
import { PaypalPaymentComponent } from './components/paypalpayment.component';
import { PaypaysubscriptionComponent } from './components/paypaysubscription.component';

@NgModule({
    declarations: [
        UpdateProfileComponent,
        DashboardComponent,
        DealBuilderComponent,
        HeaderComponent,
        NavComponent,
        FooterComponent,
        NewDealComponent,
        AdminComponent,
        MemberProfileComponent,
        BarChartComponent,
        LineChartComponent,
        PaginationComponent,
        NgbdModalContent,
        MessagesComponent,
        NgbdContactModalContent,
        NgbdDealPrevModalContent,
        PaypalPaymentComponent,
        PaypaysubscriptionComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MemberRoutingModule,
        SharedModule,
        DlDateTimeDateModule,
        DlDateTimePickerModule,
        ChartsModule,
        StoreModule.forFeature('dealMiscDetails',DealReducer),
        StoreModule.forFeature('userDetails',UserReducer),
    ],
    entryComponents:[NgbdModalContent,NgbdContactModalContent,NgbdDealPrevModalContent],
    providers: [DealModel],
    bootstrap: []
})
export class MemberModule { }