import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';
import { ShopsService } from '../services/shops.service';
import { SuperAdminCampaignsService } from '../services/super-admin-campaigns.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminCampaignsResolve implements Resolve<any> {
  constructor(private router: Router, private state: StateService, private user: UserService, private campaigns: SuperAdminCampaignsService) { }

  async resolve() {
    await this.user.checkLoggedIn()
    if (!this.state.user || this.state.user.userType !== 'superadmin') this.router.navigate([''])
    else {
      let lists = (await this.campaigns.getLists()).data
      let templates = (await this.campaigns.getTemplates()).data
      return { lists, templates }
    }
  }
}