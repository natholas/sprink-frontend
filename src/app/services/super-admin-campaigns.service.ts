import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminCampaignsService {
  constructor(
    private http: HttpClient,
    private state: StateService
  ) { }

  public async getLists() {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/super-admin/campaigns/lists', { headers: { Authorization: this.state.token } }).toPromise()
    return resp
  }

  public async getTemplates() {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/super-admin/campaigns/templates', { headers: { Authorization: this.state.token } }).toPromise()
    return resp
  }

  public async sendCampaign(template: string, listId: string, campaignTag: string, subject: string) {
    let resp = <any>await this.http.post(environment.apiEndpoint + '/super-admin/campaigns/send', { template, listId, campaignTag, subject }, { headers: { Authorization: this.state.token } }).toPromise()
    return resp
  }
  public async sendCampaignSingle(template: string, email: string, campaignTag: string, subject: string) {
    let resp = <any>await this.http.post(environment.apiEndpoint + '/super-admin/campaigns/send-single', { template, email, campaignTag, subject }, { headers: { Authorization: this.state.token } }).toPromise()
    return resp
  }
}
