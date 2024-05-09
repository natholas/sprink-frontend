import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyEmailResolve implements Resolve<any> {
  constructor(private router: Router, private user: UserService, private state: StateService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    let onVerifyEmailPage = route.routeConfig.path === 'verify-email'
    let nextNeededStep = await this.user.getNextStep(onVerifyEmailPage ? 'verify-email' : undefined)
    if (nextNeededStep) this.router.navigate(nextNeededStep.path, { queryParams: nextNeededStep.queryParams })
    else if (this.state.user.isVerified) this.router.navigate(['dashboard'])
  }
}