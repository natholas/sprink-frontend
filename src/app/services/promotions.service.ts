import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private state: StateService, private http: HttpClient, private userService: UserService) { }

  async getPromo() {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/my-promotion', this.state.user ? { headers: { Authorization: this.state.token } } : { }).toPromise()
    if (resp && resp.data) return resp.data
  }

  async checkPromotionCode(promoCode: string) {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/promotion-by-code/' + promoCode, this.state.user ? { headers: { Authorization: this.state.token } } : { }).toPromise()
    if (resp && resp.data) return resp.data
  }

  calcDiscountAmount(promo, orderTotal): number {
    if (!promo) return 0
    if (orderTotal < promo.minBasketValue) return 0
    let total = 0
    if (promo.percentageDiscount) {
      let amount = orderTotal
      if (promo.maxBasketValue && amount > promo.maxBasketValue) amount = promo.maxBasketValue
      total += amount * (promo.percentageDiscount / 100)
    }
    if (promo.amountDiscount) total += promo.amountDiscount
    return total
  }

  async getPromoResolve(isSpecialShopLink = false) {
    let promo
    if (this.state.promotion) return this.state.promotion
    if (isSpecialShopLink) this.state.setPromoCode('03nry9n8yenwd9_shop')
    await this.userService.checkLoggedIn()
    if (this.state.promoCode) promo = await this.checkPromotionCode(this.state.promoCode)
    if (!promo) promo = await this.getPromo()
    if (promo) this.state.setPromoCode(promo.promoCode)
    this.state.promotion = promo
    return promo
  }
}
