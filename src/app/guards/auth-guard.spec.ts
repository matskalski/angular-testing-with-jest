import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterModule,
  RouterStateSnapshot
} from '@angular/router';
import { authGuard } from './auth-guard';
import { Observable, of } from 'rxjs';
import { CurrentUserService } from './currentUser.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('authGuard', () => {
  const usersServiceMock = {
    currentUser$: of<{ id: string, name: string } | null>()
  }
  let router: Router;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        [RouterModule.forRoot([])]
      ],
      providers: [
        {
          provide: CurrentUserService,
          useValue: usersServiceMock
        },
        provideZonelessChangeDetection()
      ]
    });

    usersServiceMock.currentUser$ = of(null)
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('guard returns true when user is not null', () => {
    //zdefiniowanie usera, ponieważ jeżeli user jest zdefiniowany
    //guard zwraca true
    usersServiceMock.currentUser$ = of({ id: '1', name: 'user' })

    //zdefiniowanie parametrów
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {
      url: '/',
    } as any;

    //wywołanie guarda
    const result = executeGuard(route, state) as Observable<boolean>;

    let resultValue: boolean;

    result.subscribe(res => {
      resultValue = res
    });

    expect(resultValue!).toBe(true)
  })

  it('guard returns false and navigate to "/" when user is null', () => {
    //domyślnie ustawiono currentUser$ jako null w before each

    //będziemy weryfikować czy metoda navigateByUrl
    //została wywołana z odpowiednim parametrem
    jest.spyOn(router, 'navigateByUrl')
      //trzeba dodać mockImplementation - inaczej wywołanie
      //nastąpi na rzeczywistej metodzie w serwisie
      //alternatywnym rozwiązaniem jest zamockowanie calego serwisu
      //wewnątrz podajemy implementacje zamockowanej fukcji - w tym wypadku nie robi ona nic
      .mockImplementation()

    //zdefiniowanie parametrów
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {
      url: '/consent-initiation',
    } as any;

    //wywołanie guarda
    const result = executeGuard(route, state) as Observable<boolean>;

    let resultValue: boolean;

    result.subscribe(res => {
      resultValue = res
    });

    expect(resultValue!).toBe(false)
    expect(router.navigateByUrl).toHaveBeenCalledWith('/')
  })
});
