import { TestBed } from '@angular/core/testing';

import { UsersWithRxjsService } from './users-with-rxjs.service';
import { UserInteface } from '../types/user.interface';

describe('UsersWithRxjsService', () => {
  let usersWithRxjsService: UsersWithRxjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    usersWithRxjsService = TestBed.inject(UsersWithRxjsService);
  });

  it('should be created', () => {
    expect(usersWithRxjsService).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a user', () => {
      const user: UserInteface = {
        id: '3',
        name: 'foo',
      };
      usersWithRxjsService.addUser(user);
      expect(usersWithRxjsService.users$.getValue()).toEqual([{ id: '3', name: 'foo' }]);
    });
  })

  describe('removeUser', () => {
    it('should remove a user', () => {
      usersWithRxjsService.users$.next([{ id: '3', name: 'foo' }]);
      usersWithRxjsService.removeUser('3');
      expect(usersWithRxjsService.users$.getValue()).toEqual([]);
    });
  });
});
