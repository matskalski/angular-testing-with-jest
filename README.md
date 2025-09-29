konfiguracja jest na podstawie
https://medium.com/@abhijit_chikane/set-up-jest-in-angular-v20-project-zoneless-replace-karma-jasmine-5ddd5552f2cb

serwisy:
utils service - podstawowe testy serwisu
users service - testy serwisu z zależnościami (wstrzykniętym innym serwisem)
users with rxjs service - testy serwisu z RXJS
api service - testy serwisu z zależnością od HttpClient
todos service - testy serwisu z obsługą wszystkich podstawowych typów metod http (get, post, put, path, delete)

komponenty:
errorMessage component - podstawowy komponent
pagination component - testy komponentu z inputem i outputem
