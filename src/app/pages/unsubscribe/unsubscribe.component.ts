import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent {

  success = false
  error = false
  alreadyUnsubscribed = false

  constructor(private route: ActivatedRoute) {
    let resp = this.route.snapshot.data.resp
    if (resp.status) this.success = true
    else if (resp.error === 'ALREADY_UNSUBSCRIBED') this.alreadyUnsubscribed = true
    else this.error = true
  }

}
