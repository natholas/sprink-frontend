import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-refund-order',
  templateUrl: './refund-order.component.html',
  styleUrls: ['./refund-order.component.scss']
})
export class RefundOrderComponent {

  order
  refundAmount = 0
  maxAmount: number
  loading = false

  constructor(private orders: OrdersService, private bottomSheetRef: MatBottomSheetRef<RefundOrderComponent>) {
    this.order = this.bottomSheetRef.containerInstance.bottomSheetConfig.data.order
    // this.maxAmount = this.order.totalAmount - this.order.refunds.reduce((t, refund) => t + refund.amount, 0)
    // Would need to redo max amount as some discounts are already taken from it (shop product changes)
  }

  async confirmRefund() {
    let amount = Math.round(this.refundAmount * 100)
    if (this.refundAmount <= 0 || amount > this.maxAmount) return alert('Invalid refund amount')
    this.loading = true
    await this.orders.refundOrder(this.order._id, Math.round(amount))
    this.bottomSheetRef.dismiss(true)
  }

}
