import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { PromotionsService } from '../services/promotions.service';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AutoShopRedirectResolve implements Resolve<any> {
  constructor(private userService: UserService, private state: StateService, private router: Router) { }

  async resolve() {
    await this.userService.checkLoggedIn()
    if (this.state.user) {
      if (this.state.user.userType === 'admin' || this.state.user.userType === 'staff') this.router.navigate(['shop-admin'])
    }
  }
}