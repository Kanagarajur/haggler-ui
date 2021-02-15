import { Component, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberApi } from 'src/app/shared/services/memberApi';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'ngbd-modal-contact',
  templateUrl: '../views/modal-contact.component.html',
  styles: [`
  .modal-contact-chkbox
  {
    width:100%;
    font-size:20px;
    text-align:center;
  }
  `]
})
export class NgbdContactModalContent {
  @Input() messageDetail: any;
  alert: any = { type: '', message: '' }
  messageForm!: FormGroup;
  submitted = false;
  apiInProgress = false;
  closed = false;

  constructor(public activeModal: NgbActiveModal,
    private _api: MemberApi, private fb: FormBuilder) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      messageComments: ['', Validators.required]
    });
    this.messageForm.patchValue({
      messageComments: this.messageDetail.messageComments
    });
  }

  get f() {
    return this.messageForm.controls;
  }

  prepareMsgCommentsObj() {
    return {
      'Id': this.messageDetail.messageId,
      'postData': {
        "comments": this.messageForm.value.messageComments,
        "status": this.messageDetail.messageStatus
      }
    }
  }

  async updateStatus() {
    //this.alert = { type: 'success', message: this.messageDetail.messageId + " " + this.messageDetail.messageStatus + " " + this.messageDetail.messageComments }

    this.submitted = true;
    if (this.messageForm.valid) {
      this.apiInProgress = true;
      this._api.UpdateMessage(this.prepareMsgCommentsObj()).subscribe(
        (res: any) => {
          this.activeModal.close('Close click');
          //console.log("result - ", JSON.stringify(res));
          // this.alert.type = 'success';
          // this.alert.message = 'Comments updated successfully.';
          // this.apiInProgress = false;
          // setTimeout(() => { window.location.reload() }, 2000)
        },
        (error: any) => {
          this.activeModal.close('Close click');
          //console.log(error);
         // this.alert.type = 'danger';
         // this.alert.message = 'Failed!... Please try later.';
         // this.apiInProgress = false;
        }
      );
    }

  }
}
