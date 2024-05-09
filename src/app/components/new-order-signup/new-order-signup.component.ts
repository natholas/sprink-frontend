import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { randomString } from 'src/app/libs/random-string';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { StateService } from 'src/app/services/state.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-order-signup',
  templateUrl: './new-order-signup.component.html',
  styleUrls: ['./new-order-signup.component.scss']
})
export class NewOrderSignupComponent {

  loading = false
  email = ''

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<NewOrderSignupComponent>,
    private userService: UserService,
    private http: HttpClient,
    private state: StateService,
    private analytics: AnalyticsService,
    private storage: StorageService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  async submitForm(form: NgForm) {
    if (!form.valid) return
    let password = randomString(16)
    this.loading = true

    let resp = <any>await this.http.post(environment.apiEndpoint + '/signup', { email: this.email, password, referralCode: this.state.referralCode }).toPromise()
    if (resp && resp.status) {

      // doing login call
      let loginResp = <any>await this.http.post(environment.apiEndpoint + '/login/email', { email: this.email, password }).toPromise()
      if (loginResp && loginResp.status) {
        this.analytics.signup('sprink')
        this.state.token = loginResp.data.token
        this.state.loggedIn = true
        this.storage.setLocal('token', this.state.token)
        await this.userService.getUser()
        await this.userService.initSession()
        this.bottomSheetRef.dismiss(true)
      } else {
        this.loading = false
        this.snackBar.open(resp.error, 'close', { duration: 2000 });
      }
    } else {
      if (resp.error === 'ALREADY_EXISTS') {
        this.bottomSheetRef.dismiss()
        this.analytics.continueToOverview()
        this.router.navigate(['continue'], { queryParams: { cm: 'true' } })
      } else {
        this.loading = false
        this.snackBar.open(resp.error, 'close', { duration: 2000 });
      }
    }
  }

}
