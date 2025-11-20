import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarData } from '../../models/snackbar-data.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sm-snackbar',
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.css'
})
export class Snackbar {
  private snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) { }

  protected close() {
    this.snackBarRef.dismiss();
  }
}



