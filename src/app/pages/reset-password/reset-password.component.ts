import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  password: string
  email: string
  token: string
  loading = false

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    this.email = this.route.snapshot.queryParams.email
    this.token = this.route.snapshot.queryParams.token
  }

  ngOnInit() {
  }

  async submitForm(form: NgForm) {
    if (!form.valid || this.loading) return
    this.loading = true
    let resp = <any>await this.http.post(environment.apiEndpoint + '/reset-password', { token: this.token, email: this.email, password: this.password }).toPromise()
    if (resp.status) {
      this.router.navigate(['continue'], {queryParams: { email: this.email }})
      this.snackBar.open('Password changed', 'close', { duration: 2000 });
    } else {
      this.loading = false
      this.snackBar.open(resp.error, 'close', { duration: 2000 });
    }
  }

}
