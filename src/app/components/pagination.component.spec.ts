import { ComponentFixture, TestBed } from "@angular/core/testing"
import { PaginationComponent } from "./pagination.component"

describe('paginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent)
    component = fixture.componentInstance;
  })


})
