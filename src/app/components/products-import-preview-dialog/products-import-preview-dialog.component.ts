import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-products-import-preview-dialog',
  templateUrl: './products-import-preview-dialog.component.html',
  styleUrls: ['./products-import-preview-dialog.component.scss']
})
export class ProductsImportPreviewDialogComponent {

  products: any
  rejections: any

  constructor(public dialogRef: MatDialogRef<ProductsImportPreviewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.products = this.data.results.products
    this.rejections = this.data.results.rejected
  }

  cancel() {
    this.dialogRef.close(false)
  }

  confirm() {
    this.dialogRef.close(true)
  }

}
