import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpEvent, HttpInterceptorFn, HttpRequest, provideHttpClient } from '@angular/common/http';
import { errorsInterceptor } from './errors-interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable, throwError } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { SnackbarService } from '../components/snackbar/snackbarService/snackbar.service';


// na podstawie
// https://medium.com/@js_9757/angular-unit-test-the-http-interceptor-c2464cf8e8da

describe('errorsInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorsInterceptor(req, next));

  const snackbarServiceMock ={
    error: jest.fn()
  }

  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: SnackbarService, useValue: snackbarServiceMock },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('when response status is 400 and message is passed then snackbarService error method should been called', () => {
    jest.spyOn(snackbarServiceMock, 'error')

    httpClient.get('/test').subscribe();
    const req = httpTestingController.expectOne('/test');

    const mockHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> =>
        throwError(() => {
          return {
            status: 400,
            statusText: "Error",
            error: {
              Message: 'message'
            }
          }
        })
    };

    interceptor(req.request, mockHandler.handle).subscribe();

    expect(snackbarServiceMock.error).toHaveBeenCalledWith("message")
  });
});
