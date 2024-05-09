import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { StateService } from '../services/state.service';
import { PayoutService } from '../services/payout.service';
import { ShopsService } from '../services/shops.service';

@Injectable({
  providedIn: 'root',
})
export class ShopPayoutsResolve implements Resolve<any> {
  constructor(private user: UserService, private payoutService: PayoutService, private state: StateService, private shops: ShopsService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    await this.user.checkLoggedIn()
    if (!this.state.user) return
    if (!this.state.user.shopId && !route.params.id) return
    let history = await this.payoutService.getPayoutHistory(this.state.user.shopId)
    let upcoming = await this.payoutService.getNextPayout(this.state.user.shopId)
    let shop = await this.shops.getShop(this.state.user.shopId)
    return [history, upcoming, shop]
  }
}