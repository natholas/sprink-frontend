import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { paddTo } from '../../libs/padd-to';
import { environment } from 'src/environments/environment';
import { PromotionsService } from '../../services/promotions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { getPickupEndDate } from 'src/app/libs/get-pickup-end-date';
import { MatDialog } from '@angular/material/dialog';
import { CantChargeExtraDialogComponent } from 'src/app/components/cant-charge-extra-dialog/cant-charge-extra-dialog.component';
import { PickupAddProductDialogComponent } from 'src/app/components/pickup-add-product-dialog/pickup-add-product-dialog.component';

@Component({
  selector: 'app-pickup-order',
  templateUrl: './pickup-order.component.html',
  styleUrls: ['./pickup-order.component.scss']
})
export class PickupOrderComponent {

  order
  newOrder
  promotion
  shop
  mapLink
  today
  apiEndpoint = environment.apiEndpoint
  cantSubmitWithMore = false
  confirmedItems = false
  loading = false
  products: any[]
  shopProducts: any[]
  productToAdd: any
  newTotal = 0
  newTotalNoDiscount = 0
  discountAmount = 0
  productsChanged = []
  data: any = {}

  constructor(
    private route: ActivatedRoute,
    private orders: OrdersService,
    private router: Router,
    private promotionsService: PromotionsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.order = this.route.snapshot.data.data.order
    this.newOrder = JSON.parse(JSON.stringify(this.order))
    this.shop = this.route.snapshot.data.data.shop
    this.shopProducts = this.order.shop.products

    this.shopProducts.forEach(product => {
      let orderProd = this.order.products.find(p => p.productName === product.name)
      if (orderProd) product.price = orderProd.productPrice
    })

    this.init()
  }

  async init() {
    if (this.order.promotionId) this.promotion = await this.orders.getPromotionById(this.order.promotionId)
    let d = new Date()
    this.today = `${paddTo(d.getUTCFullYear().toString(), 4)}-${paddTo((d.getUTCMonth() + 1).toString(), 2)}-${paddTo(d.getUTCDate().toString(), 2)}`
    let address = this.order.address.formatted
    this.mapLink = 'https://www.google.ch/maps/dir/' + encodeURIComponent(address)
  }

  removeProduct(product) {
    product.count -= 1
    if (product.count <= 0) this.newOrder.products.splice(this.newOrder.products.indexOf(product), 1)
    this.applyChanges()
    this.snackBar.open('Product removed', 'close', { duration: 2000 })
    this.confirmedItems = false
  }

  addProduct(product) {
    let prod = this.newOrder.products.find(p => p.productId === product.product._id && product.amount === p.unitTypeAmount)
    if (prod) prod.count += 1
    else {
      this.newOrder.products.push({
        productName: product.product.name,
        count: 1,
        productId: product.product._id,
        productIcon: product.product.icon,
        groupName: product.product.groupName,
        productPrice: product.product.price,
        unitType: product.product.unitType,
        unitTypeAmount: product.amount,
      })
    }
    this.applyChanges()
    setTimeout(() => this.data.productToAdd = undefined, 1)
    this.confirmedItems = false
    this.snackBar.open('Product added', 'close', { duration: 2000 })
  }

  applyChanges() {
    this.newOrder.totalAmount = 0
    this.newOrder.products.forEach(product => this.newOrder.totalAmount += product.productPrice * product.unitTypeAmount * product.count)
    this.newOrder.subTotal = this.newOrder.totalAmount
    this.newOrder.totalDiscountAmount = this.promotionsService.calcDiscountAmount(this.promotion, this.newOrder.totalAmount)
    this.newOrder.totalAmount += this.newOrder.deliveryFee
    this.newOrder.totalAmount -= this.newOrder.totalDiscountAmount
    this.calcDifferences()
  }

  calcDifferences() {
    this.productsChanged = []

    this.newOrder.products.forEach(prod => {
      let oldProd = this.order.products.find(p => p.productId === prod.productId && prod.unitTypeAmount === p.unitTypeAmount)
      if (!oldProd) this.productsChanged.push({ name: prod.productName, count: prod.count, unitType: prod.unitType, unitTypeAmount: prod.unitTypeAmount })
      else {
        let diff = prod.count - oldProd.count
        if (diff !== 0) this.productsChanged.push({ name: prod.productName, count: diff, unitType: prod.unitType, unitTypeAmount: prod.unitTypeAmount })
      }
    })

    this.order.products.forEach(prod => {
      let newProd = this.newOrder.products.find(p => p.productId === prod.productId && prod.unitTypeAmount === p.unitTypeAmount)
      if (!newProd) this.productsChanged.push({ name: prod.productName, count: -prod.count, unitType: prod.unitType, unitTypeAmount: prod.unitTypeAmount })
    })
  }

  async confirmPickup() {
    if (this.newOrder.products.length < 1) return this.snackBar.open('Please select at least one product', 'close', { duration: 2000 })
    if (this.cantSubmitWithMore) return this.dialog.open(CantChargeExtraDialogComponent, { width: '560px' })
    this.loading = true
    this.newOrder.oldProducts = this.order.products

    let resp = await this.orders.updateOrderProducts(this.order._id, this.newOrder)
    if (resp && resp.status) {
      let _resp = await this.orders.updateOrderStatus(this.order._id, 'pickedup')
      if (_resp.status) {
        this.router.navigate(['shop-order', this.order._id])
        this.snackBar.open('Pickup confirmed', 'close', { duration: 5000 })
      } else {
        if (_resp.error === 'CANCELLATION_FAILED') _resp.error = 'Could not capture customers payment. Please cancel this order.'
        this.snackBar.open(_resp.error, undefined, { duration: 5000 })
      }
    } else {
      if (resp.error === 'COULDNT_ADJUST_CHARGE') {
        this.cantSubmitWithMore = true
        this.dialog.open(CantChargeExtraDialogComponent, { width: '560px' })
      } else {
        if (resp.error === 'CANCELLATION_FAILED') resp.error = 'Could not capture customers payment. Please cancel this order.'
        this.snackBar.open(resp.error, undefined, { duration: 5000 })
      }
      this.loading = false
    }
  }

  getRunEndTime(time: string) {
    let date = moment(time)
    date.tz(moment.tz.guess())
    return getPickupEndDate(paddTo(date.get('hours').toString(), 2) + '-' + paddTo(date.get('minutes').toString(), 2), this.order.sprinkRunDuration)
  }

  async showAddProductDialog() {
    history.pushState('popup', '')
    let dialog = this.dialog.open(PickupAddProductDialogComponent, {
      width: '560px',
      data: {
        promotion: this.promotion,
        shop: this.shop,
      }
    })
    let resp = await dialog.afterClosed().toPromise()
    if (history.state === 'popup') history.back()
    if (!resp) return
    this.addProduct(resp)
  }

}
