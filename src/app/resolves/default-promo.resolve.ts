import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { PromotionsService } from '../services/promotions.service';

@Injectable({
  providedIn: 'root',
})
export class DefaultPromoResolve implements Resolve<any> {
  constructor(private promotionService: PromotionsService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    return this.promotionService.getPromoResolve(!!route.params.shopName)
  }
}