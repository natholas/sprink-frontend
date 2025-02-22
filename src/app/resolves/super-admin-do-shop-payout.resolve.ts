import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';
import { PayoutService } from '../services/payout.service';
import { ShopsService } from '../services/shops.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminDoShopPayoutResolve implements Resolve<any> {
  constructor(private router: Router, private state: StateService, private user: UserService, private payoutService: PayoutService, private shops: ShopsService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    await this.user.checkLoggedIn()
    if (!this.state.user || this.state.user.userType !== 'superadmin') this.router.navigate([''])
    else {
      let shop = await this.shops.getShop(route.params.id)
      let resp = await this.payoutService.superAdminCreatePayout(route.params.id)
      return [shop, resp.payout, resp.payoutSettings]
    }
  }
}