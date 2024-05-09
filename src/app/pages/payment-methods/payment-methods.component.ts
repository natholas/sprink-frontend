import { Component } from '@angular/core';
import { PaymentMethodsService } from '../../services/payment-methods.service';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../services/state.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent {

  rawPaymentMethods: any[]
  paymentMethods: any[]
  primary: any

  constructor(private paymentMethodsService: PaymentMethodsService, private route: ActivatedRoute, private state: StateService, private user: UserService, private snackBar: MatSnackBar) {
    this.rawPaymentMethods = this.route.snapshot.data.paymentMethods
    this.init()
  }

  init() {
    this.primary = this.rawPaymentMethods.find(pm => pm.id === this.state.user.primaryPaymentMethod) || this.rawPaymentMethods[this.rawPaymentMethods.length - 1]
    if (this.primary) {
      this.primary.isPrimary = true
    }
    this.paymentMethods = this.rawPaymentMethods
  }

  async addPaymentMethod() {
    this.paymentMethodsService.addPaymentMethod()
  }

  async makePrimary(paymentMethod) {
    await this.user.updateUser({ primaryPaymentMethod: paymentMethod.id })
    await this.user.getUser()
    this.init()
  }

  async deletePaymentMethod(paymentMethod) {
    let resp = await this.paymentMethodsService.deletePaymentMethod(paymentMethod.id)
    if (resp.error) {
      if (resp.error === 'PAYMENT_METHOD_USED_ON_ACTIVE_ORDER') {
        resp.error = 'There is an active order with this payment method. Please wait for it to be completed.'
      }
      this.snackBar.open(resp.error, 'close', { duration: 2000 })
    } else {
      this.rawPaymentMethods.splice(this.rawPaymentMethods.indexOf(paymentMethod), 1)
      this.init()
    }
  }

}
