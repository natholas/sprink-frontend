import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  loading = false
  success = false

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    public state: StateService
  ) { }

  ngOnInit() {
  }

  async sendAgain() {
    this.loading = true
    let resp = await this.userService.resendVerificationEmail(this.state.user.email)
    this.loading = false
    if (resp && resp.status) this.success = true
    else if (resp.error === 'ALREADY_VERIFIED') location.reload()
    let message = resp ? 'Email sent' : 'An error occured, please try again later'
    this.snackBar.open(message, 'close', { duration: 10000 })
  }

}
