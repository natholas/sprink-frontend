import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class PayoutService {

  constructor(private http: HttpClient, private state: StateService) { }

  public async getPayoutSettings(shopId: string) {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/payout-settings/' + shopId, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return false
    return resp.data
  }

  public async postPayoutSettings(sortCode: string, accountNumber: string, payeeName: string, isPersonalAccount: boolean) {
    let resp = <any>await this.http.post(environment.apiEndpoint + '/payout-settings', { sortCode, accountNumber, payeeName, isPersonalAccount }, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return false
    return resp.data
  }

  public async getPayoutHistory(shopId: string) {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/payout-history/' + shopId, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return false
    return resp.data
  }

  public async getNextPayout(shopId: string) {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/next-payout/' + shopId, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return false
    return resp.data
  }

  public async superAdminGetShopsThatNeedPayout() {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/super-admin/payouts-needed', { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return false
    return resp.data
  }

  public async superAdminGetShopPayouts() {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/super-admin/payouts', { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return false
    return resp.data
  }

  public async superAdminGetPayout(payoutId: string) {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/super-admin/payout/' + payoutId, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return false
    return resp.data
  }

  public async superAdminCreatePayout(shopId: string) {
    let resp = <any>await this.http.post(environment.apiEndpoint + '/super-admin/payout/' + shopId, { }, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return false
    return resp.data
  }

  public async superAdminMarkPayoutAsPaid(payoutId: string) {
    let resp = <any>await this.http.put(environment.apiEndpoint + '/super-admin/payout/' + payoutId, { }, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return false
    return resp.data
  }

  public async superAdminMarkPayoutAsCantPay(payoutId: string) {
    let resp = <any>await this.http.put(environment.apiEndpoint + '/super-admin/cant-do-payout/' + payoutId, { }, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return false
    return resp.data
  }

  public async superAdminCancelPayout(payoutId: string) {
    let resp = <any>await this.http.delete(environment.apiEndpoint + '/super-admin/payout/' + payoutId, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return false
    return resp.data
  }
}
