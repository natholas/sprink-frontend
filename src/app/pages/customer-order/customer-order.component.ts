import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShopsService } from 'src/app/services/shops.service';
import * as moment from 'moment';
import { getPickupEndDate } from 'src/app/libs/get-pickup-end-date';
import { paddTo } from 'src/app/libs/padd-to';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss']
})
export class CustomerOrderComponent implements OnInit {

  @Input('order') order
  @Input('simpleMode') simpleMode
  @Output() onUpdate: EventEmitter<any> = new EventEmitter()
  productIcons = []
  productIconsLimited = []
  shop

  constructor(private shops: ShopsService) { }

  async ngOnInit() {
    this.productIcons = this.getProductIcons()
    this.productIconsLimited = this.productIcons.slice(0,5)
    
    if (this.order.status === 'atshop') {
      this.shop = await this.shops.getShop(this.order.shopId)
    }
  }

  getProductIcons() {
    let out = []

    this.order.products.forEach(prod => {
      if (!prod.productIcon) return
      for (let i = 0; i < prod.count; i++) out.push(prod.productIcon)
    })
    return out
  }

  getRunEndTime(time: string) {
    let date = moment(time)
    date.tz(moment.tz.guess())
    return getPickupEndDate(paddTo(date.get('hours').toString(), 2) + '-' + paddTo(date.get('minutes').toString(), 2), this.order.sprinkRunDuration)
  }

}
