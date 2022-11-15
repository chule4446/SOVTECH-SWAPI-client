import { TestBed } from '@angular/core/testing';

import { PeopleserviceService } from './peopleservice.service';

describe('PeopleserviceService', () => {
  let service: PeopleserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
