import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminDashboardResolve implements Resolve<any> {
  constructor(private router: Router, private state: StateService, private user: UserService) { }

  async resolve() {
    await this.user.checkLoggedIn()
    if (!this.state.user || this.state.user.userType !== 'superadmin') this.router.navigate([''])
  }
}