import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ErrorMessageComponent } from "./errorMessage.component"
import { By } from "@angular/platform-browser";
import { provideZonelessChangeDetection } from "@angular/core";

describe('errorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErrorMessageComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent)
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('renders default state', async () => {
    //oczekiwanie na wyrenderowanie się drzewa DOM komponentu
    await fixture.whenStable();
    //fixture.detectChanges();

    //przechwytywanie elementów z DOM po atrybucie
    const messageContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    )

    expect(messageContainer.nativeElement.textContent).toContain("Something went wrong");
  });

  it('renders custom error message', async () => {
    component.message = "Email is already in use";
    //oczekiwanie na przegenerowanie się drzewa DOM komponentu
    //fixture.detectChanges();
    await fixture.whenStable();

    //przechwytywanie elementów z DOM po atrybucie
    const messageContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    )

    expect(messageContainer.nativeElement.textContent).toContain("Email is already in use");
  })
})
