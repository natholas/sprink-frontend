import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperAdminCampaignsService } from 'src/app/services/super-admin-campaigns.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-super-admin-campaigns',
  templateUrl: './super-admin-campaigns.component.html',
  styleUrls: ['./super-admin-campaigns.component.scss']
})
export class SuperAdminCampaignsComponent {

  templates
  lists
  sending = false
  data: any = { }
  campaignTag = ''
  subject = ''
  campaignType = 'individual'
  email = ''

  constructor(
    private route: ActivatedRoute,
    private campaigns: SuperAdminCampaignsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private storage: StorageService
  ) {
    this.templates = this.route.snapshot.data.data.templates
    this.lists = this.route.snapshot.data.data.lists
    let data = this.storage.getLocal('campaign-data-prefill')
    if (data) {
      this.subject = data.subject
      this.campaignTag = data.tag
    }
  }

  saveData() {
    this.storage.setLocal('campaign-data-prefill', { subject: this.subject, tag: this.campaignTag })
  }

  async sendCampaign() {
    if (this.sending) return
    if (this.campaignType === 'list' && !this.data.list) return
    if (this.campaignType === 'individual' && !this.email) return
    if (!this.data.template || !this.campaignTag) return
    if (!confirm('Are you sure?')) return
    this.sending = true
    if (this.campaignType === 'individual') {
      await this.campaigns.sendCampaignSingle(this.data.template, this.email, this.campaignTag, this.subject)
    } else {
      await this.campaigns.sendCampaign(this.data.template, this.data.list.id, this.campaignTag, this.subject)
    }
    this.snackBar.open('Campaign sent!', 'close', { duration: 2000 })
    this.router.navigate(['super-admin-dashboard'])
  }

}
