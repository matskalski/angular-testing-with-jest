import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { TodosService } from "../../../../services/todos.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";

describe('header component', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>
  let httpTestingController: HttpTestingController;

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

});