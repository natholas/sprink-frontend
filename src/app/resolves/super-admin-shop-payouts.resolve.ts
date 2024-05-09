import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';
import { PayoutService } from '../services/payout.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminShopPayoutsResolve implements Resolve<any> {
  constructor(private router: Router, private state: StateService, private user: UserService, private payoutService: PayoutService) { }

  async resolve() {
    await this.user.checkLoggedIn()
    if (!this.state.user || this.state.user.userType !== 'superadmin') this.router.navigate([''])
    else {
      let shops = await this.payoutService.superAdminGetShopsThatNeedPayout()
      let payouts = await this.payoutService.superAdminGetShopPayouts()
      return { shops, payouts }
    }
  }
}