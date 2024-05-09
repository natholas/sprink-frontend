import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopInviteService {

  constructor(private http: HttpClient, private state: StateService) { }

  async acceptShopInvite(id: string, token: string) {
    return <any>await this.http.post(`${environment.apiEndpoint}/shop-invite/accent-shop-invite/${id}`, { token }).toPromise()
  }

  public async getShopInvites(shopId: string) {
    let resp = <any>await this.http.get(`${environment.apiEndpoint}/shop-invite/invites/${shopId}`, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  public async inviteToShop(email: string, password: string) {
    return <any>await this.http.post(`${environment.apiEndpoint}/shop-invite/invite/${this.state.user.shopId}`, { email, password }, { headers: { Authorization: this.state.token } }).toPromise()
  }
  
  public async deleteShopInvite(id: string) {
    return <any>await this.http.delete(`${environment.apiEndpoint}/shop-invite/invite/${id}`, { headers: { Authorization: this.state.token } }).toPromise()
  }

  public async leaveShop() {
    return <any>await this.http.delete(`${environment.apiEndpoint}/shop-invite/invite`, { headers: { Authorization: this.state.token } }).toPromise()
  }
}
