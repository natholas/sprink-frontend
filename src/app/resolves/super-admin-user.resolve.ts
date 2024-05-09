import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';
import { OrdersService } from '../services/orders.service';
import { ShopsService } from '../services/shops.service';
import { PaymentMethodsService } from '../services/payment-methods.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminUserResolve implements Resolve<any> {
  constructor(private router: Router, private state: StateService, private user: UserService, private orders: OrdersService, private shops: ShopsService, private paymentMethods: PaymentMethodsService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    await this.user.checkLoggedIn()
    if (!this.state.user || this.state.user.userType !== 'superadmin') this.router.navigate([''])
    else {
      let user = await this.user.superAdminGetUser(route.params.id)
      if (!user) return false
      let shop = user.shopId ? await this.shops.getShop(user.shopId) : undefined
      let orders = await this.orders.superAdminGetOrders(['initial', 'ready', 'pickedup', 'delivered', 'atshop', 'error', 'cancelled'])
      let paymentMethods = await this.paymentMethods.superAdminGetPaymentMethods(user._id)

      return { user, shop, paymentMethods, orders }
    }
  }
}