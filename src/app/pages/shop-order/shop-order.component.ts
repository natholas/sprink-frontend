import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { OrdersService } from '../../services/orders.service';
import { paddTo } from '../../libs/padd-to';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RefundOrderComponent } from '../../components/refund-order/refund-order.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ShopOrderCommentComponent } from '../../components/shop-order-comment/shop-order-comment.component';
import * as moment from 'moment';
import { getPickupEndDate } from 'src/app/libs/get-pickup-end-date';

@Component({
  selector: 'app-shop-order',
  templateUrl: './shop-order.component.html',
  styleUrls: ['./shop-order.component.scss']
})
export class ShopOrderComponent {

  order
  today
  mapLink
  // totalRefunded: number
  production = false
  cancellationReason: string
  cancellationReasons = [
    'Shop cannot handle order volume',
    'Unable to arrange pickup',
    'No laundry bag could be found and no one answered the door',
    'Address cannot be found / is unreachable',
    'Requested service is no longer available',
    'Order seems fake',
    'Shop is closed',
    'Other'
  ]

  constructor(private route: ActivatedRoute,
    private orders: OrdersService,
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private orderService: OrdersService
  ) {
    this.order = this.route.snapshot.data.order
    let d = new Date()
    this.today = moment(`${paddTo(d.getUTCFullYear().toString(), 4)}-${paddTo((d.getUTCMonth() + 1).toString(), 2)}-${paddTo(d.getUTCDate().toString(), 2)}`)
    let address = this.order.address.formatted
    this.mapLink = 'https://www.google.ch/maps/dir//' + encodeURIComponent(address)
    // this.totalRefunded = this.order.refunds.reduce((t, r) => t + r.amount, 0)
    this.production = environment.production

    if (this.order.status === 'pickedup') this.order.dueDate = moment(this.order.deliveryTime)
    else if (this.order.status === 'ready') this.order.dueDate = moment(this.order.pickupTime)
    if (this.order.dueDate) {
      if (this.order.dueDate.startOf('day').diff(this.today.startOf('day'), 'days') < 0) this.order.overDue = true
      if (this.order.dueDate.startOf('day').diff(this.today.startOf('day'), 'days') === 0) this.order.dueToday = true
    }
  }

  async cancelOrder() {
    if (!this.cancellationReason) return
    if (!confirm('Are you sure you want to CANCEL this order?')) return
    await this.orders.cancelOrder(this.order._id, this.cancellationReason)
    this.order = await this.orders.getOrder(this.order._id)
  }

  async openRefundMenu() {
    history.pushState('popup', '')
    let sheet = this.bottomSheet.open(RefundOrderComponent, { data: { order: this.order } })
    await sheet.afterDismissed().toPromise()
    if (history.state === 'popup') history.back()
    this.order = await this.orders.getOrder(this.order._id)
    // this.totalRefunded = this.order.refunds.reduce((t, r) => t + r.amount, 0)
  }

  async addEditShopComment() {
    let data = { comment: this.order.shopComment }
    history.pushState('popup', '')
    let ref = this.dialog.open(ShopOrderCommentComponent, {
      width: '560px', data
    })
    ref.afterClosed().toPromise().then(async e => {
      if (history.state === 'popup') history.back()
      if (!e) return
      await this.orderService.updateShopOrderComment(this.order._id, data.comment)
      this.order = await this.orders.getOrder(this.order._id)
    })
  }

  getRunEndTime(time: string) {
    let date = moment(time)
    date.tz(moment.tz.guess())
    return getPickupEndDate(paddTo(date.get('hours').toString(), 2) + '-' + paddTo(date.get('minutes').toString(), 2), this.order.sprinkRunDuration)
  }

}
