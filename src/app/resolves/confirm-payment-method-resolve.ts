import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { PaymentMethodsService } from '../services/payment-methods.service';
import { StateService } from '../services/state.service';
import { AnalyticsService } from '../services/analytics.service';

@Injectable({
  providedIn: 'root',
})
export class ConfirmPaymentMethodResolve implements Resolve<any> {
  constructor(private router: Router, private user: UserService, private paymentMethods: PaymentMethodsService, private analytics: AnalyticsService, private state: StateService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    let loggedIn = await this.user.checkLoggedIn()
    if (!loggedIn) this.router.navigate(['continue'])
    else {
      await this.paymentMethods.confirmPaymentMethod()
      setTimeout(() => this.analytics.addPaymentInfo(), 1000) // waiting for gtag to load
      await this.user.getUser()
      if (route.queryParams.returnUrl) {
        let returnUrl = decodeURIComponent(route.queryParams.returnUrl)
        this.router.navigate(returnUrl.split('/'))
      }
      else this.router.navigate(['settings', 'payment-methods'])
    }
  }
}