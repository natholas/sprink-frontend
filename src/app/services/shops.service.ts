import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(private http: HttpClient, private state: StateService) { }

  public async getShops(lat = this.state.user.address.coordinates[0], lng = this.state.user.address.coordinates[1]) {
    let resp = <any>await this.http.get(`${environment.apiEndpoint}/shops/${lat}/${lng}`).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  public async getShop(shopId: string) {
    let resp = <any>await this.http.get(`${environment.apiEndpoint}/shop/${shopId}`).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  public async updateShop(shopId: string, data: any) {
    return <any>await this.http.put(`${environment.apiEndpoint}/shop/${shopId}`, data, { headers: { Authorization: this.state.token } }).toPromise()
  }

  public async superAdminGetShops() {
    let resp = <any>await this.http.get(`${environment.apiEndpoint}/super-admin/shops`, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  public async superAdminGetHiddenShops() {
    let resp = <any>await this.http.get(`${environment.apiEndpoint}/super-admin/hidden-shops`, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  public async superAdminApproveShop(shopId: string, density: string) {
    let resp = <any>await this.http.put(`${environment.apiEndpoint}/super-admin/shop-verification/approve/${shopId}`, { density }, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  public async superAdminRejectShop(shopId: string, rejectionReason: string) {
    let resp = <any>await this.http.put(`${environment.apiEndpoint}/super-admin/shop-verification/reject/${shopId}`, { rejectionReason }, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  public async getShopVerifications(shopId: string) {
    let resp = <any>await this.http.get(`${environment.apiEndpoint}/shop/shop-verifications/${shopId}`, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  public async putShopVerification(verificationId: string, params: any) {
    let resp = <any>await this.http.put(`${environment.apiEndpoint}/super-admin/shop-verifications/${verificationId}`, params, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  public async getShopCompanyHouse(id: string) {
    let resp = <any>await this.http.get(`${environment.apiEndpoint}/shop/get-company-house-data/${id}`, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }
}
