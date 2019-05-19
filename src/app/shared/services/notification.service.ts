import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition
} from '@angular/material';

@Injectable()
export class NotificationService {

  constructor(private snackBar:MatSnackBar) { }

  openNotification(message: string, action: string,
                   status: string = '', duration: number = 30000,
                   verticalPosition: MatSnackBarVerticalPosition = 'bottom',
                   horizontalPosition: MatSnackBarHorizontalPosition = 'center')
  {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition,
      panelClass: ['snackbar-'+status],
    });
  }
}
