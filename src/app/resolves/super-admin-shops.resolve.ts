import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';
import { ShopsService } from '../services/shops.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminShopsResolve implements Resolve<any> {
  constructor(private router: Router, private state: StateService, private user: UserService, private shops: ShopsService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    await this.user.checkLoggedIn()
    if (!this.state.user || this.state.user.userType !== 'superadmin') this.router.navigate([''])
    else {
      if (route.url.length === 2) {
        return await this.shops.superAdminGetHiddenShops()
      } else {
        return await this.shops.superAdminGetShops()
      }
    }
  }
}