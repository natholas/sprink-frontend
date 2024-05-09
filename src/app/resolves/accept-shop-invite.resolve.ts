import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ShopInviteService } from '../services/shop-invite.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AcceptShopInviteResolve implements Resolve<any> {
  constructor(private router: Router, private invites: ShopInviteService, private snackBar: MatSnackBar) { }

  async resolve(route: ActivatedRouteSnapshot) {
    let id = route.params.id
    let token = route.queryParams.token
    let resp = await this.invites.acceptShopInvite(id, token)

    if (resp && resp.status) {
      this.snackBar.open('Invite accepted', 'close', { duration: 2000 })
      this.router.navigate(['continue'])
    } else {
      if (resp.error === 'INVITE_NOT_FOUND') resp.error = 'This invite is no longer available'
      this.snackBar.open(resp.error, 'close', { duration: 5000 })
      this.router.navigate(['404'])
    }
  }
}