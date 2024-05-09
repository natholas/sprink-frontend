import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';
import { copy } from 'src/app/libs/copy';
import { download } from 'src/app/libs/download';
import { OrdersService } from 'src/app/services/orders.service';
import { PaymentMethodsService } from 'src/app/services/payment-methods.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss']
})
export class GdprComponent {

  downloadType = 'json'
  email = ''
  downloading = false
  deleting = false

  constructor(
    public state: StateService,
    public userService: UserService,
    private orderService: OrdersService,
    private paymentMethodsService: PaymentMethodsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  toggleAdvertising() {
    this.userService.updateUser({ allowAdvertising: this.state.user.allowAdvertising })
  }

  async downloadAll() {
    this.downloading = true
    let data: any = { user: copy(this.state.user) }
    delete data.user.notificationSubscriptions
    delete data.user.twoFactorCode
    delete data.user.twoFactorToken
    delete data.user.twoFactorTries
    
    data.orders = await this.orderService.getOrders(['initial', 'ready', 'pickedup', 'delivered', 'atshop', 'error', 'cancelled'])
    data.paymentMethods = await this.paymentMethodsService.getPaymentMethods()
    
    if (this.downloadType === 'json') this.downloadJson(data)
    
    this.downloading = true
  }

  downloadJson(data: any) {
    download('sprink-data_' + this.state.user._id + '.json', JSON.stringify(data, null, 2))
  }

  async deletePersonalDetails() {
    if (!confirm('Are you sure you want us to delete all of your personal details? You will not be able to login to your account anymore.')) return
    this.deleting = true
    let resp = await this.userService.deletePersonalData()
    if (resp && resp.error) {
      this.deleting = false
      this.snackBar.open(resp.error, 'close', { duration: 2000 })
    }
    else if (resp) {
      this.snackBar.open('Your personal data has been deleted.', 'close', { duration: 2000 })
      this.router.navigate([''])
      this.userService.logout()
    }
  }

}
