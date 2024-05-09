import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    public state: StateService,
    private analytics: AnalyticsService
  ) { }

  close() {
    this.dialogRef.close(false)
  }

  accept() {
    this.analytics.event('allow-advertising', 'dialog')
    this.dialogRef.close(true)
  }

}
