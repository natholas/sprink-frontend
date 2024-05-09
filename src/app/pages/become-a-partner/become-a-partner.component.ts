import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-become-a-partner',
  templateUrl: './become-a-partner.component.html',
  styleUrls: ['./become-a-partner.component.scss']
})
export class BecomeAPartnerComponent {

  activationFeeDiscountPercent = 100 //50
  constructor(private route: ActivatedRoute) {
    // let code = this.route.snapshot.params.code
    // if (code && code === 'invited') this.activationFeeDiscountPercent = 100
  }

  scrollToSignup() {
    document.getElementById('sign-up').scrollIntoView({ behavior: 'smooth' })
  }

}
