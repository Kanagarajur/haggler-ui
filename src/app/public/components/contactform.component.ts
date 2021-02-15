import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { Router } from '@angular/router';
import { PublicApi } from 'src/app/shared/services/publicApi';
import { FormGroupDirective, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhoneNumberPipe } from 'src/app/shared/pipes/phonenumber.pipe';

@Component({
    selector: 'contact-form',
    templateUrl: './../views/contactform.component.html',
    styleUrls:['./../styles/contact.component.css']
})
export class ContactFormComponent extends BaseComponent implements OnInit {
    contactForm!: FormGroup;
    submitted = false;
    apiInProgress = false;
    alert: any = { type: '', message: '' }
    closed = false;

    constructor(public _router: Router,
        private _api: PublicApi,
        private fb: FormBuilder,
        private _phoneNbr: PhoneNumberPipe) {
        super(_router);
    }

    ngOnInit() {
        this.contactForm = this.fb.group({
            contactFName: ['', Validators.required],
            contactLName: ['', Validators.required],
            contactEmail: ['', [Validators.required, Validators.email]],
            contactPhoneNumber: ['', Validators.required],
            contactProjectDesc: ['', Validators.required]
        });
    }

    prepareContactObj() {
        return {
            "firstName": this.contactForm.value.contactFName,
            "lastName": this.contactForm.value.contactLName,
            "phoneNumber": this._phoneNbr.transform(this.contactForm.value.contactPhoneNumber),
            "description": this.contactForm.value.contactProjectDesc,
            "emailAddress": this.contactForm.value.contactEmail,
            "status": "Active"
        }
    }

    async onSubmit(formData: any, formDirective: FormGroupDirective) {
        this.submitted = true;
        // TODO: Use EventEmitter with form value
        if (this.contactForm.valid) {
            this.apiInProgress = true;
            //return;
            this._api.saveContacts(this.prepareContactObj()).subscribe(
                (res: any) => {
                    console.log("result - ", JSON.stringify(res));
                    this.alert.type = 'success';
                    this.alert.message = 'Thank you for contacting us, we will get back to you soon.';
                    this.apiInProgress = false;
                    //this.contactForm.reset();
                    //this.contactForm.setValue({firstName: '', lastName: '', phoneNumber: '', description: '', emailAddress: ''});
                    setTimeout(() => { window.location.reload() }, 2000)

                },
                (error: any) => {
                    console.log(error);
                    this.alert.type = 'danger';
                    this.alert.message = 'Failed!... Please try later.';
                    this.apiInProgress = false;
                }
            );
        }
    }

    get f() {
        return this.contactForm.controls;
    }
}