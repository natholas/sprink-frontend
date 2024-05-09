import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IconSelectionComponent } from '../icon-selection/icon-selection.component';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/services/products.service';
import { ChatService } from 'src/app/services/chat.service';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent {

  product: any
  shop: any
  submitted = false
  groups: any
  products: any
  selectedGroup
  selectedSubGroup
  filteredProducts: any[]
  search = ''
  lastNoResultsReport = 0

  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private productsService: ProductsService,
    public chat: ChatService,
    private analytics: AnalyticsService
  ) {
    this.product = this.data.product
    this.shop = this.data.shop
    this.init()
  }
  
  async init() {
    this.groups = this.productsService.groups || await this.productsService.loadProducts()
    this.products = this.productsService.products
    this.filteredProducts = this.products
    this.filteredProducts.forEach(prod => {
      let _prod = this.shop.products.find(p => p.name === prod.name)
      if (_prod && _prod.groupName === this.product.groupName) {
        prod.isSelected = this.product.name === prod.name
        prod.active = !prod.isSelected && !!_prod
      } else {
        prod.isSelected = false
        prod.active = false
      }
    })
  }

  changeGroup() {
    this.selectedSubGroup = undefined
    this.filter()
  }

  selectProduct(product) {
    this.product = {...product}
    this.init()
  }

  filter() {
    if (!this.selectedGroup) this.selectedSubGroup = undefined
    this.filteredProducts = this.products.filter(p => {
      if (this.search && p.name.toLowerCase().indexOf(this.search.toLowerCase()) === -1) return false
      if (this.selectedGroup && this.selectedGroup.groupName !== p.group) return false
      if (this.selectedSubGroup && this.selectedSubGroup.subGroupName !== p.subGroup) return false
      return true
    })

    if (!this.filteredProducts.length) {
      let time = Date.now() - this.lastNoResultsReport
      if (time > 1000) {
        this.lastNoResultsReport = Date.now()
        this.analytics.event('product-search', 'no-results', this.search)
      }
    }
  }

  save(form: NgForm) {
    if (!form.valid) return
    if (!this.product.icon) {
      this.submitted = true
      return this.snackBar.open('Please select a product icon', undefined, { duration: 2000 })
    }
    this.dialogRef.close(this.product)
  }

  deleteProduct() {
    this.dialogRef.close('delete')
  }

}
