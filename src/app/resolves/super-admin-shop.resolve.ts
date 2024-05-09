import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';
import { ShopsService } from '../services/shops.service';
import { OrdersService } from '../services/orders.service';
import { PayoutService } from '../services/payout.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminShopResolve implements Resolve<any> {
  constructor(private router: Router, private state: StateService, private user: UserService, private shops: ShopsService, private orders: OrdersService, private payout: PayoutService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    await this.user.checkLoggedIn()
    if (!this.state.user || this.state.user.userType !== 'superadmin') this.router.navigate([''])
    else {
      let shop = await this.shops.getShop(route.params.id)
      let users = await this.user.getShopUsers(shop._id)
      let orders = await this.orders.getShopOrders(shop._id, ['initial', 'ready', 'pickedup', 'delivered', 'atshop', 'error', 'cancelled'])
      let verifications = await this.shops.getShopVerifications(shop._id)
      let payouts = await this.payout.getPayoutHistory(shop._id)
      return { users, shop, orders, verifications, payouts }
    }
  }
}