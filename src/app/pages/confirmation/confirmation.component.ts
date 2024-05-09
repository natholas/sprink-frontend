import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { getPickupEndDate } from 'src/app/libs/get-pickup-end-date';
import { paddTo } from 'src/app/libs/padd-to';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

  order: any
  sprinkCreditOnUse

  constructor(private route: ActivatedRoute) {
    this.order = this.route.snapshot.data.order
    this.sprinkCreditOnUse = this.route.snapshot.queryParams.scm
  }

  getRunEndTime(time: string) {
    let date = moment(time)
    date.tz(moment.tz.guess())
    return getPickupEndDate(paddTo(date.get('hours').toString(), 2) + '-' + paddTo(date.get('minutes').toString(), 2), this.order.sprinkRunDuration)
  }

}
