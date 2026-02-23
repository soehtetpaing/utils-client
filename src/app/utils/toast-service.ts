import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  private show(
    message: string,
    action: string = 'Close',
    duration = 3000,
    panelClass: string[] = []
  ) {
    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass,
    };

    this.snackBar.open(message, action, config);
  }

  success(message: string) {
    this.show(message, 'OK', 3000, ['toast-success']);
  }

  error(message: string) {
    this.show(message, 'Dismiss', 4000, ['toast-error']);
  }

  warn(message: string) {
    this.show(message, 'Close', 4000, ['toast-warn']);
  }

  info(message: string) {
    this.show(message, 'Close', 3000, ['toast-info']);
  }
  
}
