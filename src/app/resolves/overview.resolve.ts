import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { StateService } from '../services/state.service';
import { PaymentMethodsService } from '../services/payment-methods.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class OverviewResolve implements Resolve<any> {
  constructor(private state: StateService, private user: UserService, private router: Router, private paymentMethodsService: PaymentMethodsService, private storage: StorageService) { }

  async resolve() {
    let nextNeededStep = await this.user.getNextStep('overview')
    if (nextNeededStep) this.router.navigate(nextNeededStep.path, { queryParams: nextNeededStep.queryParams })
    else {
      let paymentMethods = await this.paymentMethodsService.getPaymentMethods()
      
      if (this.state.order) return { order: this.state.order, paymentMethods }
      let order = this.storage.getLocal('order')
      if (order) {
        this.state.order = order
        return { order, paymentMethods }
      }
      this.router.navigate(['new-order'])
    }
  }
}