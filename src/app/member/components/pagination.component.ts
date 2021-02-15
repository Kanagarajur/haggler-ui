import {
	Component,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
	selector: 'pagination',
	template: `
    <nav *ngIf="(totalCount > pageSize)">
        <ul class="pagination justify-content-center m-0">
			<li class="paginate_button page-item" [class.disabled]="currentPage == 1" [class.actionLink]="currentPage != 1">
				<a class="page-link" (click)="previous()" aria-label="Previous" tabindex="0">
					Previous
				</a>
			</li>
            <li class="paginate_button page-item" [class.actionLink]="currentPage != page" [class.active]="currentPage == page" *ngFor="let page of pages" (click)="changePage(page)">
                <a class="page-link" *ngIf="checkDisplay(page)" tabindex="0">{{ page }}</a>
			</li>
			<li class="paginate_button page-item" [class.disabled]="currentPage == pages.length" [class.actionLink]="currentPage != pages.length">
				<a class="page-link" (click)="next()" aria-label="Next" tabindex="0">
					Next
				</a>
			</li>
        </ul>
    </nav>  
`
})
export class PaginationComponent implements OnChanges {
	@Input() items: any;
	@Input('page-size') pageSize: any;
	@Input('totalResultCount') totalCount: any;
	@Input('no_of_links') totalPageLinks: any = 3;
	@Output('page-changed') pageChanged = new EventEmitter();
	linksNum = [1, 2, 3];
	pages!: any[];
	currentPage: any;

	ngOnChanges() {
		this.currentPage = 1;

		if (!Array.isArray(this.items)) {
			this.items = [];
		}

		let pagesCount = Math.ceil(this.totalCount / this.pageSize);

		if (this.totalCount > 0 && pagesCount === 0) {
			pagesCount = this.totalCount / this.pageSize;
		}

		this.pages = [];
		this.linksNum = [1, 2, 3];

		for (let i = 1; i <= pagesCount; i++) {
			this.pages.push(i);
		}
	}

	changePage(page: any) {
		this.currentPage = page;
		this.pageChanged.emit(page);
	}

	checkDisplay(pageNumber: any) {
		if (this.linksNum.indexOf(pageNumber) > -1) {
			return true;
		}else return false
	}

	previous() {
		if (this.currentPage === 1) {
			return;
		}
		this.currentPage--;

		if (this.linksNum.indexOf(this.currentPage) === -1) {
			this.linksNum.pop();
			this.linksNum.unshift(this.currentPage);
		}

		this.pageChanged.emit(this.currentPage);
	}

	next() {
		if (this.currentPage === this.pages.length) {
			return;
		}
		this.currentPage++;

		if (this.linksNum.indexOf(this.currentPage) === -1) {
			this.linksNum.shift();
			this.linksNum.push(this.currentPage);
		}

		this.pageChanged.emit(this.currentPage);
	}


	first() {
		this.currentPage = 1;
		this.linksNum = [1, 2, 3];
		this.pageChanged.emit(this.currentPage);
	}

	last() {
		this.currentPage = this.pages.length;
		let pagesCount = Math.ceil(this.totalCount / this.pageSize);

		this.linksNum = [];
		for (let i = pagesCount - (this.totalPageLinks); i < pagesCount; i++) {
			this.linksNum.push(i + 1);
		}
		this.pageChanged.emit(this.currentPage);
	}
}
