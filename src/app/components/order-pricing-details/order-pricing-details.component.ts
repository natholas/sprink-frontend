import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-pricing-details',
  templateUrl: './order-pricing-details.component.html',
  styleUrls: ['./order-pricing-details.component.scss']
})
export class OrderPricingDetailsComponent {

  @Input('order') order
  @Input('showChargedTo') showChargedTo

  constructor() { }

  getChargedAmount(type: string) {
    let total = 0
    this.order.chargeHistory.forEach(charge => {
      if (charge.type === type) total += charge.amount
    })
    return total
  }

}
