import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string
  password: string
  loading = false

  constructor(
    private state: StateService,
    private router: Router,
    private user: UserService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private analytics: AnalyticsService
  ) {
    this.email = this.route.snapshot.queryParams.email
  }

  async submitForm(event: NgForm) {
    if (!event.form.valid) return
    this.loading = true
    let resp = await this.user.login(this.email, this.password)
    if (resp && resp.status && !resp.data.codeSent) {
      this.analytics.login('sprink')
      if (this.route.snapshot.queryParams.returnUrl) {
        this.router.navigate(this.route.snapshot.queryParams.returnUrl)
      } else {
        this.router.navigate([this.state.user.userType === 'admin' ? 'shop-admin' : 'dashboard'])
      }
    } else if (!resp || !resp.data || !resp.data.codeSent) {
      this.loading = false
      let error = resp.error
      if (error === 'NOT_FOUND') error = 'Email or password is not correct'
      this.snackBar.open(error, 'close', { duration: 2000 });
    }
  }

  socialLogin(type: string) {
    alert(type + ' login is not available yet')
  }

}
