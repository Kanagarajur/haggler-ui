import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Subject } from 'rxjs';


@Component({
  selector: '[data-loader-cmp]',
  template: `<div *ngIf="isLoading | async">
              <div class="ant-ui-widget-overlay"></div>
                <div class="ant-ajax-load" >
                <div class="spinner"></div>
                </div>
                </div>`
})
export class LoaderComponent {

  public showLoader: any = true;
  public loadingMSG: any;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService) {

  }

  ngOnInit() {
    //nop
  }

}
