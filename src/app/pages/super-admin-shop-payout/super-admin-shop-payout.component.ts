import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayoutService } from 'src/app/services/payout.service';

@Component({
  selector: 'app-super-admin-shop-payout',
  templateUrl: './super-admin-shop-payout.component.html',
  styleUrls: ['./super-admin-shop-payout.component.scss']
})
export class SuperAdminShopPayoutComponent {

  payout: any
  cancelling = false

  constructor(private route: ActivatedRoute, private payoutService: PayoutService, private router: Router) {
    this.payout = this.route.snapshot.data.payout
  }

  async cancelPayout() {
    if (this.cancelling) return
    if (!confirm('Are you sure you want to cancel this payout?')) return
    this.cancelling = true
    await this.payoutService.superAdminCancelPayout(this.payout._id)
    this.router.navigate(['super-admin-shop-payouts'])
  }

}
