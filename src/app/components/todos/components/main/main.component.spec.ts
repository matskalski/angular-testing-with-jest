import { TodoComponent } from './../todo/todo.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MainComponent } from "./main.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TodosService } from "../../../../services/todos.service";
import { provideHttpClient } from "@angular/common/http";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  provideZonelessChangeDetection
} from "@angular/core";
import { TodoInterface } from '../../../../types/todo.interface';
import { By } from '@angular/platform-browser';

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
    todosService = TestBed.inject(TodosService);
    //tworzenie stanu inicjalnego
    fixture.detectChanges();
  })

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  describe('component visability', () => {
    it('should be hidden without todos', () => {
      const mainElement = fixture.debugElement.query(
        By.css('[data-testid="main"]')
      )

      //element powinien być ukryty skoro nie dodaliśmy na początku żadnego todo
      //czyli powinien mieć dodaną klasę hidden
      expect(mainElement.classes['hidden']).toEqual(true);
    });

    it('should be visible with todos', async () => {
      //dodanie todo
      todosService.todosSig.set([
        { id: '1', text: 'todo', isCompleted: false }
      ])
      //przerenderowanie zmian
      await fixture.whenStable();

      const mainElement = fixture.debugElement.query(
        By.css('[data-testid="main"]')
      )

      //element powinien być widoczny skoro dodano todos
      //czyli nie powinien mieć dodanej klasy hidden
      expect(mainElement.classes['hidden']).not.toBeDefined();
    });

    it('should higlight all todos checkobxes', async () => {
      //dodnaie todos - wszystkie w stanie completed
      todosService.todosSig.set([
        { id: '1', text: 'todo1', isCompleted: true },
        { id: '2', text: 'todo2', isCompleted: true }
      ])
      //przerenderowanie zmian
      await fixture.whenStable();

      const toogleAll = fixture.debugElement.query(
        By.css('[data-testid="toggleAll"]')
      )

      //jeżeli wszystkie todo są w stanie completed
      //to properta checked powinna być przypisana
      expect(toogleAll.nativeElement.checked).toEqual(true)
    })

    it('should toggle all todos', async () => {
      //będziemy weryfikować czy metoda toogleAll
      //została wywołana z odpowiednim parametrem
      jest.spyOn(todosService, 'toggleAll')
        //trzeba dodać mockImplementation - inaczej wywołanie
        //nastąpi na rzeczywistej metodzie w serwisie
        //alternatywnym rozwiązaniem jest zamockowanie calego serwisu
        //wewnątrz podajemy implementacje zamockowanej fukcji - w tym wypadku nie robi ona nic
        .mockImplementation(() => { })

      //dodnaie todos - wszystkie w stanie completed
      todosService.todosSig.set([
        { id: '1', text: 'todo1', isCompleted: true },
        { id: '2', text: 'todo2', isCompleted: true }
      ])

      //przerenderowanie zmian
      await fixture.whenStable();

      const toogleAll = fixture.debugElement.query(
        By.css('[data-testid="toggleAll"]')
      )

      //symulacja zdarzenia click
      toogleAll.nativeElement.click()

      //jeżeli wszystkie todos były w stanie completed true
      //wówczas metoda w serwisie powinna zostać wywołana z wartością przeciwną - false
      expect(todosService.toggleAll).toHaveBeenCalledWith(false)
    })

    //test z użyciem zamockowanego komponentu zagnieżdżonego - test inputów
    it('should render a list of todos', async () => {
      //dodnaie todos
      todosService.todosSig.set([
        { id: '1', text: 'todo1', isCompleted: false },
        { id: '2', text: 'todo2', isCompleted: true }
      ])

      //przerenderowanie zmian
      await fixture.whenStable();

      const todos = fixture.debugElement.queryAll(
        By.css('[data-testid="todo"]')
      );

      expect(todos.length).toEqual(2);

      //component instance pozwala uzyskać dostęp do komponentu podrzędnego
      //w tym wypadku komponent podrzędny ma input o nazwie todo
      //i można sprawdzić jaką wartość otrzymał input
      expect(todos[0].componentInstance.todo).toEqual(
        { id: '1', text: 'todo1', isCompleted: false }
      )
      expect(todos[1].componentInstance.todo).toEqual(
        { id: '2', text: 'todo2', isCompleted: true }
      )
      //sprawdzenie property isEditing w komponencie zagnieżdżonym
      expect(todos[0].componentInstance.isEditing).toEqual(false)
      expect(todos[1].componentInstance.isEditing).toEqual(false)
    });

    //test z użyciem zamockowanego komponentu zagnieżdżonego - test outputu
    it('should change editing id', async()=>{
        //dodnaie todos
      todosService.todosSig.set([
        { id: '1', text: 'todo1', isCompleted: false },
        { id: '2', text: 'todo2', isCompleted: true }
      ])

      //przerenderowanie zmian
      await fixture.whenStable();

      const todos = fixture.debugElement.queryAll(
        By.css('[data-testid="todo"]')
      );

      //zatrigerowanie emisji wartości przez output
      todos[0].componentInstance.setEditingId.emit('1');

      //sprawdzenie czy poprawnie zadziałała funkcja przypisana do zdarzenia
      //związanego z wyemitowaniem wartości przez output w komponencie zagnieżdżonym
      expect(component.editingId).toEqual('1')
    });
  })
})
