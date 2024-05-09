import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-amount-selection-dialog',
  templateUrl: './product-amount-selection-dialog.component.html',
  styleUrls: ['./product-amount-selection-dialog.component.scss']
})
export class ProductAmountSelectionDialogComponent {

  product
  amount = 1
  width = 1
  height = 1
  imperial = false
  percentageDiscount

  constructor(
    public dialogRef: MatDialogRef<ProductAmountSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.product = this.data.product
    this.percentageDiscount = this.data.percentageDiscount
  }

  onConfirm(form: NgForm) {
    if (!form.valid) return
    this.dialogRef.close(this.amount)
  }

  calcAmount() {
    setTimeout(() => {
      this.amount = this.width * this.height
      this.amount = Math.round(this.amount * 100) / 100
    })
  }

  getAmount() {
    return Math.ceil(this.amount)
  }

}
