import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayoutService } from 'src/app/services/payout.service';

@Component({
  selector: 'app-super-admin-do-shop-payout',
  templateUrl: './super-admin-do-shop-payout.component.html',
  styleUrls: ['./super-admin-do-shop-payout.component.scss']
})
export class SuperAdminDoShopPayoutComponent {

  shop: any
  payout: any
  payoutSettings: any
  confirming = false

  constructor(private route: ActivatedRoute, private payoutService: PayoutService, private router: Router) {
    this.shop = this.route.snapshot.data.payout[0]
    this.payout = this.route.snapshot.data.payout[1]
    this.payoutSettings = this.route.snapshot.data.payout[2]
  }

  async confirmPaid() {
    if (this.confirming) return
    if (!confirm('Are you sure you have completed this payment?')) return
    this.confirming = true
    await this.payoutService.superAdminMarkPayoutAsPaid(this.payout._id)
    this.router.navigate(['super-admin-shop-payouts'])
  }
  async cantDoPayment() {
    if (this.confirming) return
    if (!confirm('Are you sure? This will send an email to the shop to update their payout details')) return
    this.confirming = true
    await this.payoutService.superAdminMarkPayoutAsCantPay(this.payout._id)
    this.router.navigate(['super-admin-shop-payouts'])
  }

}
