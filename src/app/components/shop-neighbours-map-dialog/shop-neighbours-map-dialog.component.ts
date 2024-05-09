import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shop-neighbours-map-dialog',
  templateUrl: './shop-neighbours-map-dialog.component.html',
  styleUrls: ['./shop-neighbours-map-dialog.component.scss']
})
export class ShopNeighboursMapDialogComponent {

  shop: any
  shops: any[]

  constructor(
    public dialogRef: MatDialogRef<ShopNeighboursMapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.shops = JSON.parse(JSON.stringify(data.shops))
    this.shop = data.shop
    this.shops.push(this.shop)
  }

}
