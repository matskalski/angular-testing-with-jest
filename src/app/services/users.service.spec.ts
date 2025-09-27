import { UserInteface } from '../types/user.interface';
import { UsersService } from './users.service';
import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';

//mockowane zależności w tym funkcji
describe('UsersService with mocking dependencies', () => {
  let usersService: UsersService;

  //mokowanie zależności
  const utilsServiceMock = {
    //na tym etapie funkcja pluck zwraca undefined
    //jest kofigurowana bezpośrednio w teście
    pluck: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        //wstrzyknięcie instancji serwisu
        UsersService,
        //wstrzykniecie zależności wprost
        //UtilsService,

        //użycie zmockowanego serwisu
        {provide: UtilsService, useValue: utilsServiceMock}
      ],
    });

    //przypisanie
    usersService = TestBed.inject(UsersService);
  });

  it('creates a service', () => {
    expect(usersService).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a user', () => {
      const user: UserInteface = {
        id: '3',
        name: 'foo',
      };
      usersService.addUser(user);
      expect(usersService.users).toEqual([{ id: '3', name: 'foo' }]);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', () => {
      usersService.users = [{ id: '3', name: 'foo' }];
      usersService.removeUser('3');
      expect(usersService.users).toEqual([]);
    });
  });

  describe('getUsernames', () => {
    it('should get usernames', () => {
      //mockowanie funckji pluck
      utilsServiceMock.pluck.mockReturnValue(['foo']);
      expect(usersService.getUsernames()).toEqual(['foo']);
    });
  });
});

//użycie spy on w celu sprawdzenia z jakimi paramtrami
//została wywołana fukcja serwisu wstrzykniętego do testowanego serwisu
describe('UsersService with jest spy', () => {
  let usersService: UsersService;
  let utilsService: UtilsService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        //wstrzyknięcie instancji serwisu
        UsersService,
        //wstrzykniecie zależności wprost
        UtilsService,
      ],
    });

    //przypisanie
    usersService = TestBed.inject(UsersService);
    utilsService = TestBed.inject(UtilsService);
  });

  it('creates a service', () => {
    expect(usersService).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a user', () => {
      const user: UserInteface = {
        id: '3',
        name: 'foo',
      };
      usersService.addUser(user);
      expect(usersService.users).toEqual([{ id: '3', name: 'foo' }]);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', () => {
      usersService.users = [{ id: '3', name: 'foo' }];
      usersService.removeUser('3');
      expect(usersService.users).toEqual([]);
    });
  });

  describe('getUsernames', () => {
    it('should get usernames', () => {
      //mockowanie zachowania funkcji w niezamockowanym serwisie
      jest.spyOn(utilsService, 'pluck');
      usersService.users = [{ id: '3', name: 'foo' }];
      usersService.getUsernames();

      //getUsernames wywołuje wewnątrz funkcję pluck
      //sprawdzamy czy do funkcji pluck zostały przekazane wałściwe parametry
      expect(utilsService.pluck).toHaveBeenCalledWith(
        usersService.users,
        'name'
      );
    });
  });
});
