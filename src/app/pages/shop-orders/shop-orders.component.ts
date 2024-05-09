import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-shop-orders',
  templateUrl: './shop-orders.component.html',
  styleUrls: ['./shop-orders.component.scss']
})
export class ShopOrdersComponent {

  orders: any[]
  ordersToDisplay: any[]
  orderType = 'upcoming'

  constructor(private route: ActivatedRoute, private orderService: OrdersService, private router: Router) {
    this.orders = this.route.snapshot.data.orders.sort((a, b) => a.statusHistory[0].time < b.statusHistory[0].time ? 1 : -1)
    this.changeType(this.orderType)
  }

  async onUpdate() {
    this.orders = await this.orderService.getOrders(['ready', 'pickedup', 'atshop'])
    if (!this.orders.length) this.router.navigate(['shop-admin'])
  }

  changeType(type) {
    if (type === 'past') {
      this.ordersToDisplay = this.orders.filter(order => !['ready', 'pickedup', 'atshop'].includes(order.status))
    } else {
      this.ordersToDisplay = this.orders.filter(order => ['ready', 'pickedup', 'atshop'].includes(order.status))
    }
  }

}
