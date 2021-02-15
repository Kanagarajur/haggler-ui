import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { Router } from '@angular/router';
import { MemberApi } from 'src/app/shared/services/memberApi';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdContactModalContent } from '../modals/modal-contact.component';
import { UserService } from 'src/app/shared/services/user.service';


@Component(
    {
        templateUrl: '../views/messages.component.html',
        styles: [`
        `]
    }
)
export class MessagesComponent extends BaseComponent {
    messages: any = [];
    userProfile: any;
    activeMesaages: number = 0;
    alert: any = { type: '', message: '' }
    selectedRow!: string;
    paginationData: any;
    curPage: any = 1;
    sortBy: any = 'firstname';
    sortDir: any = 'DESC';
    sortDirClass: any;

    constructor(public router: Router,
        public _api: MemberApi,
        public _userSvc: UserService,
        private modalService: NgbModal) {
        super(router);
    }

    ngOnInit() {
        this.userProfile = this._userSvc.getProfile();
        this.getLatestMessages();
    }

    sortData(sortColumn: string) {
        if (this.sortBy === sortColumn) {
            this.sortDir = (this.sortDir === 'ASC') ? 'DESC' : 'ASC';
        } else {
            this.sortBy = sortColumn;
            this.sortDir = 'ASC';
        }
        // this.store.dispatch({
        //     type: 'CHANGE_SORTING',
        //     payload: { 'sortColumn': sortColumn, 'sortDir': this.sortDir }
        // });

        this.getLatestMessages();
    }

    getLatestMessages() {
        let data = {
            'post': null,
            'get': {
                'page': this.curPage,
                'limit': 25,
                'sort': this.sortBy,
                'dir': this.sortDir
            }
        }
        this.sortDirClass = (this.sortDir === 'ASC') ? 'fa-sort-up' : 'fa-sort-down';
        this._api.getContacts(data).subscribe(
            (res: any) => {
                //console.log(JSON.stringify(res));
                if (res.content && Array.isArray(res.content) && res.content.length > 0) {
                    const setPgData = async () => {
                        this.paginationData = {
                            'totalRows': res.totalElements,
                            'rowLimit': res.size,
                            'numberOfElements': res.numberOfElements
                        };
                        return;
                    }
                    setPgData().then((value) => {
                        this.messages = res.content;
                    })
                } else {
                    this.messages = [];
                }
            },
            (error: any) => {
            })
    }

    editMessage(id: any, status: any, comments: any) {
        const modalRef = this.modalService.open(NgbdContactModalContent, { size: 'lg' });
        modalRef.componentInstance.messageDetail = { messageId: id, messageStatus: status, messageComments: comments };

        modalRef.result.then(
            (data: any) => {
                this.getLatestMessages();
            },
            (reason: any) => { });
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

    onPageChange(event: any) {        
        this.curPage = event;
        this.getLatestMessages();
    }
    toggleStatus(msgID: string, currStatus: string, currComments: string, key: number) {

        if (currStatus === 'Active') {
            this.messages[key].status = 'Disabled';
        } else {
            this.messages[key].status = 'Active';
        }
        let reqObj = {
            'Id': msgID,
            'postData': {
                "comments": currComments,
                "status": this.messages[key].status
            }
        }
        this._api.UpdateMessage(reqObj).subscribe(
            (res: any) => {
                //console.log(JSON.stringify(res));
            },
            (error: any) => {
                this.alert.type = 'danger';
                this.alert.message = 'Unable to fetch the deal details. Please try again later.'
            });

    }
}