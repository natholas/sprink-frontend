import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopsService } from 'src/app/services/shops.service';

@Component({
  selector: 'app-first-shop-opening',
  templateUrl: './first-shop-opening.component.html',
  styleUrls: ['./first-shop-opening.component.scss']
})
export class FirstShopOpeningComponent {

  shop: any
  loading = false
  success = false

  constructor(private route: ActivatedRoute, private shopService: ShopsService) {
    this.shop = this.route.snapshot.data.shop
  }

  async openShop() {
    this.loading = true
    await this.shopService.updateShop(this.shop._id, { isOpen: true })
    this.loading = false
    this.success = true
  }

}
