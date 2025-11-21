konfiguracja jest na podstawie
https://medium.com/@abhijit_chikane/set-up-jest-in-angular-v20-project-zoneless-replace-karma-jasmine-5ddd5552f2cb

w przypadku problemu z instalacją można spróbować podbić wersję paczek
ng update @angular/cli @angular/core

serwisy:
utils service - podstawowe testy serwisu
users service - testy serwisu z zależnościami (wstrzykniętym innym serwisem) - mockowanie zależności
users with rxjs service - testy serwisu z RXJS
api service - testy serwisu z zależnością od HttpClient
todos service - testy serwisu z obsługą wszystkich podstawowych typów metod http (get, post, put, path, delete)

komponenty:
errorMessage component - podstawowy komponent
pagination component - testy komponentu z inputem i outputem + plus zdarzenia (click)

footer component - testy rzeczywistego komponentu: tworzenie zależności, symulacja zdarzeń (zmiana w select boxie), zmiany na widoku w zależności od dostarczonych danych

header component - testy rzeczywistego komponentu, tworzenie zależności, symulacja zdarzeń (wcisniecie enter), weryfikacja wywołania metody z serwisu zależnego z właściwymi parametrami

main component - testy rzeczywistego komponentu, tworzenie zależności, symulacja zdarzeń (clikc), weryfikacja wywołania metody z serwisu zależnego z właściwymi parametrami, sprawdzenie czy klasy css są przypsiane w zależności od wartości w komponencie, sprawdzenie property bindingu ([checked]="isAllTodosSelected()"),
mockowanie komponetu zagnieżdżonego, sprawdzanie działania inputów i outputu w komponencie zagnieżdżonym (odebranie danych)

todo component - testy rzeczywistego komponentu, tworzenie zależności, symulacja zdarzeń (click, double click), weryfikowanie dzialania outputu (emitowanie danych), 
mockowanie zmiany inputu po zainicjalizowaniu komponentu(!) z użyciem changeDetectionRef i asynchronicznym wyczekaniem na zmiany (stosowane w wypadku błedy NG0100 - https://angular.dev/errors/NG0100)

auth-guard - testy dla guarda (canActivate)

errors-intercerpror - testy dla interceptora wychwytującego błędne statusy kodów http w rsponsach
edit-shop-attribute-resolver = testy dla resolvera

spec.cy.ts - testy integracyjne z cypress


pozostałe case'y:
ustawienie w teście sygnału oznaczonego w komponencie jako protected:
component: protected isLogged = signal<boolean>(false);
spec: component['isLogged'].set(true)
      await fixture.whenStable();

pobieranie w teście wartości sygnału oznaczonego w komponencie jako protected
component: protected isLogged = signal<boolean>(false);
spec: component['isLogged']()

mockowanie w teście funkcji oznaczonej jako protected:
component: protected closeSidenav() {
              this.sidenavClose.emit()
           }
spec: const closeSidenavFn = jest.spyOn(SidenavList.prototype as any, 'closeSidenav');
      closeSidenavFn.mockImplementation(() => { });

      expect(closeSidenavFn).toHaveBeenCalled();


wywołanie w teście metody oznaczonej jako protected:
component:  protected close() {
                this.snackBarRef.dismiss();
            }

spec: component['close']();


mockowanie erroru zwróconego z requestu http:
const req = httpTestingController.expectOne('https://localhost:7144/api/accounts/login');
req.flush("", { status: 404, statusText: "Not Found" });

jeżeli konieczne jest zamockowanie zależności (np. serwisu) i trzeba zamockować jego właściwości i funkcje:
serwis: 
export class MembersService {
   editMode = signal(false);

    uploadPhoto(file: File){
      const formData = new FormData();
      formData.append('file', file);
      console.log('aaa', formData)
      return this.httpClient.post<PhotoModel>(`${this.baseUrl}members/add-photo`, formData);
  }
}

mockowanie:
  const membersServiceMock = {
     //zamockowanie property (editMode):
     editMode: signal(false),

    //zamockowanie funckji - klasycznie:
    uploadPhoto: () =>{
         const res: PhotoModel = {
         id: 1,
         url: 'test',
         publicId: undefined,
         memberId: '1'
       };

       return of(res);
      }

    //zamockowanie z użyciem jest
    uploadPhoto: jest.fn()
      .mockImplementation(() => {
        const res: PhotoModel = {
          id: 1,
          url: 'test',
          publicId: undefined,
          memberId: '1'
        };

        return of(res);
      })
  }
