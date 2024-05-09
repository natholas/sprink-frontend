import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PayoutDetailsDialogComponent } from 'src/app/payout-details-dialog/payout-details-dialog.component';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-payouts-explained',
  templateUrl: './payouts-explained.component.html',
  styleUrls: ['./payouts-explained.component.scss']
})
export class PayoutsExplainedComponent {
  
  amount = 5250

  constructor(private dialog: MatDialog, private analytics: AnalyticsService) { }

  scrollToSignup() {
    document.getElementById('sign-up').scrollIntoView({behavior: 'smooth'})
  }

  async showPayoutDetails(amount: number) {
    this.analytics.event('payout-calculator', 'open', amount.toString())
    let total = amount * 100
    let totalStripeFees = total * 0.025
    let totalVat = (total - totalStripeFees) / 5
    let totalSprinkCut = (total - totalStripeFees - totalVat) * 0.09
    let totalShopRevenue = total - totalStripeFees - totalVat - totalSprinkCut
    history.pushState('popup', '')
    let resp = this.dialog.open(PayoutDetailsDialogComponent, {
      width: '560px',
      data: {
        payout: {
          total, totalStripeFees,
          totalVat, totalSprinkCut,
          totalShopRevenue
        },
        shop: { currency: 'GBP'}
      }
    })
    await resp.afterClosed().toPromise()
  }

}
