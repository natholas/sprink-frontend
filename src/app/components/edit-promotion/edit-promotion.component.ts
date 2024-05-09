import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.scss']
})
export class EditPromotionComponent {

  promoTypes = ['order', 'group', 'product']
  availabilities = ['always', 'with-code']
  discountTypes = ['percent', 'amount']
  percentageDiscountOptions = [10, 15, 20, 25, 50]
  productGroups: any[]
  promo: any
  shop: any
  limitUses = false
  addMinOrderValue = false

  constructor(
    public dialogRef: MatDialogRef<EditPromotionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.shop = this.data.shop
    this.promo = this.data.promo
    if (!this.promo.discountType) {
      this.promo.discountType = this.promo.amountDiscount ? 'amount' : 'percent'
    }
    if (this.promo.maxUsesPerCustomer && !this.promo.newCustomersOnly) {
      this.limitUses = true
    }
    if (this.promo.discountType === 'amount' && this.promo.minBasketValue) {
      this.addMinOrderValue = true
    }
    
    this.productGroups = []
    this.shop.products.forEach(product => {
      if (!product.groupName) return
      let group = this.productGroups.find(group => group.name === product.groupName)
      if (!group) this.productGroups.push({ name: product.groupName })
    })
  }

  changeAppliesTo() {
    if (this.promo.type !== 'order') this.promo.discountType = 'percent'
  }

  save(form: NgForm) {
    if (this.promo.status === 'live') return
    if (!form.valid) return
    if (!this.limitUses) this.promo.maxUsesPerCustomer = undefined
    if (!this.addMinOrderValue) this.promo.minBasketValue = 0
    this.dialogRef.close(true)
  }

}
