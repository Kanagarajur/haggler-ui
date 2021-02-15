import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/shared/helpers/validation.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { PublicApi } from 'src/app/shared/services/publicApi';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    templateUrl: './../views/registration.component.html',
    styles: [`
    .verify h5 {
        font-size: 2rem;
        color:#1998d5;
    }`]
})

export class RegistrationComponent extends BaseComponent {
    public registrationForm!: FormGroup;
    submitted: boolean = false;
    apiInProgress: boolean = false;
    showRegFormSection: boolean = true;
    showEmailSection: boolean = false;
    alert: any = { type: '', message: '' }
    auth2: any;

    @ViewChild('loginRef') loginElement!: ElementRef;

    constructor(public fb: FormBuilder,
        public router: Router,
        public _api: PublicApi,
        public _userSvc: UserService, public zone: NgZone) {
        super(router);
    }

    onSuccessReg(event: Event) {
        this.router.navigate(['/public/login']);
    }

    ngOnInit() {
        this.registrationForm = this.fb.group({
            inputName: [''],
            inputPassword: ['', Validators.required],
            inputBusinessName: ['', Validators.required],
            inputBusinessEmail: ['', [Validators.required, Validators.email]],
            inputBusinessPhone: ['', [Validators.required, CustomValidator.phoneValidator]],
            inputBusinessZip: ['', [Validators.required, CustomValidator.zipCodeValidator]]
        });

	this.googleSDK();
	this.fbLibrary();
    }

    get f() {
        return this.registrationForm.controls;
    }

    prepareReqObj() {
        return {
            "businessId": null,
            "businessName": this.registrationForm.value.inputBusinessName,
            "emailAddress": this.registrationForm.value.inputBusinessEmail,
            "password": this.registrationForm.value.inputPassword,
            "firstName": this.registrationForm.value.inputName,
            "lastName": null,
            "phone": this.registrationForm.value.inputBusinessPhone ? this.registrationForm.value.inputBusinessPhone.split('-').join('') : null,
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
            this.apiInProgress = true;
            this._api.register(this.prepareReqObj()).subscribe(
                (res: any) => {
                    this.alert.type = 'success';
                    this.alert.message = 'Registration Successful!. Kindly login...';
                    setTimeout(()=> {
                        this.showRegFormSection = false;
                        this.showEmailSection = true;
                    },3000);
                },
                (error: any) => {
                    this.alert.type = 'danger';
                    this.alert.message = 'Please check the input data';
                    this.apiInProgress = false;
                });
        }
   }
	
	/**
	* Google Login
	*/

    prepareLoginButton() {

        this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
            (googleUser:any) => { 

                let profile = googleUser.getBasicProfile();
                // console.log('Token || ' + googleUser.getAuthResponse().id_token);
                // console.log('ID: ' + profile.getId());
                // console.log('Name: ' + profile.getName());
                // console.log('Image URL: ' + profile.getImageUrl());
                // console.log('Email: ' + profile.getEmail());
                //YOUR CODE HERE
                let postdata = {
                    "emailAddress": profile.getEmail(),
                    "password": "",
                    "source": "google",
                    "businessName": profile.getName(),
                    "city": ""
                }
                this._api.socialMediaLogin(postdata).subscribe((res: any) => {
                    if (res.businessId) {
                        this._userSvc.setUserData(res);
                        localStorage.setItem('userData', JSON.stringify(res));
                        this.alert.type = 'success';
                        this.alert.message = 'Login Successful!. Please wait...';
                      //  this.router.navigate(['/member/dashboard']);
			 this.zone.run(() => this.router.navigateByUrl('/member/dashboard'));
                    } else {
                        this.alert.type = 'danger';
                        this.alert.message = res.error;
                    }
                }, (err: any) => { })

            }, (error:any) => {
                alert(JSON.stringify(error, undefined, 2));
            });

    }
    googleSDK() {

        window['googleSDKLoaded'] = () => {
            window['gapi'].load('auth2', () => {
                this.auth2 = window['gapi'].auth2.init({
                    client_id: '528597511411-3trmul0klftl806it793fhb1644q2m7b.apps.googleusercontent.com',
                    //client_id: '188637199174-dnm6dm1r7k652d8ddqd122kgas9kho3e.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                    scope: 'profile email'
                });
                this.prepareLoginButton();
            });
        }

        (function (d, s, id) {
            var js:any, fjs:any = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));

    }
    /**
     * FB Login
     */
    loginFb() {
        window['FB'].login((response: { authResponse: any; }) => {
           // console.log('login response', response);
            if (response.authResponse) {

                window['FB'].api('/me', {
                    fields: 'last_name, first_name, email'
                }, (userInfo: { email: any; first_name: string; last_name: string; }) => {

                  //  console.log("user information");
                  //  console.log(userInfo);
		    let postdata = {
                        "emailAddress": userInfo.email,
                        "password": "",
                        "source": "facebook",
                        "businessName": userInfo.first_name + ' ' + userInfo.last_name,
                        "city": ""
                    }
		    this._api.socialMediaLogin(postdata).subscribe((res: any) => {
                        if (res.businessId) {
                            this._userSvc.setUserData(res);
                            localStorage.setItem('userData', JSON.stringify(res));
                            this.alert.type = 'success';
                            this.alert.message = 'Login Successful!. Please wait...';
                           // this.router.navigate(['/member/dashboard']);
			    this.zone.run(() => this.router.navigateByUrl('/member/dashboard'));
                        } else {
                            this.alert.type = 'danger';
                            this.alert.message = res.error;
                        }
                    }, (err: any) => { })
                });

            } else {
               // console.log('User login failed');
            }
        }, { scope: 'email' });
    }

    fbLibrary() {

        (window as any).fbAsyncInit = function () {
            window['FB'].init({
                appId: '3819439784750389',
                cookie: true,
                xfbml: true,
                version: 'v3.1'
            });
            window['FB'].AppEvents.logPageView();
        };

        (function (d, s, id) {
            var js:any, fjs:any = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
} 
