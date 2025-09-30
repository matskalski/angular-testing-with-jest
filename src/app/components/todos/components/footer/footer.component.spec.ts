import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FooterComponent } from "./footer.component"
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { By } from "@angular/platform-browser";
import { TodosService } from "../../../../services/todos.service";
import { FilterEnum } from "../../../../types/filter.enum";
import { provideZonelessChangeDetection } from "@angular/core";

describe('footer component', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>
  let httpTestingController: HttpTestingController;
  let todosService: TodosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent
      ],
      providers: [
        //zależności zastąpujące HttpClienta
        //aby w trakcie testów nie wysyłać prawdziwych zapytań http a jedynie je mockować
        //wcześniej stosowany HttpClientTestingModule jest oznaczony jako deprecated
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ]
    }).compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
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

  describe('component visability', () => {
    it('should be hidden when no todos', () => {
      const footer = fixture.debugElement.query(
        By.css('[data-testid="footer"]')
      )

      //weryfikacja czy element ma przypisaną klasę
      //domyślnie nie ma żadnych todo więc klasa hidden powinna być przypisana
      expect(footer.classes['hidden']).toEqual(true)
    })

    it('should be visible with todos', async () => {
      todosService.todosSig.set([
        { id: '1', text: 'todo', isCompleted: false }
      ]);

      //przerenderowanie po zmianach
      await fixture.whenStable()

      const footer = fixture.debugElement.query(
        By.css('[data-testid="footer"]')
      )

      //weryfikacja czy element ma przypisaną klasę
      //todo zostały dodane więc klasa nie powinna być przypisana
      expect(footer.classes['hidden']).not.toBeDefined();
    })
  })

  describe('counters', () => {
    it('renders counter for 1 todo', async () => {
      todosService.todosSig.set([
        { id: '1', text: 'todo', isCompleted: false }
      ]);

      //przerenderowanie po zmianach
      await fixture.whenStable();

      const todoCounter = fixture.debugElement.query(
        By.css('[data-testid="todoCount"]')
      );

      expect(todoCounter.nativeElement.textContent).toContain('1 item left')
    });

    it('renders counter for 1 todo', async () => {
      todosService.todosSig.set([
        { id: '1', text: 'todo1', isCompleted: false },
        { id: '2', text: 'todo2', isCompleted: false }
      ]);

      //przerenderowanie po zmianach
      await fixture.whenStable();

      const todoCounter = fixture.debugElement.query(
        By.css('[data-testid="todoCount"]')
      );

      expect(todoCounter.nativeElement.textContent).toContain('2 items left')
    });
  })

  describe('filters', () => {
    it('highlights default filter', () => {
      const filterLinks = fixture.debugElement.queryAll(
        By.css('[data-testid="filterLink"]')
      );

      //pierwszy element na liście powinien posiadać klasę selected
      expect(filterLinks[0].classes['selected']).toBe(true);
    });

    it('highlights changed filter', async () => {
      todosService.filterSig.set(FilterEnum.active);

      //przerenderowanie po zmianach
      await fixture.whenStable();

      const filterLinks = fixture.debugElement.queryAll(
        By.css('[data-testid="filterLink"]')
      );

      //drugi element na liście powinien posiadać klasę selected
      //ponieważ w selectboxie została zmieniona wartość
      expect(filterLinks[1].classes['selected']).toBe(true);
    });

    it('changes a filter', ()=>{
      const filterLinks = fixture.debugElement.queryAll(
        By.css('[data-testid="filterLink"]')
      );

      //symulacja zdarzenia click
      filterLinks[1].nativeElement.click();

      expect(todosService.filterSig()).toBe(FilterEnum.active)
    })
  })

})