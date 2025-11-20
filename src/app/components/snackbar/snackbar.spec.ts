import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Snackbar } from './snackbar';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarIcons } from '../../enums/snackbar-icon.enum';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatIconHarness } from '@angular/material/icon/testing';
import { By } from '@angular/platform-browser';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('Snackbar', () => {
  let component: Snackbar;
  let fixture: ComponentFixture<Snackbar>;
  let loader: HarnessLoader;
  const snackBarRefMock = {
    dismiss: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Snackbar],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {
            message: 'message',
            icon: SnackbarIcons.warning,
            duration: 4
          }
        },
        {
          provide: MatSnackBarRef,
          useValue: snackBarRefMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Snackbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct icon', async () => {
    const icons = await loader.getAllHarnesses(MatIconHarness);
    const names = await parallel(() => icons.map(icon => icon.getName()));

    expect(names).toContain('warning')
  });

  it('should display correct message', ()=>{
    const messageContainer = fixture.debugElement.query(
      By.css('[test-id="message"]')
    );

    expect(messageContainer.nativeElement.textContent).toContain('message');
  });

  it('when close button will be clicked then should call close function', async ()=>{
    const closeFn = jest.spyOn(Snackbar.prototype as any, 'close');
    closeFn.mockImplementation(() => { });

    const closeButton = (await loader.getAllHarnesses(MatButtonHarness))[0];
    await closeButton.click();

    expect(closeFn).toHaveBeenCalled();
  })
});
