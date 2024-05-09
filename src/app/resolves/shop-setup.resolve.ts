import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ShopsService } from '../services/shops.service';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root',
})
export class ShopSetupResolve implements Resolve<any> {
  constructor(private router: Router, private user: UserService, private shops: ShopsService, private state: StateService) { }

  async resolve() {
    await this.user.checkLoggedIn()
    if (!this.state.user || !this.state.user.shopId) this.router.navigate(['dashboard'])
    else {
      let shop = await this.shops.getShop(this.state.user.shopId)
      if (!shop) this.router.navigate(['dashboard'])
      else {
        let nextNeededStep = await this.user.getNextStep('shop-setup', shop)
        if (nextNeededStep) this.router.navigate(nextNeededStep.path, { queryParams: nextNeededStep.queryParams })
        else return shop
      }
    }
  }
}