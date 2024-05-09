import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-selection-shop-info-dialog',
  templateUrl: './selection-shop-info-dialog.component.html',
  styleUrls: ['./selection-shop-info-dialog.component.scss']
})
export class SelectionShopInfoDialogComponent {

  shop

  constructor(
    public dialogRef: MatDialogRef<SelectionShopInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.shop = this.data.shop
  }

  continue() {
    this.dialogRef.close(true)
  }

}
