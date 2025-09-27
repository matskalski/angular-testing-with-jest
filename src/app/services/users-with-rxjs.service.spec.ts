import { TestBed } from '@angular/core/testing';

import { UsersWithRxjsService } from './users-with-rxjs.service';

describe('UsersWithRxjsService', () => {
  let service: UsersWithRxjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersWithRxjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
