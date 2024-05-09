import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopInfoDialogComponent } from '../../components/shop-info-dialog/shop-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from '../../services/orders.service';
import { Location } from '@angular/common';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-order-details',
  templateUrl: './customer-order-details.component.html',
  styleUrls: ['./customer-order-details.component.scss']
})
export class CustomerOrderDetailsComponent {

  order: any
  promotion: any
  endpoint: string
  productsChanged = []
  showChanges = false
  cancellationReason: string
  cancellationReasons = [
    'I’ve changed my mind',
    'I needed to edit my order',
    'It’s too expensive',
    'I no longer need this service',
    'I’ll be away',
    'I don’t trust this dry cleaner',
    'Other'
  ]

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private orderService: OrdersService,
    private _snackBar: MatSnackBar,
    public location: Location,
    public state: StateService,
    private userService: UserService
  ) {
    this.order = this.route.snapshot.data.order
    this.endpoint = environment.apiEndpoint
    if (this.order.promotionId) this.promotion = this.order.promotion
    
    if (this.order.oldProducts) this.calcDifferences()
  }

  async showShopInfo() {
    history.pushState('popup', '')
    let resp = this.dialog.open(ShopInfoDialogComponent, {
      width: '560px',
      data: { shop: this.order.shop }
    });
    await resp.afterClosed().toPromise()
    if (history.state === 'popup') history.back()
  }

  async cancelPickup() {
    if (!this.cancellationReason) return this._snackBar.open('Please select a cancellation reason', 'close', { duration: 2000 })
    if (!confirm('Are you sure you want to cancel your Sprink pickup?')) return
    let resp = await this.orderService.cancelOrder(this.order._id, this.cancellationReason)
    if (!resp) return
    await this.userService.getUser()
    this._snackBar.open('Pickup cancelled', undefined, { duration: 2500 })
    this.location.back()
  }

  calcDifferences() {
    this.productsChanged = []
    if (!['pickedup', 'atshop', 'delivered'].includes(this.order.status)) return

    this.order.products.forEach(prod => {
      let oldProd = this.order.oldProducts.find(p => p.productId === prod.productId && prod.unitTypeAmount === p.unitTypeAmount)
      if (!oldProd) this.productsChanged.push({ name: prod.productName, count: prod.count, unitType: prod.unitType, unitTypeAmount: prod.unitTypeAmount })
      else {
        let diff = prod.count - oldProd.count
        if (diff !== 0) this.productsChanged.push({ name: prod.productName, count: diff, unitType: prod.unitType, unitTypeAmount: prod.unitTypeAmount })
      }
    })

    this.order.oldProducts.forEach(prod => {
      let newProd = this.order.products.find(p => p.productId === prod.productId && prod.unitTypeAmount === p.unitTypeAmount)
      if (!newProd) this.productsChanged.push({ name: prod.productName, count: -prod.count, unitType: prod.unitType, unitTypeAmount: prod.unitTypeAmount })
    })
  }

}
