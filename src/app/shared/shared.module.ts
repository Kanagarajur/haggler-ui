import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './components/registrationForm.component';
import { BaseComponent } from './components/base.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { PhoneNumberPipe } from './pipes/phonenumber.pipe';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './helpers/loader.interceptors';
import { LoaderComponent } from './components/loaderCmp';

import { PhoneInputFormatDirective } from './directives/phoneNumber.formatter';
@NgModule({
    declarations: [
        BaseComponent,
        RegistrationFormComponent,
        CapitalizePipe,
        PhoneInputFormatDirective,
        PhoneNumberPipe,
        LoaderComponent
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        RegistrationFormComponent,
        CapitalizePipe,
        PhoneNumberPipe,
        PhoneInputFormatDirective,
        LoaderComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
    ],
    entryComponents:[LoaderComponent],
    providers: [CapitalizePipe, PhoneNumberPipe, PhoneInputFormatDirective, LoaderService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }]
})
export class SharedModule { }