import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ShopsService } from '../services/shops.service';
import { UserService } from '../services/user.service';
import { StateService } from '../services/state.service';
import { PromotionsService } from '../services/promotions.service';
import { StorageService } from '../services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NewOrderResolve implements Resolve<any> {
  constructor(
    private shops: ShopsService,
    private user: UserService,
    private router: Router,
    private state: StateService,
    private promotionsService: PromotionsService,
    private storage: StorageService,
    private snackBar: MatSnackBar
  ) { }

  async resolve(route: ActivatedRouteSnapshot) {
    let shopId = route.queryParams.shopId
    let nextNeededStep = await this.user.getNextStep()
    if (nextNeededStep && nextNeededStep.path[0] === 'continue') nextNeededStep = undefined
    if (nextNeededStep) this.router.navigate(nextNeededStep.path, { queryParams: nextNeededStep.queryParams })
    else {
      let shop
      let shops = []
      if (shopId) {
        shop = await this.shops.getShop(shopId)
        if (shop) shops.push(shop)
      }
      if (!shop) {
        let demoMode = route.routeConfig.path === 'new-order-preview' && this.state.user.shopId
        shops = (await this.shops.getShops())

        if (!shop && this.state.shopId) {
          let requestedShop = shops.find(s => s._id === this.state.shopId)
          if (requestedShop) shop = requestedShop
        }

        shop = shops[0]
        if (demoMode) {
          shop = await this.shops.getShop(this.state.user.shopId)
          shops.push(shop)
        }
      }

      if (!this.state.order) this.state.order = this.storage.getLocal('order')

      if (shop && this.state.order) {
        if (this.state.order.shop._id !== shop._id) {
          let oldOrderShop = shops.find(s => s._id === this.state.order.shop._id)
          if (oldOrderShop) shop = oldOrderShop
        }
      }

      let promotion

      if (this.state.order && this.state.order.promotion) {
        if (this.state.order.promotion.promoCode) {
          let resp = await this.promotionsService.checkPromotionCode(this.state.order.promotion.promoCode)
          if (resp) promotion = resp
          else {
            this.snackBar.open('Promotion doesnt apply', 'close', { duration: 5000 })
          }
        }
      }

      if (!promotion) promotion = await this.promotionsService.getPromoResolve()
      if (shop) return { shop, promotion, shops }
      if (this.state.user.noShopsInRange) {
        this.router.navigate(['no-shops']) // not the first time
      } else {
        this.router.navigate(['account-created-no-shops']) // first time
      }
    }
  }
}