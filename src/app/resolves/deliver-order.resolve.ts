import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { OrdersService } from '../services/orders.service';

@Injectable({
  providedIn: 'root',
})
export class DeliverOrderResolve implements Resolve<any> {
  constructor(private router: Router, private user: UserService, private orders: OrdersService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    let nextNeededStep = await this.user.getNextStep()
    if (nextNeededStep) this.router.navigate(nextNeededStep.path, { queryParams: nextNeededStep.queryParams })
    else {
      let order = await this.orders.getOrder(route.params.orderId)
      if (order && order.status !== 'pickedup') this.router.navigate(['shop-order', order._id])
      else return order
    }
  }
}