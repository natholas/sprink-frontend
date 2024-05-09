import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ReferralsResolve implements Resolve<any> {
  constructor(private user: UserService, private state: StateService) { }

  async resolve() {
    await this.user.checkLoggedIn()
    if (this.state.user) return await this.user.getReferrals()
  }
}