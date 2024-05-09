import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ShopsService } from '../services/shops.service';
import { PostcodesService } from '../services/postcodes.service';
import { AnalyticsService } from '../services/analytics.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ShopSelectionResolve implements Resolve<any> {
  constructor(
    private shops: ShopsService,
    private postcodeService: PostcodesService,
    private analytics: AnalyticsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  async resolve(route: ActivatedRouteSnapshot) {
    let postCode = this.postcodeService.convertPostCode(route.queryParams.postCode)
    let resp = await this.postcodeService.geoCode(postCode)
    if (!resp || !resp.result || !resp.result.latitude) {
      this.snackBar.open('Postcode not found', 'close', { duration: 4000 })
      this.router.navigate(['/'])
    } else {
      let shops = await this.shops.getShops(resp.result.latitude, resp.result.longitude)
      
      if (shops.length) {
        this.analytics.postCodeSearch('shop-found', postCode)
        return shops
      } else {
        this.analytics.postCodeSearch('no-shops-found', postCode)
        this.router.navigate(['continue'], { queryParams: { cm: 'true' } })
      }
    }
  }
}