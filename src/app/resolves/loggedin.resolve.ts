import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInResolve implements Resolve<any> {
  constructor(private router: Router, private user: UserService, private state: StateService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    let onPersonalDetailsPage = route.routeConfig.path === 'settings/personal-details'
    let nextNeededStep = await this.user.getNextStep(onPersonalDetailsPage ? 'personal-details' : undefined)
    if (nextNeededStep) this.router.navigate(nextNeededStep.path, { queryParams: nextNeededStep.queryParams })
  }
}