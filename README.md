konfiguracja jest na podstawie
https://medium.com/@abhijit_chikane/set-up-jest-in-angular-v20-project-zoneless-replace-karma-jasmine-5ddd5552f2cb

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

