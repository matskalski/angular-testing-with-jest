import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { SnackbarService } from '../components/snackbar/snackbarService/snackbar.service';
;



export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService = inject(SnackbarService);

  return next(req)
    .pipe(
      catchError(err => {
        if (err) {
          switch (err.status) {
            case 400:
              if (err.error?.Message) {
                snackbarService.error(err.error.Message);
                return of();
              }
              break
            default:
              break
          }
        }

        throw err;
      })
    );
};
