import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';
import { loadScript } from '../libs/load-script';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from './storage.service';

declare let Stripe: any

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {

  constructor(private http: HttpClient, private state: StateService, private snackBar: MatSnackBar, private storage: StorageService) { }

  async getPaymentMethods() {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/payment-methods', { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data.data.sort((a, b) => a.created > b.created ? 1 : -1)
  }

  async addPaymentMethod(returnPath: string = undefined) {
    let params = {
      successUrl: location.origin + '/confirm-payment-method',
      cancelUrl: location.href,
    }
    if (returnPath) params.successUrl += '?returnUrl=' + returnPath
    let resp = <any>await this.http.post(environment.apiEndpoint + '/setup-payment-method', params, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) {
      return this.snackBar.open(resp.error, 'close', { duration: 2000 })
    }

    this.storage.setLocal('stripeSessionId', resp.data.id)

    await loadScript('https://js.stripe.com/v3/')
    const stripe = Stripe(environment.stripeId)
    await stripe.redirectToCheckout({ sessionId: resp.data.id })

    return resp.data
  }

  async confirmPaymentMethod() {
    let sessionId = this.storage.getLocal('stripeSessionId')
    if (!sessionId) return console.error('No stripe session ID')
    let resp = <any>await this.http.post(environment.apiEndpoint + '/confirm-payment-method', { sessionId }, { headers: { Authorization: this.state.token } }).toPromise()
    if (resp.error && resp.error === 'CARD_ALREADY_EXISTS_ON_ACCOUNT') return { }
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async deletePaymentMethod(id: string) {
    return <any>await this.http.delete(environment.apiEndpoint + '/payment-method/' + id, { headers: { Authorization: this.state.token } }).toPromise()
  }

  async superAdminGetPaymentMethods(userId: string) {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/super-admin/payment-methods/' + userId, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data.data.sort((a, b) => a.created > b.created ? 1 : -1)
  }
}
