import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-help-dialog',
  templateUrl: './order-help-dialog.component.html',
  styleUrls: ['./order-help-dialog.component.scss']
})
export class OrderHelpDialogComponent implements OnInit {

  shop: any
  constructor(public dialogRef: MatDialogRef<OrderHelpDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.shop = data.shop
  }

  ngOnInit(): void {
  }

}
