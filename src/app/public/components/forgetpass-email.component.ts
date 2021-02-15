import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base.component';

@Component({
  selector: 'app-forgetpass-email',
  templateUrl: '../views/forgetpass-email.component.html',
  styleUrls: ['../styles/forgetpass-email.component.css']
})
export class ForgetpassEmailComponent extends BaseComponent implements OnInit {
  forgetPassEmailForm!: FormGroup;
  submitted: boolean = false;
  alert: any = { type: '', message: '' }
  constructor(public router: Router,
    public fb: FormBuilder) {
    super(router);
  }

  ngOnInit() {
    this.forgetPassEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.forgetPassEmailForm.controls;
  }

  forgotEmailSubmit() {
    this.submitted = true;
  }

}
