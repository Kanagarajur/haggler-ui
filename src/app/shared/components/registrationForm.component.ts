import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidator } from './../helpers/validation.helper';
import { PublicApi } from '../services/publicApi';

@Component({
    selector: 'registration-form-cmp',
    templateUrl: './../views/registrationForm.component.html'
})

export class RegistrationFormComponent {
    @Output() registerSuccess: EventEmitter<any> = new EventEmitter();
    public registrationForm: FormGroup = this.fb.group({});
    submitted: boolean = false;
    alert: any = {type:'',message:''}

    constructor(public fb: FormBuilder,
        public router: Router,
        public _api: PublicApi) {
    }

    ngOnInit() {
        this.registrationForm = this.fb.group({
            inputName: ['', Validators.required],
            inputPassword: ['', Validators.required],
            inputBusinessName: ['', Validators.required],
            inputBusinessEmail: ['', [Validators.required, Validators.email]],
            inputBusinessPhone: ['', [Validators.required, CustomValidator.phoneValidator]],
            inputBusinessZip: ['', [Validators.required, CustomValidator.zipCodeValidator]],
            conditionCheck: [, Validators.requiredTrue]
        });
    }

    get f() {
        return this.registrationForm.controls;
    }

    prepareReqObj() {
        return {
            "businessId": null,
            "businessName": this.registrationForm.value.inputBusinessName,
            "emailAddress": this.registrationForm.value.inputBusinessEmail,
            "password": "tester",
            "firstName": this.registrationForm.value.inputName,
            "lastName": null,
            "phone": this.registrationForm.value.inputBusinessPhone,
            "zipCode": this.registrationForm.value.inputBusinessZip,
            "latitude": null,
            "longitude": null,
            "businessImage": null,
            "fax": null,
            "category": null,
            "subCategory": null,
            "businessUrl": null,
            "streetAddress": null,
            "city": null,
            "state": null,
            "status": "Active" //TODO: Change this to In Active
        }
    }

    registerNewUser() {
        this.submitted = true;
        if (this.registrationForm.valid) {
            this._api.register(this.prepareReqObj()).subscribe(
                (res: any) => {
                    this.alert.type = 'success';
                    this.alert.message = 'Registration Successful!. Kindly login...';
                    setTimeout(()=> {
                        this.registerSuccess.emit();
                    },3000);
                },
                (error: any) => {
                    this.alert.type = 'danger';
                    this.alert.message = 'Please check the input data';
                });
        }
    }
} 
