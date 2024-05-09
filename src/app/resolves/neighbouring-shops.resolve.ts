import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ShopsService } from '../services/shops.service';

@Injectable({
  providedIn: 'root',
})
export class NeighbouringShopsResolve implements Resolve<any> {
  constructor(private shops: ShopsService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    let shop = await this.shops.getShop(route.params.id)
    let shops = (await this.shops.getShops(shop.location.coordinates[1], shop.location.coordinates[0])) || []
    return shops.filter(_shop => _shop._id !== route.params.id)
  }
}