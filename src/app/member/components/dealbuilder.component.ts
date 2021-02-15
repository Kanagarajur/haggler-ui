import { Component, Input } from "@angular/core";
import { BaseComponent } from 'src/app/shared/components/base.component';
import { MemberApi } from 'src/app/shared/services/memberApi';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { Store, select } from '@ngrx/store';
import * as memberState from '../reducers/deal.reducer';
import { DealService } from '../services/deal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../modals/modal.component';
@Component({
    templateUrl: '../views/dealbuilder.component.html'
})

export class DealBuilderComponent extends BaseComponent {
    deals: any = [];
    userProfile: any;
    activeDeals: number = 0;
    alert: any = { type: '', message: '' }
    selectedRow!: string;
    paginationData: any;
    curPage: any = 1;
    sortBy: any;
    sortDir: any;
    sortDirClass: any;

    //Subscription obj
    dealMisSub: any;

    constructor(public router: Router,
        public _api: MemberApi,
        public _userSvc: UserService,
        private _dealSvc: DealService,
        private modalService: NgbModal,
        private store: Store<memberState.State>) {
        super(router);
    }

    ngOnInit() {
        this.userProfile = this._userSvc.getProfile();
        //if(this.userProfile.paypalPaymentId==null && this.userProfile.paypalPaymentId=='')
       // {
       //     this.router.navigate(['member/profile']);
       // }
        this.dealMisSub = this.store.pipe(select(memberState.getDealsMiscDetails)).subscribe(
            (result) => {
                this.sortBy = result.sortBy;
                this.sortDir = result.sortDir;
            }
        );
        this.getLatestDeals();
    }

    ngOnDestroy() {
        if (this.dealMisSub)
            this.dealMisSub.unsubscribe();
    }

    getLatestDeals() {
        let data = {
            'post': {
                "merchantid": this.userProfile.businessId,
            },
            'get': {
                'page': this.curPage,
                'limit': 15,
                'sort': this.sortBy,
                'dir': this.sortDir
            }
        }
        this.sortDirClass = (this.sortDir === 'ASC') ? 'fa-sort-up' : 'fa-sort-down';
        this._api.getDeals(data).subscribe(
            (res: any) => {
                if (res.content && Array.isArray(res.content) && res.content.length > 0) {
                    //this.handleResponseData(res);
                    const setPgData = async () => {
                        this.paginationData = {
                            'totalRows': res.totalElements,
                            'rowLimit': res.size,
                            'numberOfElements': res.numberOfElements
                        };
                        return;
                    }
                    setPgData().then((value) => {
                        this.deals = res.content;
                        this.calcActiveDeals();
                    })
                } else {
                    this.deals = [];
                }
            },
            (error: any) => {

            })
    }

    /*private async handleResponseData(data: any) {
        const pagn = await this.setPagination(data);
        this.paginationData = pagn;
        this.deals = data.content;
        this.calcActiveDeals();
    }

    setPagination(res: any) {
        return new Promise((resolve) => {
            resolve({
                'totalRows': res.totalElements,
                'rowLimit': res.size,
                'numberOfElements': res.numberOfElements
            })
        })
    }*/

    sortData(sortColumn: string) {
        if (this.sortBy === sortColumn) {
            this.sortDir = (this.sortDir === 'ASC') ? 'DESC' : 'ASC';
        } else {
            this.sortBy = sortColumn;
            this.sortDir = 'ASC';
        }
        this.store.dispatch({
            type: 'CHANGE_SORTING',
            payload: { 'sortColumn': sortColumn, 'sortDir': this.sortDir }
        });

        this.getLatestDeals();
    }

    calcActiveDeals() {
        this.activeDeals = this.deals.reduce((n:any, x:any) => n + (x['dealstatus'] === 'Active'), 0);
    }

    deleteDeal(id: string) {
        this.selectedRow = id;
        this._api.deleteDeal(id).subscribe(
            (res: any) => {
                this.alert.type = 'success';
                this.alert.message = 'Deal deleted sucessfully!';
                this.getLatestDeals();
            },
            (error: any) => {
                this.alert.type = 'danger';
                this.alert.message = 'Unable to delete deal. Please try again later.'
            });
    }

    gotoNewDeal() {
        this.router.navigate(['/member/adddeal']);
    }

    editThisDeal(dealID: any) {
        this.selectedRow = dealID;
        this._api.getDeal(dealID).subscribe(
            (res: any) => {
                this._dealSvc.setDealsData(res);
                this.router.navigate(['/member/editdeal']);
            },
            (error: any) => {
                this.alert.type = 'danger';
                this.alert.message = 'Unable to fetch the deal details. Please try again later.'
            });
    }

    viewDeal(dealID: any) {
        //this.modalService.open(content, { size: 'lg' });
        const modalRef = this.modalService.open(NgbdModalContent, { size: 'lg' });
        modalRef.componentInstance.dealId = dealID;
    }

    getPaginationWriteup(rowLimit: any, totalRows: any) {
        let from = 1;
        let till = +rowLimit;
        if (totalRows > rowLimit && this.curPage > 1) {
            from = +((this.curPage - 1) * rowLimit) + 1;
            till = +(this.curPage * rowLimit);
        }
        if (totalRows < till) {
            till = totalRows;
        }
        return 'Showing ' + from + ' to ' + till + ' of ' + totalRows + ' records';
    }

    toggleStatus(dealID: string, currStatus: string, key: number) {
        //console.log(dealID + "::::::::" + currStatus);
        let urlData;
        if(currStatus === 'Active') {
            urlData = 'disable';
            this.activeDeals --;
            this.deals[key].dealstatus = 'Disabled';
        } else {
            urlData = 'activate';
            this.activeDeals ++;
            this.deals[key].dealstatus = 'Active';
        }
        let reqObj = {
            'urlData': urlData,
            'postData': {
                'ids': [dealID]
            }
        };
        this._api.toggleDeal(reqObj).subscribe(
            (res: any) => {
                //nop
            },
            (error: any) => {
                this.alert.type = 'danger';
                this.alert.message = 'Unable to fetch the deal details. Please try again later.'
            });

    }

    onPageChange(event: any) {
        this.curPage = event;
        this.getLatestDeals();
    }
}