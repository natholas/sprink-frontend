import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-payout-details-dialog',
  templateUrl: './payout-details-dialog.component.html',
  styleUrls: ['./payout-details-dialog.component.scss']
})
export class PayoutDetailsDialogComponent {

  payout: any
  shop: any

  constructor(public dialogRef: MatDialogRef<PayoutDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public chat: ChatService) {
    this.payout = this.data.payout
    this.shop = this.data.shop
  }

}
