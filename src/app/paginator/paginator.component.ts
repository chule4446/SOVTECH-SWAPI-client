import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() currentPage = 0;
  @Input() totalPages = 1;
  @Input() isFirstPage = false;
  @Input() isLastPage = false;

  @Output() onUpdatePage = new EventEmitter<any>();
  @Output() onUpdatePageSize = new EventEmitter<any>();

  page = 0;
  recordsOptions = new FormControl('30');

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentPage && !changes.currentPage.firstChange) {
      this.page = this.currentPage;
      this.page++;
    }
  }

  ngOnInit() {
    this.page = this.currentPage;
  }

  submitPage() {
    if (this.page && this.page >= 0) {
      this.currentPage = this.page > 0 ? this.page - 1 : 0;
      this.onUpdatePage.emit(this.currentPage);
    }
  }

  onPageSizeChange() {
    this.onUpdatePageSize.emit(this.recordsOptions.value);
  }

  nextPage() {
    if ((this.currentPage >= 0) && !this.isLastPage) {
      this.currentPage++;
      this.page = this.currentPage + 1;
      this.onUpdatePage.emit(this.currentPage);
    }
  }
  previousPage() {
    if ((this.currentPage > 0) && !this.isFirstPage) {
      this.currentPage--;
      this.page = this.currentPage + 1;
      this.onUpdatePage.emit(this.currentPage);
    }
  }
  firstPage() {
    this.page = 1;
    this.currentPage = 0;
    this.onUpdatePage.emit(this.currentPage);
  }
  lastPage() {
    this.page = this.totalPages;
    this.currentPage = this.totalPages - 1;
    this.onUpdatePage.emit(this.currentPage);
  }

}
