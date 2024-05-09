import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UnsubscribeResolve implements Resolve<any> {
  constructor(private userService: UserService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    try {
      let token = route.queryParams.token
      return await this.userService.unsubscribe(token)
    } catch(err) {
      return {error: err}
    }
  }
}