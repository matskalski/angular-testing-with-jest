import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ErrorMessageComponent } from "./errorMessage.component"
import { By } from "@angular/platform-browser";

describe('errorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErrorMessageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent)
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('renders default state', () => {
    //oczekiwanie na wyrenderowanie się drzewa DOM komponentu
    fixture.detectChanges();

    //przechwytywanie elementów z DOM po atrybucie
    const messageContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    )

    expect(messageContainer.nativeElement.textContent).toEqual("Something went wrong");
  });

  it('renders custom error message', () => {
    //oczekiwanie na wyrenderowanie się drzewa DOM komponentu
    fixture.detectChanges();

    component.message = "Email is already in use";
    //oczekiwanie na przegenerowanie się drzewa DOM komponentu
    fixture.detectChanges();

    //przechwytywanie elementów z DOM po atrybucie
    const messageContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    )

    expect(messageContainer.nativeElement.textContent).toEqual("Email is already in use");
  })
})
