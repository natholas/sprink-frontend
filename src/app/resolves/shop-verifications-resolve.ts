import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { StateService } from '../services/state.service';
import { ShopsService } from '../services/shops.service';

@Injectable({
  providedIn: 'root',
})
export class ShopVerificationsResolve implements Resolve<any> {
  constructor(private user: UserService, private state: StateService, private shops: ShopsService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    await this.user.checkLoggedIn()
    if (!this.state.user) return
    if (!this.state.user.shopId && !route.params.id) return
    return await this.shops.getShopVerifications(this.state.user.shopId)
  }
}