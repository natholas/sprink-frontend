import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnalyticsService } from '../../services/analytics.service';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  email: string
  password: string = ''
  repeatPassword: string = ''
  loading = false

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private state: StateService,
    private analytics: AnalyticsService,
    private userService: UserService,
    private storage: StorageService
  ) { }

  async submitForm(event: NgForm) {
    if (this.getPasswordStrength() < 30) return this.snackBar.open('Please choose a different password', 'close', { duration: 2000 });
    if (!event.form.valid) return
    if (this.password !== this.repeatPassword) return this.snackBar.open('Password doesnt match', 'close', { duration: 2000 });
    this.loading = true
    // doing signup call
    let resp = <any>await this.http.post(environment.apiEndpoint + '/signup', { email: this.email, password: this.password, referralCode: this.state.referralCode }).toPromise()
    if (resp && resp.status) {

      // doing login call
      let loginResp = <any>await this.http.post(environment.apiEndpoint + '/login/email', { email: this.email, password: this.password }).toPromise()
      if (loginResp && loginResp.status) {
        this.analytics.signup('sprink')
        this.state.token = loginResp.data.token
        this.state.loggedIn = true
        this.storage.setLocal('token', this.state.token)
        await this.userService.initSession()
        this.snackBar.open('Account created!', 'close', { duration: 2000 });
        this.router.navigate(['dashboard'], { queryParams: { isNew: 'true' } })
      } else {
        this.loading = false
        this.snackBar.open(resp.error, 'close', { duration: 2000 });
      }
    } else {
      this.loading = false
      let error = resp.error
      if (error === 'ALREADY_EXISTS') error = 'You already have an account.'
      this.snackBar.open(error, 'close', { duration: 2000 });
    }
  }

  getPasswordStrength() {
    let strength = this.password.replace(/[^\w\s]|(.)(?=\1)/gi, "").length * 2.5 // unique characters
    if (this.password !== this.password.toUpperCase()) strength *= 1.35 // lower case
    if (this.password !== this.password.toLowerCase()) strength *= 1.35 // upper case
    if (this.password !== this.password.replace(/[0-9]/gi, '')) strength *= 1.35 // numbers
    if (this.password !== this.password.replace(/[^A-Za-z0-9]/gi, '')) strength *= 1.35 // special characters
    if (strength > 100) strength = 100
    return strength
  }

  getPasswordIndicatorColor() {
    let strength = this.getPasswordStrength()
    if (strength > 0 && strength < 30) return 'warn'
    return 'primary'
  }

}
