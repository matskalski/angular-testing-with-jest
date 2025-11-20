import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SnackbarService{
  //private snackBar = inject(MatSnackBar);

  info(message: string, duration: number = 5) {
    let snackbarData = {
      message: message,
      duration: duration
    }
    this.openSnackBar(snackbarData, 'info-snackbar')
  }

  success(message: string, duration: number = 5) {
    let snackbarData = {
      message: message,
      duration: duration
    }
    this.openSnackBar(snackbarData, 'success-snackbar')
  }

  warning(message: string, duration: number = 5) {
    let snackbarData = {
      message: message,
      duration: duration
    }
    this.openSnackBar(snackbarData, 'warning-snackbar')
  }

  error(message: string, duration: number = 5) {
    let snackbarData = {
      message: message,
      duration: duration
    }
    this.openSnackBar(snackbarData, 'error-snackbar')
  }

  private openSnackBar(data: {message: string, duration: number}, panelClass: string) {
    //tu logika

    // this.snackBar.openFromComponent(Snackbar, {
    //   duration: data.duration,
    //   panelClass: panelClass,
    //   data: data
    // });
  }
}