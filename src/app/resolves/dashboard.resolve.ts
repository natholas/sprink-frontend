import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { OrdersService } from '../services/orders.service';
import { StateService } from '../services/state.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardResolve implements Resolve<any> {
  constructor(private router: Router, private user: UserService, private orders: OrdersService, private state: StateService, private storage: StorageService) { }

  async resolve() {
    let nextNeededStep = await this.user.getNextStep()
    if (nextNeededStep) this.router.navigate(nextNeededStep.path, { queryParams: nextNeededStep.queryParams })
    else {
      if (this.state.user.userType === 'superadmin') this.router.navigate(['super-admin-dashboard'])
      else if (this.state.user.shopId) this.router.navigate(['shop-admin'])
      else {
        if (this.state.autoNewOrder) {
          this.state.unsetAutoNewOrder()
          let order = this.state.order || this.storage.getLocal('order')
          if (order) this.router.navigate(['new-order'])
        }
        else {
          let orders = await this.orders.getOrders(['ready', 'pickedup', 'atshop'])
          if (!orders.length) this.router.navigate(['new-order'])
          else return orders
        }
      }
    }
  }
}