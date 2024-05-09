import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ConfirmEmailResolve implements Resolve<any> {
  constructor(private router: Router, private user: UserService, private snackBar: MatSnackBar) { }

  async resolve(route: ActivatedRouteSnapshot) {
    try {
      let resp = await this.user.confirmEmail(route.queryParams.email, route.queryParams.token)
      if (resp.error && resp.error !== 'ALREADY_VERIFIED') return resp.error
      await this.user.getUser(true)
      this.router.navigate(['dashboard'])
      this.snackBar.open('Email verified.', 'close', { duration: 5000 })
    } catch(e) {
      console.error(e)
      return false
    }
  }
}