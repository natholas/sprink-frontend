import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  error: string
  success = false

  constructor(private route: ActivatedRoute) {
    let resp = this.route.snapshot.data.confirmed
    if (typeof resp === 'string') this.error = resp
    else this.success = true
  }

  ngOnInit() {
  }

}
