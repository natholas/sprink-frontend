import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { StateService } from '../services/state.service';
import { PayoutService } from '../services/payout.service';

@Injectable({
  providedIn: 'root',
})
export class ShopPayoutResolve implements Resolve<any> {
  constructor(private user: UserService, private payoutService: PayoutService, private state: StateService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    await this.user.checkLoggedIn()
    if (!this.state.user) return
    if (!this.state.user.shopId && !route.params.id) return
    return await this.payoutService.getPayoutSettings(route.params.id || this.state.user.shopId)
  }
}