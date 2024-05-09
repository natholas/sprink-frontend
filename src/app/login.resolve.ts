import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { StateService } from './services/state.service';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginResolve implements Resolve<any> {
  constructor(private router: Router, private user: UserService, private state: StateService) { }

  async resolve() {
    let loggedIn = await this.user.checkLoggedIn()
    if (loggedIn) this.router.navigate([this.state.user.userType === 'admin' ? 'shop-admin' : 'dashboard'])
  }
}