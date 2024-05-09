import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StateService } from '../../services/state.service';
import { OrdersService } from '../../services/orders.service';
import { fileToBase64 } from '../../libs/file-to-b64';
import { PaymentMethodsService } from '../../services/payment-methods.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PaymentMethodSelectionSheetComponent } from '../../components/payment-method-selection-sheet/payment-method-selection-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { ShopInfoDialogComponent } from '../../components/shop-info-dialog/shop-info-dialog.component';
import { UserService } from '../../services/user.service';
import { dateToUtcString } from '../../libs/date-to-utc-string';
import * as moment from 'moment-timezone';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnalyticsService } from '../../services/analytics.service';
import { getPickupEndDate } from 'src/app/libs/get-pickup-end-date';
import { paddTo } from 'src/app/libs/padd-to';
import { CartDetailsComponent } from 'src/app/components/cart-details/cart-details.component';
import { PromotionsService } from 'src/app/services/promotions.service';
import { StorageService } from 'src/app/services/storage.service';
import { ProductsService } from 'src/app/services/products.service';
import { PickupTimesService } from 'src/app/services/pickup-times.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  order: any
  numberOfItems = 0
  loading = false
  paymentMethods: any[]
  selectedPaymentMethod: any
  addCustomMessage = false
  pickupTime: moment.Moment
  deliveryTime: moment.Moment

  @ViewChild('imageel', { static: false }) imageEl: ElementRef

  constructor(public state: StateService,
    private orders: OrdersService,
    private router: Router,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private paymentMethodsService: PaymentMethodsService,
    private dialog: MatDialog,
    private userService: UserService,
    private promotionsService: PromotionsService,
    private snackBar: MatSnackBar,
    private analytics: AnalyticsService,
    private storage: StorageService,
    private productsService: ProductsService,
    public times: PickupTimesService
  ) {
    this.order = this.state.order

    this.state.order.autoContinue = false
    if (!this.order.customText) this.order.customText = ''
    this.order.cart.forEach(i => this.numberOfItems += i.count)
    this.paymentMethods = this.route.snapshot.data.data.paymentMethods
    let paymentMethodId = this.order.paymentMethod || this.state.user.primaryPaymentMethod
    this.selectedPaymentMethod = this.paymentMethods.find(pm => pm.id === paymentMethodId)
    if (!this.selectedPaymentMethod) this.selectedPaymentMethod = this.paymentMethods[0]
    if (this.order.customText) this.addCustomMessage = true

    if (this.order.pickupTime) {
      this.order.pickupTime = moment(this.order.pickupTime).tz(this.order.shop.timeZone)
      if (!this.times.canPickupOnDate(this.order.pickupTime, this.order.shop)) this.order.pickupTime = undefined
    }
    if (!this.order.pickupTime) this.order.pickupTime = this.times.canPickupOnDate(this.times.nextPickupTime(this.order.shop), this.order.shop)
    
    this.pickupTime = this.order.pickupTime.clone().tz(moment.tz.guess())

    if (this.order.deliveryTime) {
      this.order.deliveryTime = moment(this.order.deliveryTime).tz(this.order.shop.timeZone)
      if (!this.canDeliverOnDate(this.order.deliveryTime)) this.order.deliveryTime = undefined
    }
    if (!this.order.deliveryTime) this.order.deliveryTime = this.times.canPickupOnDate(this.times.nextDeliveryTime(this.order.cart, this.order.shop, this.order.pickupTime), this.order.shop, true)
    
    this.deliveryTime = this.order.deliveryTime.clone().tz(moment.tz.guess())
    
    this.changeDates()
    this.calcTotal()
  }

  async processImage() {
    let b64 = <string>await fileToBase64(this.imageEl.nativeElement.files[0])
    let img = new Image()

    img.onload = () => {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      canvas.width = 400
      canvas.height = 400 / (img.naturalWidth / img.naturalHeight)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      this.order.imageB64 = canvas.toDataURL('image/jpeg', 0.5)
      this.saveOrder()
    }
    img.src = b64
  }

  async openShopPopup() {
    history.pushState('popup', '')
    let resp = this.dialog.open(ShopInfoDialogComponent, {
      width: '560px',
      data: { shop: this.order.shop }
    });
    await resp.afterClosed().toPromise()
  }

  saveOrder() {
    this.storage.setLocal('order', this.order)
  }

  async openPaymentMethodSelectionSheet() {
    history.pushState('popup', '')
    let sheet = this.bottomSheet.open(PaymentMethodSelectionSheetComponent, { data: { selectedPaymentMethod: this.selectedPaymentMethod, paymentMethods: this.paymentMethods } })
    await sheet.afterDismissed().toPromise()
    if (history.state === 'popup') history.back()
    this.selectedPaymentMethod = sheet.containerInstance.bottomSheetConfig.data.selectedPaymentMethod
    this.order.paymentMethod = this.selectedPaymentMethod.id
    this.saveOrder()
  }

  addPaymentMethod() {
    this.paymentMethodsService.addPaymentMethod('overview')
  }

  changeDates() {
    this.order.pickupTime = this.times.canPickupOnDate(this.pickupTime, this.order.shop)
    this.order.deliveryTime = this.canDeliverOnDate(this.deliveryTime)
    if (!this.order.deliveryTime) {
      this.order.deliveryTime = this.times.nextDeliveryTime(this.order.cart, this.order.shop, this.order.pickupTime)
      this.deliveryTime = this.order.deliveryTime.clone()
      this.deliveryTime.tz(moment.tz.guess())
    }
    this.saveOrder()
  }

  async confirmPayment() {
    if (this.order.demoMode) return this.snackBar.open('Cant confirm an order in demo mode', 'close', { duration: 5000 })
    if (this.loading) return
    this.loading = true
    this.order.paymentMethod = this.selectedPaymentMethod.id
    try {
      let resp = await this.orders.confirmPayment()
      if (resp && resp.status) {
        let total = this.order.total / 100
        this.analytics.purchase(total)
        this.state.order = undefined
        await this.userService.getUser()
        this.storage.remove('order')
        let queryParams = this.order.promotion && this.order.promotion.sprinkCreditOnUse ? { scm: 'true' } : undefined
        this.router.navigate(['confirmation', resp.data._id], { queryParams })
        // this.snackBar.open('Pickup Scheduled!', 'close', { duration: 10000 })
      } else {
        if (resp.error) this.snackBar.open(resp.error, 'close', { duration: 5000 })
        return this.loading = false
      }
    } catch(err) {
      console.error(err);
      if (!err) err = 'an unexpected error has occured'
      this.snackBar.open(err, 'close', { duration: 5000 })
      this.loading = false
    }
  }

  getPickupEndDate(time: moment.Moment) {
    time = time.clone()
    time.tz(moment.tz.guess())
    return getPickupEndDate(paddTo(time.get('hours').toString(), 2) + '-' + paddTo(time.get('minutes').toString(), 2), this.order.shop.sprinkRunDuration)
  }

  async showOrderDetails() {
    history.pushState('popup', '')
    let sheet = this.bottomSheet.open(CartDetailsComponent, { data: { order: this.order, buttonText: this.selectedPaymentMethod ? 'CONFIRM PAYMENT' : 'CONTINUE' } })
    await sheet.afterDismissed().toPromise()
    if (history.state === 'popup') history.back()
    this.calcTotal()
    if (this.selectedPaymentMethod && sheet.containerInstance.bottomSheetConfig.data.continued) this.confirmPayment()
  }

  calcTotal() {
    let deliveryFee = this.order.shop.extraProducts.find(p => p.name === 'deliveryFee').price
    let resp = this.productsService.calcPrices(this.order.cart, deliveryFee, this.order.promotion)
    this.order.total = resp.total
    this.order.discountAmount = resp.discountAmount
    this.order.totalToPay = this.order.total
    if (this.state.user.balance) {
      this.order.totalToPay -= this.state.user.balance
      if (this.order.total < 0) this.order.totalToPay = 0
    }
  }

  getSprinkCreditRemaining() {
    let v = this.state.user.balance - this.order.total
    return v < 0 ? 0 : v
  }

  canDeactivate() {
    if (this.dialog.openDialogs.length) return true
    if (this.bottomSheet._openedBottomSheetRef) return true
    if (!['get-started', '/'].includes(this.state.nextUrl)) return true
    return confirm('You are leaving the checkout, are you sure?')
  }

  canPickupOnDate(date) {
    return this.times.canPickupOnDate(date, this.order.shop)
  }

  canDeliverOnDate(date) {
    return this.times.canDeliverOnDate(date, this.order.pickupTime, this.order.cart, this.order.shop)
  }
}