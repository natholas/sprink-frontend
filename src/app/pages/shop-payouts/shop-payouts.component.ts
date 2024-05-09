import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PayoutDetailsDialogComponent } from 'src/app/payout-details-dialog/payout-details-dialog.component';

@Component({
  selector: 'app-shop-payouts',
  templateUrl: './shop-payouts.component.html',
  styleUrls: ['./shop-payouts.component.scss']
})
export class ShopPayoutsComponent {

  history: any[]
  next: any
  nextAmount: any
  shop: any

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.history = this.route.snapshot.data.data[0]
    this.next = this.route.snapshot.data.data[1]
    this.nextAmount = this.next.totalShopRevenue
    this.shop = this.route.snapshot.data.data[2]
  }

  async showPayoutDetails(payout: any) {
    history.pushState('popup', '')
    let resp = this.dialog.open(PayoutDetailsDialogComponent, {
      width: '560px',
      data: { payout, shop: this.shop }
    })
    await resp.afterClosed().toPromise()
  }

}
