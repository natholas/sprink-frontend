import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionShopInfoDialogComponent } from 'src/app/components/selection-shop-info-dialog/selection-shop-info-dialog.component';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { PickupTimesService } from 'src/app/services/pickup-times.service';
import { PostcodesService } from 'src/app/services/postcodes.service';

@Component({
  selector: 'app-shop-selection',
  templateUrl: './shop-selection.component.html',
  styleUrls: ['./shop-selection.component.scss']
})
export class ShopSelectionComponent {

  postCode: string
  shops: any[]

  constructor(
    private route: ActivatedRoute,
    private timesService: PickupTimesService,
    private postCodeService: PostcodesService,
    private location: Location,
    private dialog: MatDialog,
    private router: Router,
    private analytics: AnalyticsService
  ) {
    this.postCode = this.postCodeService.convertPostCode(this.route.snapshot.queryParams.postCode).toUpperCase()
    this.shops = this.route.snapshot.data.shops
    
    this.shops.forEach(shop => {
      if (shop.name === 'Mr Pinks Professional Dry Cleaners') shop.img = '/assets/mr-pinks-storefront.jpg'
      else shop.img = '/assets/dry-cleaning-shop-1.jpg'
      shop.pickupTime = this.timesService.canPickupOnDate(this.timesService.nextPickupTime(shop), shop)
      shop.deliveryTime = this.timesService.canPickupOnDate(this.timesService.nextDeliveryTime([], shop, shop.pickupTime), shop, true)
      shop.deliveryFee = shop.extraProducts.find(p => p.name === 'deliveryFee').price
    })
  }

  goBack() {
    this.location.back()
  }

  clickShopPopupInfoButton(event: Event, shop) {
    this.showShopInfo(shop)
    event.stopPropagation()
    event.preventDefault()
    return false
  }

  async showShopInfo(shop) {
    this.analytics.event('ecommerce', 'show-shop-info-popup')
    let popup = this.dialog.open(SelectionShopInfoDialogComponent, { data: { shop } })
    let resp = await popup.afterClosed().toPromise()
    if (resp) this.router.navigate(['new-order'], { queryParams: { shopId: shop._id } })
  }

}
