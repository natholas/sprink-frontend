import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { randomString } from 'src/app/libs/random-string';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-super-admin-promotions',
  templateUrl: './super-admin-promotions.component.html',
  styleUrls: ['./super-admin-promotions.component.scss']
})
export class SuperAdminPromotionsComponent {

  promotions: any[]
  newPromo: any = {
    promoCode: randomString(10)
  }
  availabilities = ['always', 'with-code']
  discountTypes = ['percent', 'amount', 'sprink-credit']
  percentageDiscountOptions = [10, 15, 20, 23.076923076923, 25, 30]
  addMinOrderValue = false
  addMaxOrderValue = false
  loading = false
  showEnded = false

  constructor(private route: ActivatedRoute, private ordersService: OrdersService, private snackBar: MatSnackBar) {
    this.promotions = this.route.snapshot.data.promotions.filter(p => p.status !== 'ended')
  }

  toggleEnded() {
    if (this.showEnded) {
      this.promotions = this.route.snapshot.data.promotions
    } else {
      this.promotions = this.route.snapshot.data.promotions.filter(p => p.status !== 'ended')
    }
  }

  async save(form: NgForm) {
    if (!form.valid) return
    if (this.loading) return

    if (!this.newPromo._id && this.newPromo.availability === 'with-code' && this.route.snapshot.data.promotions.find(p => p.promoCode === this.newPromo.promoCode)) {
      return this.snackBar.open('Code not unique', 'close', { duration: 2500 })
    }

    if (this.newPromo.availability === 'always') delete this.newPromo.code
    if (this.newPromo.discountType !== 'percent') delete this.newPromo.percentageDiscount
    if (this.newPromo.discountType !== 'amount') delete this.newPromo.amountDiscount
    if (this.newPromo.discountType !== 'sprink-credit') delete this.newPromo.sprinkCreditOnUse

    if (this.newPromo._id) this.saveChanges()
    else this.postPromotion()
  }

  async editPromotion(promotion) {
    this.newPromo = JSON.parse(JSON.stringify(promotion))
    if (this.newPromo.amountDiscount) {
      this.newPromo.amountDiscount /= 100
      this.newPromo.discountType = 'amount'
    }
    if (this.newPromo.sprinkCreditOnUse) {
      this.newPromo.sprinkCreditOnUse /= 100
      this.newPromo.discountType = 'sprink-credit'
    }
    if (this.newPromo.percentageDiscount) {
      this.newPromo.discountType = 'percent'
    }
    if (this.newPromo.minBasketValue) {
      this.newPromo.minBasketValue /= 100
      this.addMinOrderValue = true
    }
    if (this.newPromo.maxBasketValue) {
      this.newPromo.maxBasketValue /= 100
      this.addMaxOrderValue = true
    }
    document.getElementById('form').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  async saveChanges() {
    this.loading = true
    let params = JSON.parse(JSON.stringify(this.newPromo))
    if (params.amountDiscount) params.amountDiscount *= 100
    if (params.sprinkCreditOnUse) params.sprinkCreditOnUse *= 100
    if (params.minBasketValue) params.minBasketValue *= 100
    if (params.maxBasketValue) params.maxBasketValue *= 100
    let resp = await this.ordersService.superAdminPutPromotion(this.newPromo._id, params)
    if (resp) window.location.reload()
  }

  async postPromotion() {
    this.loading = true
    let params = JSON.parse(JSON.stringify(this.newPromo))
    if (params.amountDiscount) params.amountDiscount *= 100
    if (params.sprinkCreditOnUse) params.sprinkCreditOnUse *= 100
    if (params.minBasketValue) params.minBasketValue *= 100
    if (params.maxBasketValue) params.maxBasketValue *= 100
    let resp = await this.ordersService.superAdminPostPromotion(params)
    if (resp) window.location.reload()
  }

  async publish(promotion) {
    if (!confirm('Are you sure you want to publish this promotion?')) return
    this.loading = true
    let resp = await this.ordersService.superAdminPutPromotion(promotion._id, { status: 'live', publishedDate: Date.now() })
    if (resp) window.location.reload()
  }

  async deletePromo(promotion) {
    if (promotion.promoCode === '03nry9n8yenwd9_shop') return this.snackBar.open('YOU FUCKING DONKEY. DONT DELETE THIS PROMO.', 'close', { duration: 2000 })
    if (promotion.status == 'draft') {
      if (!confirm('Are you sure you want to DELETE this promotion?')) return
      this.loading = true
      let resp = await this.ordersService.superAdminDeletePromotion(promotion._id)
      if (resp) window.location.reload()
    } else if (promotion.status === 'live') {
      if (!confirm('Are you sure you want to UNPUBLISH this promotion?')) return
      this.loading = true
      let resp = await this.ordersService.superAdminPutPromotion(promotion._id, { status: 'ended', endedDate: Date.now() })
      if (resp) window.location.reload()
    }
  }

  async changePromoTitle(promotion) {
    let newTitle = prompt('New title', promotion.title)
    if (!confirm('Are you sure you want to change this promotions title from "' + promotion.title + '" to "' + newTitle + '"?')) return
    let resp = await this.ordersService.superAdminPutPromotion(promotion._id, { title: newTitle })
    if (resp) window.location.reload()
  }

}
