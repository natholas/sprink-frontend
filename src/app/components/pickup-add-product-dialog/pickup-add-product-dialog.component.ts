import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pickup-add-product-dialog',
  templateUrl: './pickup-add-product-dialog.component.html',
  styleUrls: ['./pickup-add-product-dialog.component.scss']
})
export class PickupAddProductDialogComponent {

  cart = []
  promotion
  shop

  constructor(
    public dialogRef: MatDialogRef<PickupAddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.promotion = this.data.promotion
    this.shop = this.data.shop
  }

  addToCart(product) {
    this.dialogRef.close(product)
  }

}
