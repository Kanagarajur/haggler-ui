import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { Router } from '@angular/router';
import { MemberApi } from 'src/app/shared/services/memberApi';

@Component({
    templateUrl: './../views/admin.component.html'
})

export class AdminComponent extends BaseComponent {
    busUsers: any = [];
    curPage: any = 1;
    sortBy: any = 'businessName'
    sortDir: any = 'ASC'
    sortDirClass: any;
    paginationData: any;
    selectedRow: any;
    alert: any = { type: '', message: '' }

    constructor(public router: Router,
        public _api: MemberApi) {
        super(router);
    }

    ngOnInit() {
        this.getBusinessUsers();
    }

    getBusinessUsers() {
        let data = {
            'post':{},
            'get': {
                'page': this.curPage,
                'limit': 15,
                'sort': this.sortBy,
                'dir': this.sortDir
            }
        }
        this.sortDirClass = (this.sortDir === 'ASC') ? 'fa-sort-up' : 'fa-sort-down';
        this._api.getBusinessUsers(data).subscribe(
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
                        this.busUsers = res.content;
                    })
                } else {
                    this.busUsers = [];
                }
            },
            (error: any) => {

            })
    }

    sortData(sortColumn: string) {
        if (this.sortBy === sortColumn) {
            this.sortDir = (this.sortDir === 'ASC') ? 'DESC' : 'ASC';
        } else {
            this.sortBy = sortColumn;
            this.sortDir = 'ASC';
        }

        this.getBusinessUsers();
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
        this.getBusinessUsers();
    }
}