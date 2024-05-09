import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shop-info-dialog',
  templateUrl: './shop-info-dialog.component.html',
  styleUrls: ['./shop-info-dialog.component.scss']
})
export class ShopInfoDialogComponent {

  shop: any
  selectedShop: any
  allowChange: boolean
  availableShops: any[]

  constructor(public dialogRef: MatDialogRef<ShopInfoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.shop = data.shop
    this.selectedShop = data.shop
    this.availableShops = data.availableShops
    this.allowChange = !!data.allowShopChange
  }

  changeDryCleaners() {
    this.dialogRef.close(this.selectedShop._id)
  }

}
