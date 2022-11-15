import { Component, OnInit } from '@angular/core';
import {PeopleService} from '../services/peopleservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public res: any;
  paged: boolean;
  currentPage = '1';
  totalPages = 0;
  isFirstPage = false;
  isLastPage = false;
  pageSize = 10;
  loading = false;
  errorMessage = '';
  results: Array<any>;
  constructor(private peopleService: PeopleService,
              private router: Router) { }

  ngOnInit(): void {
    this.getPeople(this.currentPage);
  }
  getPeople(page){
    this.loading = true;
    const body = '{page(page:' + ' "' + this.currentPage  + '"' + ') {results {name\n' +
        '         height\n' +
        '          homeworld \n' +
        '          mass\n' +
        '          gender} }}';
    this.peopleService.getPeople(body).subscribe(response => {
      this.res = response;
      if (this.res.header.responseCode === '200'){
        if (this.res?.body?.page?.results){
          this.results = this.res.body.page.results;
        }
      }else{
        this.errorMessage = this.res.header.customerMessage;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
      this.errorMessage = 'Failed to load data. Please try again later.';
    });
  }
  getDetails(name: string){
    this.router.navigate(['/person/' +  name]);
  }
  updatePage(page) {
    this.currentPage = page;
    this.getPeople(this.currentPage);
  }

  updatePageSize(value) {
    this.pageSize = +value;
    this.getPeople(this.currentPage);
  }

}
