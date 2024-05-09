import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-super-admin-user',
  templateUrl: './super-admin-user.component.html',
  styleUrls: ['./super-admin-user.component.scss']
})
export class SuperAdminUserComponent {

  user
  shop
  paymentMethods
  orders

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private userService: UserService) {
    this.user = this.route.snapshot.data.data.user
    this.shop = this.route.snapshot.data.data.shop
    this.paymentMethods = this.route.snapshot.data.data.paymentMethods
    this.orders = this.route.snapshot.data.data.orders
  }

  async makeSuperAdmin() {
    if (!confirm('Are you sure you want to give this MOFO the ultimate powa?')) return
    if (prompt('what is the answer to life the universe and everything?') !== '42') return this.snackBar.open('How do you not know this?', 'close', { duration: 3000 })
    await this.userService.makeSuperAdmin(this.user._id)
    window.location.reload()
  }

  async unMakeSuperAdmin() {
    if (!confirm('Are you sure you want to unGOD this super admin?')) return
    if (prompt('what is the answer to life the universe and everything?') !== '42') return this.snackBar.open('How do you not know this?', 'close', { duration: 3000 })
    await this.userService.unMakeSuperAdmin(this.user._id)
    window.location.reload()
  }

}
