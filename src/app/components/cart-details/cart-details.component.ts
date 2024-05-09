import { Component, OnDestroy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Data } from '@angular/router';
import { PromotionsService } from '../../services/promotions.service';
import { StateService } from 'src/app/services/state.service';
import { ProductsService } from 'src/app/services/products.service';
import { PickupTimesService } from 'src/app/services/pickup-times.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnDestroy {

  cart: any
  total: number
  discountAmount: number
  deliveryFee: number
  subTotal: number
  shop: any
  promotion: any
  buttonText: string
  pickupTime
  deliveryTime

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CartDetailsComponent>,
    public state: StateService,
    private productsService: ProductsService,
    private timesService: PickupTimesService
  ) {
    this.buttonText = this.bottomSheetRef.containerInstance.bottomSheetConfig.data.buttonText
    this.cart = this.bottomSheetRef.containerInstance.bottomSheetConfig.data.order.cart
    this.shop = this.bottomSheetRef.containerInstance.bottomSheetConfig.data.order.shop
    this.promotion = this.bottomSheetRef.containerInstance.bottomSheetConfig.data.order.promotion
    this.getValues()

    this.pickupTime = this.timesService.canPickupOnDate(this.timesService.nextPickupTime(this.shop), this.shop)
    this.deliveryTime = this.timesService.canPickupOnDate(this.timesService.nextDeliveryTime(this.cart, this.shop, this.pickupTime), this.shop, true)
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  getValues() {
    this.deliveryFee = this.shop.extraProducts.find(p => p.name === 'deliveryFee').price
    let resp = this.productsService.calcPrices(this.cart, this.deliveryFee, this.promotion)
    this.discountAmount = resp.discountAmount
    this.total = resp.total
    this.subTotal = resp.subTotal
  }

  removeFromCart(product) {
    this.cart.find(p => p.product._id === product._id).count -= 1
    this.getValues()
    if (!this.cart.length) this.bottomSheetRef.dismiss()
  }

  AddToCart(product) {
    this.cart.find(p => p.product._id === product._id).count += 1
    this.getValues()
  }

  continue() {
    this.bottomSheetRef.containerInstance.bottomSheetConfig.data.continued = true
    this.bottomSheetRef.dismiss(true);
  }

  ngOnDestroy() {
    for (let i = 0; i < this.cart.length; i ++) {
      if (this.cart[i].count <= 0) {
        this.cart.splice(i, 1)
        i --
      }
    }
  }

  getTotalMinusSprinkCredit() {
    if (!this.state.user) return this.total
    this.total -= this.state.user.balance
    return this.total < 0 ? 0 : this.total
  }

  getSprinkCreditInOrder() {
    if (!this.state.user || this.state.user.balance > this.total) return this.total
    return this.state.user.balance
  }

}
