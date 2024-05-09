import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AnalyticsService } from '../../services/analytics.service';
import { StateService } from '../../services/state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-two-factor-code-entry',
  templateUrl: './two-factor-code-entry.component.html',
  styleUrls: ['./two-factor-code-entry.component.scss']
})
export class TwoFactorCodeEntryComponent {

  code = ''
  checkingCode = false

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private analytics: AnalyticsService,
    private state: StateService,
    private router: Router,
    private snackBar: MatSnackBar,
    public location: Location
  ) { }

  codeChange() {
    if (this.code.length === 4) this.code += '-'
    if (this.code.length === 9) this.checkCode()
  }

  async checkCode(form: NgForm = undefined) {
    if (form && !form.valid) return
    if (this.checkingCode) return
    this.checkingCode = true
    let resp = await this.userService.check2FactorCode(this.route.snapshot.params.token, this.code)
    if (resp && resp.status) {
      this.analytics.login('2Factor')
      this.router.navigate([this.state.user.userType === 'admin' ? 'shop-admin' : 'dashboard'])
    } else {
      this.checkingCode = false
      let error = resp.error
      if (error === 'WRONG_CODE') error = 'The code is not correct'
      if (error === 'WRONG_CODE_MAX_TRIES_REACHED') {
        error = 'Max tries reached. Please login again.'
        this.location.back()
      }
      this.snackBar.open(error, 'close', { duration: 2000 });
    }
  }

}
