import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CartDetailsComponent } from '../../components/cart-details/cart-details.component';
import { PromotionsService } from '../../services/promotions.service';
import { AnalyticsService } from '../../services/analytics.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderHelpDialogComponent } from 'src/app/components/order-help-dialog/order-help-dialog.component';
import { ShopInfoDialogComponent } from 'src/app/components/shop-info-dialog/shop-info-dialog.component';
import { StorageService } from 'src/app/services/storage.service';
import { ProductsService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewOrderSignupComponent } from 'src/app/components/new-order-signup/new-order-signup.component';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements AfterViewInit {

  shop: any
  availableShops: any[]
  cart = []
  total = 0
  subTotal = 0
  productGroups = []
  promotion: any
  discountAmount: number
  demoMode: boolean
  percentageDiscount: number

  constructor(
    private route: ActivatedRoute,
    public state: StateService,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private analytics: AnalyticsService,
    private dialog: MatDialog,
    private storage: StorageService,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
  ) {
    this.demoMode = window.location.pathname === '/new-order-preview'
    this.shop = this.route.snapshot.data.data.shop
    this.availableShops = this.route.snapshot.data.data.shops
    this.promotion = this.route.snapshot.data.data.promotion
    if (this.state.order && this.state.order.shop._id === this.shop._id) this.cart = this.state.order.cart
    if (!this.demoMode) this.analytics.beginCheckout(this.promotion && (this.promotion.title || this.promotion.promoCode || this.promotion._id) || '', this.shop._id)
    this.percentageDiscount = this.promotion && this.promotion.percentageDiscount
    this.calcTotal()
  }

  ngAfterViewInit() {
    if (this.state.order && this.state.order.autoContinue) this.continue(true)
  }

  async addToCart(product) {
    this.calcTotal()
    if (!this.demoMode) this.analytics.addToCart(product.name)
  }

  removeFromCart(product) {
    let item = this.cart.find(p => p.product._id === product._id)
    if (item.count > 1) {item.count -= 1}
    else this.cart.splice(this.cart.indexOf(item), 1)
    this.calcTotal()
    if (!this.demoMode) this.analytics.removeFromCart(product.name)
  }

  continue(autoMode = false) {
    if (this.total < this.shop.minOrderValue || !this.cart.length) {
      this.analytics.event('ecommerce', 'Minimum order value not reached')
      this.snackBar.open('Minimum order value not reached', 'close', { duration: 2000 })
      return
    }
    this.state.order = {
      cart: this.cart, total: this.total, shop: this.shop,
      discountAmount: this.discountAmount,
      promotionId: this.promotion ? this.promotion._id : undefined,
      promotion: this.promotion,
      allowDropOffAtDoor: true, demoMode: this.demoMode
    }

    if (!this.state.user) {
      this.openNewOrderSignupBottomSheet()
    } else {
      if (!this.demoMode) this.analytics.continueToOverview()
      if (!autoMode) this.state.order.autoContinue = true
      this.storage.setLocal('order', this.state.order)
      this.state.setAutoNewOrder()
      this.router.navigate(['overview'])
    }
  }

  openCartDetails() {
    this.analytics.event('ecommerce', 'show-details-popup')
    history.pushState('popup', '')
    let sheet = this.bottomSheet.open(CartDetailsComponent, {
      data: { order: { cart: this.cart, shop: this.shop, promotion: this.promotion }, buttonText: 'CONTINUE' },
    })
    this.bottomSheet._openedBottomSheetRef.backdropClick().toPromise().then(() => {
      if (history.state === 'popup') history.back()
      this.calcTotal()
      if (sheet.containerInstance.bottomSheetConfig.data.continued) this.continue()
    })
  }

  async openNewOrderSignupBottomSheet() {
    this.analytics.event('ecommerce', 'open-signup-bottom-sheet')
    history.pushState('popup', '')
    let sheet = this.bottomSheet.open(NewOrderSignupComponent)
    let resp = await sheet.afterDismissed().toPromise()
    if (resp) this.continue()
  }

  calcTotal() {
    let resp = this.productsService.calcPrices(this.cart, 0, this.promotion)
    this.total = resp.total
    this.subTotal = resp.subTotal
    this.discountAmount = resp.discountAmount
  }

  async openOrderHelp() {
    this.analytics.event('ecommerce', 'show-not-sure-popup')
    window.history.pushState('popup', '')
    let resp = this.dialog.open(OrderHelpDialogComponent, {
      width: '560px',
      data: { shop: this.shop }
    })
    await resp.afterClosed().toPromise()
    if (history.state === 'popup') history.back()
  }

  async openShopPopup() {
    this.analytics.event('ecommerce', 'show-shop-popup')
    history.pushState('popup', '')
    let dialog = this.dialog.open(ShopInfoDialogComponent, {
      width: '560px',
      data: { shop: this.shop, allowShopChange: true, availableShops: this.availableShops }
    });

    let shopId = await dialog.afterClosed().toPromise()
    if (history.state === 'popup') history.back()
    if (shopId) {
      this.router.navigate(['new-order'], { queryParams: { shopId }})
    }
  }

  canDeactivate() {
    if (this.dialog.openDialogs.length) return true
    if (this.bottomSheet._openedBottomSheetRef) return true
    if (!['get-started', '/'].includes(this.state.nextUrl)) return true
    return confirm('You are leaving the checkout, are you sure?')
  }

}
