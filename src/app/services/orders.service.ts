import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { environment } from 'src/environments/environment';
import { loadScript } from '../libs/load-script';

declare let Stripe: any

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient, private state: StateService) {}

  async confirmPayment() {
    await loadScript('https://js.stripe.com/v3/')
    const stripe = Stripe(environment.stripeId)

    let params = {
      shopId: this.state.order.shop._id,
      paymentMethod: this.state.order.paymentMethod,
      total: Math.round(this.state.order.total),
      pickupTime: this.state.order.pickupTime,
      allowDropOffAtDoor: this.state.order.allowDropOffAtDoor,
      deliveryTime: this.state.order.deliveryTime,
      customMessage: this.state.order.customText,
      promotionId: this.state.order.promotionId,
      products: this.state.order.cart.map(item => ({
        id: item.product._id, count: item.count, amount: item.amount
      }))
    }
    let resp = <any>await this.http.post(environment.apiEndpoint + '/order', params, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp || !resp.data) return resp
    
    if (resp.data.nextAction) {
      let stripeResp = await stripe.confirmCardPayment(resp.data.clientSecret)
      if (stripeResp.error) {
        if (stripeResp.error.code === 'payment_intent_authentication_failure') {
          stripeResp.error.message = ''
        }
        return { error: stripeResp.error.message }
      }
    }

    let _resp = <any>await this.http.post(environment.apiEndpoint + '/confirm-order/' + resp.data.orderId, { }, { headers: { Authorization: this.state.token } }).toPromise()
    if (resp && resp.status) this.state.promotion = undefined
    return _resp
  }

  async getOrder(orderId: string) {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/order/' + orderId, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async getOrders(statusList: string[]) {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/orders/' + statusList.join('-'), { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async getShopOrders(shopId: string, statusList: string[] = undefined) {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/shoporders/' + shopId + (statusList ? '/' + statusList.join('-') : ''), { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async updateOrderProducts(orderId: string, params: any) {
    return <any>await this.http.put(environment.apiEndpoint + '/orderproducts/' + orderId, params, { headers: { Authorization: this.state.token } }).toPromise()
  }

  async updateOrderStatus(orderId: string, status: string, image: string = undefined) {
    let params: any = { status }
    if (image) params.image = image
    return <any>await this.http.put(environment.apiEndpoint + '/orderstatus/' + orderId, params, { headers: { Authorization: this.state.token } }).toPromise()
  }

  async cancelOrder(orderId: string, cancellationReason: string) {
    let params: any = { status: 'cancelled', cancellationReason }
    let resp = <any>await this.http.put(environment.apiEndpoint + '/orderstatus/' + orderId, params, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async updateShopOrderComment(orderId: string, comment: string) {
    let params = { shopComment: comment }
    let resp = <any>await this.http.put(environment.apiEndpoint + '/ordershopcomment/' + orderId, params, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async refundOrder(orderId: string, refundAmount: Number) {
    let resp = <any>await this.http.put(environment.apiEndpoint + '/refund-order/' + orderId, { refundAmount }, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return true
  }

  async superAdminGetOrders(statusList: string[]) {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/super-admin/orders/' + statusList.join('-'), { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async getPromotionById(id: string) {
    let options = this.state.user ? { headers: { Authorization: this.state.token } } : undefined
    let resp = <any>await this.http.get(environment.apiEndpoint + '/promotion-by-id/' + id, options).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async superAdminGetPromotions() {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/super-admin/promotions', { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async superAdminPostPromotion(promo: any) {
    let resp = <any>await this.http.post(environment.apiEndpoint + '/promotion', promo, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async superAdminPutPromotion(id: string, params: any) {
    let resp = <any>await this.http.put(environment.apiEndpoint + '/promotion/' + id, params, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }
  
  async superAdminDeletePromotion(id: string) {
    let resp = <any>await this.http.delete(environment.apiEndpoint + '/promotion/' + id, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }
}
