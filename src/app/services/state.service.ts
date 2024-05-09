import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  loggedIn = false
  token: string
  sessionId: string
  acquisitionSource: string
  user: any
  order: any
  shopId: string
  nextUrl: string
  promoCode: string
  autoNewOrder: boolean
  promotion: any
  referralCode: string
  twoFactorToken: string
  constructor(private storage: StorageService) {
    this.promoCode = this.storage.getLocal('promoCode')
    this.autoNewOrder = this.storage.getLocal('autoNewOrder')
  }

  setPromoCode(promoCode) {
    this.promoCode = promoCode
    this.storage.setLocal('promoCode', promoCode)
  }

  setAutoNewOrder() {
    this.autoNewOrder = true
    this.storage.setLocal('autoNewOrder', true)
  }
  
  unsetAutoNewOrder() {
    this.autoNewOrder = false
    this.storage.remove('autoNewOrder')
  }
}
