import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StateService } from '../../services/state.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.scss']
})
export class SecuritySettingsComponent {

  newPassword: string = ''
  repeatPassword: string = ''
  changingPassword = false
  user: any
  twoFactorAuthentication: boolean

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private state: StateService,
    public location: Location
  ) {
    this.user = this.state.user
    this.twoFactorAuthentication = this.user.twoFactorAuthentication
  }

  getPasswordStrength() {
    let strength = this.newPassword.replace(/[^\w\s]|(.)(?=\1)/gi, "").length * 2.5 // unique characters
    if (this.newPassword !== this.newPassword.toUpperCase()) strength *= 1.35 // lower case
    if (this.newPassword !== this.newPassword.toLowerCase()) strength *= 1.35 // upper case
    if (this.newPassword !== this.newPassword.replace(/[0-9]/gi, '')) strength *= 1.35 // numbers
    if (this.newPassword !== this.newPassword.replace(/[^A-Za-z0-9]/gi, '')) strength *= 1.35 // special characters
    if (strength > 100) strength = 100
    return strength
  }

  getPasswordIndicatorColor() {
    let strength = this.getPasswordStrength()
    if (strength > 0 && strength < 30) return 'warn'
    return 'primary'
  }

  async changePassword() {
    if (!this.newPassword) return
    if (this.newPassword !== this.repeatPassword) return this.snackBar.open('Password doesnt match', 'close', { duration: 2000 })
    if (this.getPasswordStrength() < 30) return this.snackBar.open('Password is too weak', 'close', {duration: 2000})
    this.changingPassword = true
    await this.userService.changePassword(this.newPassword)
    this.changingPassword = false
    await this.userService.getUser()
    this.location.back()
    this.snackBar.open('Password changed', 'close', { duration: 2500 });
  }

  async changeTwoFactorAuthentication() {
    await this.userService.updateUser({ twoFactorAuthentication: this.twoFactorAuthentication })
    await this.userService.getUser()
  }

}
