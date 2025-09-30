import { TodosService } from './../../../../services/todos.service';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { By } from '@angular/platform-browser';

describe('header component', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>
  let httpTestingController: HttpTestingController;
  let todosService: TodosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        TodosService,
        //zależności zastąpujące HttpClienta
        //aby w trakcie testów nie wysyłać prawdziwych zapytań http a jedynie je mockować
        //wcześniej stosowany HttpClientTestingModule jest oznaczony jako deprecated
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    //przypisanie testowego controlera do zapytań http
    httpTestingController = TestBed.inject(HttpTestingController);
    todosService = TestBed.inject(TodosService);
    //tworzenie stanu inicjalnego
    fixture.detectChanges();
  })

  //sprawdza czy nie pozostały jakieś niezakończone żądania http
  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a toto', async()=>{
    //będziemy weryfikować czy metoda addTodo
    //została wywołana z odpowiednim parametrem
    jest.spyOn(todosService, 'addTodo')
    //trzeba dodać mockImplementation - inaczej wywołanie
    //nastąpi na rzeczywistej metodzie w serwisie
    //alternatywnym rozwiązaniem jest zamockowanie calego serwisu
    //wewnątrz podajemy implementacje zamockowanej fukcji - w tym wypadku nie robi ona nic
    .mockImplementation(() =>{})

    const input = fixture.debugElement.query(
      By.css('[data-testid="newTodoInput"]')
    )

    //zmiana wartości w inpucie
    input.nativeElement.value = 'new value'
    //symulacja wciśnięcia klawisza enter w inpucie
    input.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', {key: 'Enter' })
    );

    //weryfikacja czy metoda w serwisie została wywowłana z właściwym parametrem
    expect(todosService.addTodo).toHaveBeenCalledWith('new value')
    //po tej operacji właściwość text w komponencie powinna być pusta
    expect(component.text).toEqual('')
  });
});