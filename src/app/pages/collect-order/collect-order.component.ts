import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collect-order',
  templateUrl: './collect-order.component.html',
  styleUrls: ['./collect-order.component.scss']
})
export class CollectOrderComponent {

  order: any
  confirmedIdentity = false
  loading = false

  constructor(private route: ActivatedRoute, private orders: OrdersService, private router: Router, private snackBar: MatSnackBar) {
    this.order = this.route.snapshot.data.order
  }

  async confirm() {
    if (this.loading) return
    this.loading = true
    await this.orders.updateOrderStatus(this.order._id, 'delivered')
    this.order = await this.orders.getOrder(this.order._id)
    this.router.navigate(['shop-order', this.order._id])
    this.snackBar.open('Collection confirmed', 'close', { duration: 5000 })
  }

}
