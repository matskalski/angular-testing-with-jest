import { TodoComponent } from './../todo/todo.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MainComponent } from "./main.component";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TodosService } from "../../../../services/todos.service";
import { provideHttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, Output, provideZonelessChangeDetection } from "@angular/core";
import { TodoInterface } from '../../../../types/todo.interface';

// Shallow testing
//mockowanie child komponentu znajdującego się w komponencie testowanym
//(main component ma zagnieżdżony TodoComponent który posiada własne testy)
//w tym wypadku z komponentu zagnieżdżonego interesują nas tylko inputy i outputy
@Component({
  standalone: true,
  selector: 'app-todos-todo',
  template: ''
})
class TodoComponentMock {
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
}

describe('main component', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>
  let httpTestingController: HttpTestingController;
  let todosService: TodosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [
        TodosService,
        //zależności zastąpujące HttpClienta
        //aby w trakcie testów nie wysyłać prawdziwych zapytań http a jedynie je mockować
        //wcześniej stosowany HttpClientTestingModule jest oznaczony jako deprecated
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ]
    })
    //zastąpienie komponentu zagnieżdżonego przez jego mock utworzony wcześniej
      .overrideComponent(MainComponent, {
        remove: { imports: [TodoComponent] },
        add: { imports: [TodoComponentMock] }
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
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

})