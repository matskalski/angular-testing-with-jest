import { ComponentFixture, TestBed } from "@angular/core/testing"
import { TodoComponent } from "./todo.component"
import { provideHttpClient } from "@angular/common/http";
import { TodosService } from "../../../../services/todos.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { By } from "@angular/platform-browser";
import { first, last } from "rxjs";

describe('todo component', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todosService: TodosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
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
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    //utworzenie początkowych wartości dla inputów w komponencie
    component.todo = {
      id: '1',
      text: 'todo',
      isCompleted: false
    };
    component.isEditing = false;
    //tworzenie stanu inicjalnego
    fixture.detectChanges();
  })

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('has a coorec initial state', () => {
    const todo = fixture.debugElement.query(
      By.css('[data-testid="todo"]')
    );
    const edit = fixture.debugElement.query(
      By.css('[data-testid="edit"]')
    );
    const label = fixture.debugElement.query(
      By.css('[data-testid="label"]')
    );

    expect(todo.classes['completed']).not.toBeDefined();
    expect(todo.classes['editing']).not.toBeDefined();
    expect(edit).toBeFalsy();
    expect(label.nativeElement.textContent).toEqual('todo');
  })

  it('should change editing text after pass an event', () => {
    const event: Event = <Event><any>{ target: { value: 'test' } };

    component.changeText(event);

    expect(component.editingText).toEqual('test');
  })

  it('input should be undefined on default state', () => {
    ///wartość początkowa isEditing została w beforeEach ustawiona na false
    //więc input powinien być początkowo ukryty
    const input = fixture.debugElement.query(
      By.css('[data-testid="edit"]')
    );

    expect(input?.nativeElement).not.toBeDefined()
  });

  it('should call service with corect params', () => {
    //będziemy weryfikować czy metoda changeTodo
    //została wywołana z odpowiednim parametrem
    jest.spyOn(todosService, 'changeTodo')
      //trzeba dodać mockImplementation - inaczej wywołanie
      //nastąpi na rzeczywistej metodzie w serwisie
      //alternatywnym rozwiązaniem jest zamockowanie calego serwisu
      //wewnątrz podajemy implementacje zamockowanej fukcji - w tym wypadku nie robi ona nic
      .mockImplementation(() => { })

    //wartość do inputu todo została przypisana w beforeEach
    //na etapie inicjalizacji komponentu
    //w metodzie onInit następuje przypisanie wartości editingText
    //na podstawie inputu todo

    component.changeTodo();

    //weryfikacja czy metoda w serwisie została wywowłana z właściwymi parametrami
    expect(todosService.changeTodo).toHaveBeenCalledWith('1', 'todo');
  });

  it('removeTodo should be called', () => {
    //będziemy weryfikować czy metoda removeTodo
    //została wywołana z odpowiednim parametrem
    jest.spyOn(todosService, 'removeTodo')
      //trzeba dodać mockImplementation - inaczej wywołanie
      //nastąpi na rzeczywistej metodzie w serwisie
      //alternatywnym rozwiązaniem jest zamockowanie calego serwisu
      //wewnątrz podajemy implementacje zamockowanej fukcji - w tym wypadku nie robi ona nic
      .mockImplementation(() => { });

    const button = fixture.debugElement.query(
      By.css('[data-testid="destroy"]')
    );

    //symulacja kliknięcia
    button.nativeElement.click();

    //weryfikacja czy metoda w serwisie została wywowłana z właściwym parametrem
    expect(todosService.removeTodo).toHaveBeenCalledWith('1');
  })

  it('should removes todo', () => {
    //będziemy weryfikować czy metoda removeTodo
    //została wywołana z odpowiednim parametrem
    jest.spyOn(todosService, 'removeTodo')
      //trzeba dodać mockImplementation - inaczej wywołanie
      //nastąpi na rzeczywistej metodzie w serwisie
      //alternatywnym rozwiązaniem jest zamockowanie calego serwisu
      //wewnątrz podajemy implementacje zamockowanej fukcji - w tym wypadku nie robi ona nic
      .mockImplementation(() => { })

    //wartość do inputu todo została przypisana w beforeEach
    //na etapie inicjalizacji komponentu

    component.removeTodo();

    //weryfikacja czy metoda w serwisie została wywowłana z właściwymi parametrami
    expect(todosService.removeTodo).toHaveBeenCalledWith('1');
  })

  it('toogleTodo should be called', () => {
    //będziemy weryfikować czy metoda toggleTodo
    //została wywołana z odpowiednim parametrem
    jest.spyOn(todosService, 'toggleTodo')
      //trzeba dodać mockImplementation - inaczej wywołanie
      //nastąpi na rzeczywistej metodzie w serwisie
      //alternatywnym rozwiązaniem jest zamockowanie calego serwisu
      //wewnątrz podajemy implementacje zamockowanej fukcji - w tym wypadku nie robi ona nic
      .mockImplementation(() => { });

    const input = fixture.debugElement.query(
      By.css('[data-testid="toggle"]')
    );

    //symulacja kliknięcia
    input.nativeElement.click();

    //weryfikacja czy metoda w serwisie została wywowłana z właściwym parametrem
    expect(todosService.toggleTodo).toHaveBeenCalledWith('1');
  })

  it('should toogle todo', () => {
    //będziemy weryfikować czy metoda toggleTodo
    //została wywołana z odpowiednim parametrem
    jest.spyOn(todosService, 'toggleTodo')
      //trzeba dodać mockImplementation - inaczej wywołanie
      //nastąpi na rzeczywistej metodzie w serwisie
      //alternatywnym rozwiązaniem jest zamockowanie calego serwisu
      //wewnątrz podajemy implementacje zamockowanej fukcji - w tym wypadku nie robi ona nic
      .mockImplementation(() => { })

    //wartość do inputu todo została przypisana w beforeEach
    //na etapie inicjalizacji komponentu

    component.toggleTodo();

    //weryfikacja czy metoda w serwisie została wywowłana z właściwymi parametrami
    expect(todosService.toggleTodo).toHaveBeenCalledWith('1');
  })

  //tesowanie outputu
  it('should activate editing', () => {
    const label = fixture.debugElement.query(
      By.css('[data-testid="label"]')
    );

    //zasubskrybowanie się na zdarzenie emisji danych z outputu
    let clickedTodoId: string | null | undefined;

    component.setEditingId.pipe(first()).subscribe(
      todoId => clickedTodoId = todoId
    );

    //zasymulowanie double click
    label.triggerEventHandler('dblclick');

    expect(clickedTodoId).toEqual('1')
  })

  it('should change editnig test after input value changed', () => {
    //będziemy weryfikować czy metoda toggleTodo
    //została wywołana z odpowiednim parametrem
    jest.spyOn(todosService, 'toggleTodo')
      //trzeba dodać mockImplementation - inaczej wywołanie
      //nastąpi na rzeczywistej metodzie w serwisie
      //alternatywnym rozwiązaniem jest zamockowanie calego serwisu
      //wewnątrz podajemy implementacje zamockowanej fukcji - w tym wypadku nie robi ona nic
      .mockImplementation(() => { })


    jest.useFakeTimers();

    setTimeout(() => {
      console.log('abc')
      component.isEditing = true
      fixture.detectChanges();
      const input = fixture.debugElement.query(
        By.css('[data-testid="edit"]')
      );

      input.nativeElement.value = 'test'

      //jest.runAllTicks(1)

      //symulacja zdarzenia keyup
      input.nativeElement.dispatchEvent(
        new KeyboardEvent('keyup', { key: 'Enter' })
      );

      console.log(component.editingText)
    }, 2000)


    jest.useRealTimers();
  })
})