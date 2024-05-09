import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PayoutService } from 'src/app/services/payout.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-shop-payout-settings',
  templateUrl: './shop-payout-settings.component.html',
  styleUrls: ['./shop-payout-settings.component.scss']
})
export class ShopPayoutSettingsComponent {

  shop: any
  payoutSettings: any
  submitting = false
  saved = false
  sortCode: string
  accountNumber: string
  payeeName: string
  isPersonalAccount = false

  constructor(private route: ActivatedRoute, private payoutService: PayoutService, private router: Router, private snackBar: MatSnackBar, private state: StateService) {
    this.shop = this.route.snapshot.data.shop
    this.payoutSettings = this.route.snapshot.data.payoutSettings
    if (this.payoutSettings) {
      this.sortCode = this.payoutSettings.sortCode
      this.accountNumber = this.payoutSettings.accountNumber
      this.payeeName = this.payoutSettings.payeeName
      this.isPersonalAccount = this.payoutSettings.isPersonalAccount
    }
  }

  editSortCode() {
    if (this.sortCode.length === 2 || this.sortCode.length === 5) {
      this.sortCode += '-'
    }
  }

  async submitForm(form: NgForm) {
    if (!form.valid) return
    if (this.submitting) return
    if (this.payoutSettings) {
      if (this.sortCode === this.payoutSettings.sortCode && this.accountNumber === this.payoutSettings.accountNumber && this.payeeName === this.payoutSettings.payeeName && this.isPersonalAccount === this.payoutSettings.isPersonalAccount) {
        this.snackBar.open('Saved', 'close', { duration: 2000 })
        return this.router.navigate(['shop-settings', this.shop._id])
      }
    }
    this.submitting = true
    await this.payoutService.postPayoutSettings(this.sortCode, this.accountNumber, this.payeeName, this.isPersonalAccount)
    this.snackBar.open('Saved', 'close', { duration: 2000 })
    this.saved = true
    this.router.navigate(['shop-settings', this.shop._id])
  }

  canDeactivate() {
    if (!this.state.user) return true
    if (this.saved) return true
    let changed = false
    if (this.payoutSettings) {
      if (this.sortCode !== this.payoutSettings.sortCode) changed = false
      if (this.accountNumber !== this.payoutSettings.accountNumber) changed = false
      if (this.payeeName !== this.payoutSettings.payeeName) changed = false
      if (this.isPersonalAccount !== this.payoutSettings.isPersonalAccount) changed = false
    } else changed = !!(this.sortCode || this.accountNumber || this.payeeName || this.isPersonalAccount)
    if (changed) return confirm('Are you sure you want to leave without saving?')
    return true
  }

}
