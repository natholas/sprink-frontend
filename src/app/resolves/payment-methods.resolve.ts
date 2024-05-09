import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';
import { PaymentMethodsService } from '../services/payment-methods.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodsResolve implements Resolve<any> {
  constructor(private router: Router, private user: UserService, private state: StateService, private paymentMethods: PaymentMethodsService) { }

  async resolve() {
    let nextNeededStep = await this.user.getNextStep()
    if (nextNeededStep) this.router.navigate(nextNeededStep.path, { queryParams: nextNeededStep.queryParams })
    else return await this.paymentMethods.getPaymentMethods()
  }
}