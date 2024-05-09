import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent {

  referrals: any[]
  referralLink: string
  referralLinkNoProtocol: string
  doneReferrals: number
  @ViewChild('referralInput') referralInput: ElementRef

  constructor(private route: ActivatedRoute, public state: StateService, private snackBar: MatSnackBar, public userService: UserService) {
    this.referrals = this.route.snapshot.data.referrals
    this.referralLink = location.origin + '/c?ref=' + this.state.user.referralCode    
    this.referralLinkNoProtocol = this.referralLink.split('https://')[1]
    this.doneReferrals = this.referrals.filter(r => r.status === 'order-completed').length
  }

  tryShareLink() {
    if (navigator['share']) {
      navigator['share']({
        title: 'Sprink',
        url: this.referralLink,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => {
        console.log('Error sharing', error)
        this.copyReferralLink()
      });
    } else this.copyReferralLink()
  }

  copyReferralLink() {
    this.referralInput.nativeElement
    this.referralInput.nativeElement.select();
    this.referralInput.nativeElement.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    this.snackBar.open('Copied to clipboard', undefined, { duration: 2000 })
  }

  getStatusText(status: string) {
    if (status === 'accepted') return 'Account created'
    if (status === 'order-created') return 'Order placed'
    if (status === 'order-completed') return 'Done!'
  }

}
