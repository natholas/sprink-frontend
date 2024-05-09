import { Injectable } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { environment } from 'src/environments/environment'

declare let gtag

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) return
      gtag('config', environment.googleAnalyticsId, { 'page_path': event.urlAfterRedirects.split('?')[0] })
      this.facebookTrack('PageView')
    })
  }

  event(cat: string, action: string, label: string = undefined, value: number = undefined) {
    gtag('event', action, {
      'event_category': cat,
      'event_label': label,
      'value': value
    })
  }

  postCodeSearch(result: string, postcode: string) {
    this.event('post-code-search', result, postcode)
    this.facebookTrack('FindLocation')
  }

  addPaymentInfo() {
    this.event('ecommerce', 'add_payment_info')
    this.facebookTrack('AddPaymentInfo')
  }

  continueToOverview() {
    this.event('ecommerce', 'continue_to_overview')
  }

  addToCart(product: string) {
    gtag('event', 'add_to_cart', {event_action: product})
    this.facebookTrack('AddToCart')
  }

  removeFromCart(product: string) {
    gtag('event', 'remove_from_cart', {event_action: product})
  }

  beginCheckout(promotion: string, shopId: string) {
    gtag('event', 'begin_checkout', { event_action: promotion, event_label: shopId })
    this.facebookTrack('InitiateCheckout')
  }

  login(method: string) {
    gtag('event', 'login', { method })
  }

  signup(method: string) {
    gtag('event', 'signup', { method })
  }

  shopSignup() {
    gtag('event', 'shop-signup')
  }

  purchase(value: number) {
    this.event('ecommerce', 'order', undefined, value)
    this.facebookTrack('Purchase', value)
  }

  facebookTrack(string, value = undefined) {
    if (!window['fbq']) return
    if (value) window['fbq']('track', string, { value: value, currency: 'GBP'});
    else window['fbq']('track', string);
  }
}
