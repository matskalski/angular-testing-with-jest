import { TestBed } from "@angular/core/testing";
import { TodosService } from "./todos.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { FilterEnum } from "../types/filter.enum";

describe('TodosService', () => {
  let todosService: TodosService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:3004/todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosService,
        //zależności zastąpujące HttpClienta
        //aby w trakcie testów nie wysyłać prawdziwych zapytań http a jedynie je mockować
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })

    todosService = TestBed.inject(TodosService);
    //przypisanie testowego controlera do zapytań http
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  //sprawdza czy nie pozostały jakieś niezakończone żądania http
  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates service', () => {
    expect(todosService).toBeTruthy()
  });

  it('set initial data', () => {
    expect(todosService.apiBaseUrl).toEqual(baseUrl);
    expect(todosService.todosSig()).toEqual([])
    expect(todosService.filterSig()).toEqual(FilterEnum.all)
  })

  describe('changeFilter', () => {
    it('changes the fileter', () => {
      expect(todosService.filterSig()).toEqual(FilterEnum.all);
      todosService.changeFilter(FilterEnum.active);
      expect(todosService.filterSig()).toEqual(FilterEnum.active);
    })
  })


  describe('getTodos', () => {
    it('gets correct data', () => {
      //w pierwszej kolejności wywołanie testowanej metody która utworzy żadanie http
      todosService.getTodos();

      //w kolejnym kroku mockowanie httpClienta
      const req = httpTestingController.expectOne(baseUrl);
      //mockowanie odpowiedzi z http
      req.flush([
        { id: '1', text: 'todo_1', isCompleted: true },
        { id: '2', text: 'todo_2', isCompleted: false }
      ]);

      expect(todosService.todosSig())
        .toEqual([
          { id: '1', text: 'todo_1', isCompleted: true },
          { id: '2', text: 'todo_2', isCompleted: false }
        ])
    })
  })

  describe('addTodo', () => {
    it('creates a todo', () => {
      const todo = 'todo1'

      //w pierwszej kolejności wywołanie testowanej metody która utworzy żadanie http
      todosService.addTodo(todo);

      //w kolejnym kroku mockowanie httpClienta
      const req = httpTestingController.expectOne(baseUrl);
      //mockowanie odpowiedzi z http
      req.flush({ id: '1', text: 'todo_1', isCompleted: false });

      expect(todosService.todosSig())
        .toEqual([
          { id: '1', text: 'todo_1', isCompleted: false },
        ])
    })
  })

  describe('changeTodo', () => {
    it('updates a todo', () => {
      todosService.todosSig.set([{ id: '1', text: 'todo_1', isCompleted: false }]);
      todosService.changeTodo('1', 'new todo');

      //w kolejnym kroku mockowanie httpClienta
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      //mockowanie odpowiedzi z http
      req.flush({ id: '1', text: 'new_todo', isCompleted: false });

      expect(todosService.todosSig()).toEqual([
        { id: '1', text: 'new_todo', isCompleted: false }
      ])

    })
  })

  describe('removeTodo', () => {
    it('removes a todo', () => {
      todosService.todosSig.set([{ id: '1', text: 'todo_1', isCompleted: false }]);
      todosService.removeTodo('1');

      //w kolejnym kroku mockowanie httpClienta
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      //mockowanie odpowiedzi z http
      req.flush([]);

      expect(todosService.todosSig()).toEqual([])
    })
  })

  describe('toogleTodo', () => {
    it('togles a todo', () => {
      todosService.todosSig.set([{ id: '1', text: 'todo_1', isCompleted: false }]);
      todosService.toggleTodo('1');

      //w kolejnym kroku mockowanie httpClienta
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      //mockowanie odpowiedzi z http
      req.flush(
        { id: '1', text: 'todo_1', isCompleted: true }
      );

      expect(todosService.todosSig()).toEqual([{ id: '1', text: 'todo_1', isCompleted: true }])
    })
  })

  describe('toogleAll', () => {
    it('togles all todos', () => {
      todosService.todosSig.set([
        { id: '1', text: 'todo_1', isCompleted: false },
        { id: '2', text: 'todo_2', isCompleted: false }
      ]);

      todosService.toggleAll(true);

      //metoda wewnątrz wywołuje clienta http dla każdego z elementów z todoSig
      //przekazując w paramatrze jego id
      //dlatego nie mockuje się konkretnego wywołania na konkretny adres
      //a jedynie wywołanie adresu zawierającego jakąś ścieżke - w tym wypadku baseUrl
      //ponieważ http://localhost:3004/todos/1 zawiera http://localhost:3004/todos
      const reqs = httpTestingController.match(request => request.url.includes(baseUrl));
      //mockowanie odpowiedzi z http
      //dla każedego z wywołań
      reqs[0].flush(
        { id: '1', text: 'todo_1', isCompleted: true }
      );
      reqs[1].flush(
        { id: '2', text: 'todo_2', isCompleted: true }
      );

      expect(todosService.todosSig()).toEqual([
        { id: '1', text: 'todo_1', isCompleted: true },
        { id: '2', text: 'todo_2', isCompleted: true }
      ])
    })
  })
});
