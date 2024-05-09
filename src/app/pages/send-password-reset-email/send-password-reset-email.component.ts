import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-send-password-reset-email',
  templateUrl: './send-password-reset-email.component.html',
  styleUrls: ['./send-password-reset-email.component.scss']
})
export class SendPasswordResetEmailComponent implements OnInit {

  email: string
  loading = false
  sucess = false
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private snackBar: MatSnackBar) {
    this.email = this.route.snapshot.queryParams.email
  }

  ngOnInit() {
  }

  async submitForm(form: NgForm) {
    if (!form.valid || this.loading) return
    this.loading = true
    let resp = <any>await this.http.post(environment.apiEndpoint + '/send-password-reset-email', { email: this.email }).toPromise()
    this.loading = false
    if (resp.status) this.sucess = true
    else this.snackBar.open(resp.error, 'close', { duration: 2000 })
  }

}
