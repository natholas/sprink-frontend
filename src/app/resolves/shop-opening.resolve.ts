import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { ShopsService } from '../services/shops.service';
import { StateService } from '../services/state.service';
import { OrdersService } from '../services/orders.service';

@Injectable({
  providedIn: 'root',
})
export class ShopOpeningResolve implements Resolve<any> {
  constructor(private router: Router, private user: UserService, private shops: ShopsService, private state: StateService, private orders: OrdersService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    await this.user.checkLoggedIn()
    if (!this.state.user) this.router.navigate(['continue'])
    else if (!this.state.user.shopId && !route.params.id) this.router.navigate(['dashboard'])
    else {
      let shop = await this.shops.getShop(route.params.id || this.state.user.shopId)
      if (!shop) this.router.navigate(['dashboard'])
      else {
        let nextNeededStep = await this.user.getNextStep('shop-setup', shop)
        if (nextNeededStep) this.router.navigate(nextNeededStep.path, { queryParams: nextNeededStep.queryParams })
        else return shop
      }
    }
  }
}