import { AfterViewInit, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-parent-selection-dialog',
  templateUrl: './product-parent-selection-dialog.component.html',
  styleUrls: ['./product-parent-selection-dialog.component.scss']
})
export class ProductParentSelectionDialogComponent implements AfterViewInit {

  parent1
  percentageDiscount
  addToCart

  constructor(
    public dialogRef: MatDialogRef<ProductParentSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.parent1 = this.data.product
    this.percentageDiscount = this.data.percentageDiscount
    this.addToCart = this.data.addToCart
  }

  disableAnimation = true;
  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => this.disableAnimation = false);
  }

  onSelect(product) {
    this.addToCart(product)
    this.dialogRef.close()
  }

}
