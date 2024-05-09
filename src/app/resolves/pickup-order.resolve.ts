import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';
import { OrdersService } from '../services/orders.service';
import { ShopsService } from '../services/shops.service';

@Injectable({
  providedIn: 'root',
})
export class PickupOrderResolve implements Resolve<any> {
  constructor(private router: Router, private user: UserService, private orders: OrdersService, private shops: ShopsService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    let nextNeededStep = await this.user.getNextStep()
    if (nextNeededStep) this.router.navigate(nextNeededStep.path, { queryParams: nextNeededStep.queryParams })
    else {
      let order = await this.orders.getOrder(route.params.orderId)
      if (order && order.status !== 'ready') this.router.navigate(['shop-order', order._id])
      else if (order) {
        let shop = await this.shops.getShop(order.shopId)
        let promotion
        if (order.promotionId) promotion = await this.orders.getPromotionById(order.promotionId)
        return {order, shop, promotion}
      }
    }
  }
}