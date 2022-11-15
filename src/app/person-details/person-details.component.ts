import { Component, OnInit } from '@angular/core';
import {PeopleService} from '../services/peopleservice.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.sass']
})
export class PersonDetailsComponent implements OnInit {
    errorMessage = '';
    person: any;

  constructor(private peopleService: PeopleService,
              private router: Router,
              private route: ActivatedRoute) { }
public currentPerson: any;
  loading = false;
  ngOnInit(): void {
      this.getPerson(this.route.snapshot.paramMap.get('name'));
  }
  getPerson(name) {
      this.loading = true;
      const person = '{person(name:' + ' "' + name  + '"' + ') {results {name\n' +
          '         height\n' +
          '          homeworld \n' +
          '          mass\n' +
          '          gender} }}';
      this.peopleService.getPerson(person)
        .subscribe(
             response => {
              this.currentPerson = response;
              if (this.currentPerson.header.responseCode === '200'){
                  this.person = this.currentPerson.body.person.results[0];
              }else{
                  this.errorMessage = this.currentPerson.header.customerMessage;
                 }
              this.loading = false;
            },
            error => {
                this.errorMessage = 'Failed to load data. Please try again later.';
                this.loading = false;
            });
  }
goHome(){
    this.router.navigate(['']);
}
}
