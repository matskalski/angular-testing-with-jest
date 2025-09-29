import { ComponentFixture, TestBed } from "@angular/core/testing"
import { PaginationComponent } from "./pagination.component"
import { provideZonelessChangeDetection } from "@angular/core";
import { UtilsService } from "../services/utils.service";
import { By } from "@angular/platform-browser";
import { first } from "rxjs";

describe('paginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [
        //wstrzykujemy serwis zamiast go mockować
        //ponieważ nie ma potrzeby nadpisywać jego funkcjonalności
        UtilsService,
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent)
    component = fixture.componentInstance;

    //w komponencie w ngOnInit znajduje się logika bazująca na inputach
    //aby działał poprawnie należy dostarczyć ich wartości początkowe
    component.total = 50,
    component.limit = 10,
    component.currentPage = 1
  })

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('renders correct pagination', async()=>{
    //oczekiwanie na wyrenderowanie komponentu
    await fixture.whenStable();

    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]')
    )

    expect(pageContainers.length).toBe(5)
    //pirewsza stona ma numer 1
    expect(pageContainers[0].nativeElement.textContent).toContain('1')
  })

  it('should emit a clicked page', async ()=>{
    //oczekiwanie na wyrenderowanie komponentu
    await fixture.whenStable();

    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]')
    )

    let clickedPage: number | undefined;

    //nasłuchiwanie na zdarzenie emisji wartości z output
    component.pageChangeEvent.pipe(first())
      .subscribe(page => clickedPage = page);

    pageContainers[0].nativeElement.click();
    //aleernatywny zapis
    //pageContainers[0].triggerEventHandler('click')

    expect(clickedPage).toEqual(1);
  })
})
