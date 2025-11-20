import { TestBed } from "@angular/core/testing";
import { SnackbarService } from "./snackbar.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from "../snackbar";
import { SnackbarIcons } from "../../../enums/snackbar-icon.enum";

describe("SnackbarService", () => {
  let snackbarService: SnackbarService;
  const matSnackBarMock = {
    openFromComponent: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SnackbarService,
        { provide: MatSnackBar, useValue: matSnackBarMock }
      ],
    });

    snackbarService = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(snackbarService).toBeTruthy();
  });

  describe('info', ()=>{
    it('when info method will be call whithout duration value then should been called with correct params and default duration value', ()=>{
      const openSnackBarFn = jest.spyOn(SnackbarService.prototype as any, 'openSnackBar');
      jest.spyOn(matSnackBarMock, 'openFromComponent')

      snackbarService.info("message")

      expect(openSnackBarFn).toHaveBeenCalledWith({
        message: 'message',
        icon: SnackbarIcons.info,
        duration: 5000
      }, 'info-snackbar')

      expect(matSnackBarMock.openFromComponent).toHaveBeenCalledWith(Snackbar, {
        duration: 5000,
        panelClass: 'info-snackbar',
        data: {
          message: 'message',
          icon: SnackbarIcons.info,
          duration: 5000
        }
      });
    });

    it('when info method will be call with duration value then should been called with correct params and passed duration value', ()=>{
      const openSnackBarFn = jest.spyOn(SnackbarService.prototype as any, 'openSnackBar');
      jest.spyOn(matSnackBarMock, 'openFromComponent')

      const duration = 10;

      snackbarService.info("message", duration)

      expect(openSnackBarFn).toHaveBeenCalledWith({
        message: 'message',
        icon: SnackbarIcons.info,
        duration: duration * 1000
      }, 'info-snackbar')

      expect(matSnackBarMock.openFromComponent).toHaveBeenCalledWith(Snackbar, {
        duration: duration * 1000,
        panelClass: 'info-snackbar',
        data: {
          message: 'message',
          icon: SnackbarIcons.info,
          duration: duration * 1000
        }
      });
    });
  });

  describe('warning', ()=>{
    it('when warning method will be call whithout duration value then should been called with correct params and default duration value', ()=>{
      const openSnackBarFn = jest.spyOn(SnackbarService.prototype as any, 'openSnackBar');
      jest.spyOn(matSnackBarMock, 'openFromComponent')

      snackbarService.warning("message")

      expect(openSnackBarFn).toHaveBeenCalledWith({
        message: 'message',
        icon: SnackbarIcons.warning,
        duration: 5000
      }, 'warning-snackbar')

      expect(matSnackBarMock.openFromComponent).toHaveBeenCalledWith(Snackbar, {
        duration: 5000,
        panelClass: 'warning-snackbar',
        data: {
          message: 'message',
          icon: SnackbarIcons.warning,
          duration: 5000
        }
      });
    });

    it('when warning method will be call with duration value then should been called with correct params and passed duration value', ()=>{
      const openSnackBarFn = jest.spyOn(SnackbarService.prototype as any, 'openSnackBar');
      jest.spyOn(matSnackBarMock, 'openFromComponent')

      const duration = 10;

      snackbarService.warning("message", duration)

      expect(openSnackBarFn).toHaveBeenCalledWith({
        message: 'message',
        icon: SnackbarIcons.warning,
        duration: duration * 1000
      }, 'warning-snackbar')

      expect(matSnackBarMock.openFromComponent).toHaveBeenCalledWith(Snackbar, {
        duration: duration * 1000,
        panelClass: 'warning-snackbar',
        data: {
          message: 'message',
          icon: SnackbarIcons.warning,
          duration: duration * 1000
        }
      });
    });
  });

  describe('success', ()=>{
    it('when success method will be call whithout duration value then should been called with correct params and default duration value', ()=>{
      const openSnackBarFn = jest.spyOn(SnackbarService.prototype as any, 'openSnackBar');
      jest.spyOn(matSnackBarMock, 'openFromComponent')

      snackbarService.success("message")

      expect(openSnackBarFn).toHaveBeenCalledWith({
        message: 'message',
        icon: SnackbarIcons.success,
        duration: 5000
      }, 'success-snackbar')

      expect(matSnackBarMock.openFromComponent).toHaveBeenCalledWith(Snackbar, {
        duration: 5000,
        panelClass: 'success-snackbar',
        data: {
          message: 'message',
          icon: SnackbarIcons.success,
          duration: 5000
        }
      });
    });

    it('when success method will be call with duration value then should been called with correct params and passed duration value', ()=>{
      const openSnackBarFn = jest.spyOn(SnackbarService.prototype as any, 'openSnackBar');
      jest.spyOn(matSnackBarMock, 'openFromComponent')

      const duration = 10;

      snackbarService.success("message", duration)

      expect(openSnackBarFn).toHaveBeenCalledWith({
        message: 'message',
        icon: SnackbarIcons.success,
        duration: duration * 1000
      }, 'success-snackbar')

      expect(matSnackBarMock.openFromComponent).toHaveBeenCalledWith(Snackbar, {
        duration: duration * 1000,
        panelClass: 'success-snackbar',
        data: {
          message: 'message',
          icon: SnackbarIcons.success,
          duration: duration * 1000
        }
      });
    });
  });

  describe('error', ()=>{
    it('when error method will be call whithout duration value then should been called with correct params and default duration value', ()=>{
      const openSnackBarFn = jest.spyOn(SnackbarService.prototype as any, 'openSnackBar');
      jest.spyOn(matSnackBarMock, 'openFromComponent')

      snackbarService.error("message")

      expect(openSnackBarFn).toHaveBeenCalledWith({
        message: 'message',
        icon: SnackbarIcons.error,
        duration: 5000
      }, 'error-snackbar')

      expect(matSnackBarMock.openFromComponent).toHaveBeenCalledWith(Snackbar, {
        duration: 5000,
        panelClass: 'error-snackbar',
        data: {
          message: 'message',
          icon: SnackbarIcons.error,
          duration: 5000
        }
      });
    });

    it('when error method will be call with duration value then should been called with correct params and passed duration value', ()=>{
      const openSnackBarFn = jest.spyOn(SnackbarService.prototype as any, 'openSnackBar');
      jest.spyOn(matSnackBarMock, 'openFromComponent')

      const duration = 10;

      snackbarService.error("message", duration)

      expect(openSnackBarFn).toHaveBeenCalledWith({
        message: 'message',
        icon: SnackbarIcons.error,
        duration: duration * 1000
      }, 'error-snackbar')

      expect(matSnackBarMock.openFromComponent).toHaveBeenCalledWith(Snackbar, {
        duration: duration * 1000,
        panelClass: 'error-snackbar',
        data: {
          message: 'message',
          icon: SnackbarIcons.error,
          duration: duration * 1000
        }
      });
    });
  });
})