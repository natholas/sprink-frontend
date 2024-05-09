import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { StateService } from '../../services/state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.scss']
})
export class ContinueComponent implements OnInit {

  loading = false
  checkoutMode: boolean

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private state: StateService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private analytics: AnalyticsService,
  ) {
    this.checkoutMode = !!this.route.snapshot.queryParams.cm
  }

  async ngOnInit() {
    if (location.pathname !== '/facebook-login-redirect') return
    let accessToken = this.route.snapshot.fragment.split('access_token=')[1]
    if (accessToken) accessToken = accessToken.split('&')[0]
    if (accessToken) {
      this.loading = true
      try {
        let resp = await this.userService.continueWithFacebook({ accessToken })
        this.handlePostSocialLogin(resp, 'facebook')
      } catch(err) {
        this.loading = false
        this.snackBar.open(err || 'An error occurred while checking facebook token', 'close', { duration: 5000 })
      }
    }
    else if (this.route.snapshot.queryParams.error_message) {
      this.snackBar.open(this.route.snapshot.queryParams.error_message, 'close', { duration: 5000 })
    }
  }

  async signInWithGoogle() {
    let user: SocialUser
    this.loading = true
    try {
      user = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      let resp = await this.userService.continueWithGoogle(user)
      this.handlePostSocialLogin(resp, 'google')
    } catch(err) {
      this.loading = false
      this.snackBar.open(err, 'close', { duration: 5000 })
    }
  }

  async signInWithFB() {
    this.loading = true
    location.href = `https://www.facebook.com/v6.0/dialog/oauth?client_id=593787504811935&response_type=token&redirect_uri=${location.origin}/facebook-login-redirect&state=123&scope=email`
  }

  handlePostSocialLogin(resp: any, type: string) {
    if (resp && resp.data && resp.data.codeSent) return
    if (!resp || !resp.status) {
      this.loading = false
      return this.snackBar.open(resp.error, 'close', { duration: 2500 })
    }
    if (resp.newCustomer) this.analytics.signup(type)
    else this.analytics.login(type)
    this.router.navigate([this.state.user.userType === 'admin' ? 'shop-admin' : 'dashboard'])
  }

}
