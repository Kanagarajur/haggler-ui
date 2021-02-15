import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgetpass-confirmpass',
  templateUrl: '../views/forgetpass-confirmpass.component.html',
  styleUrls: ['../styles/forgetpass-confirmpass.component.css']
})
export class ForgetpassConfirmpassComponent implements OnInit {
  forgetPassEmailForm!: FormGroup;
  submitted: boolean = false;
  alert: any = { type: '', message: '' }
  constructor() { }

  ngOnInit() {
  }

 get f() {
    return this.forgetPassEmailForm.controls;
  }

}
