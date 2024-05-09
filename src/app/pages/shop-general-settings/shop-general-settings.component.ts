import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ShopsService } from '../../services/shops.service';
import * as moment from 'moment-timezone';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatService } from 'src/app/services/chat.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-shop-general-settings',
  templateUrl: './shop-general-settings.component.html',
  styleUrls: ['./shop-general-settings.component.scss']
})
export class ShopGeneralSettingsComponent {

  shop: any
  origShop: any
  loading = false
  place
  timezones: string[]
  // validCompanyNumber = false

  constructor(private route: ActivatedRoute, private shopService: ShopsService, public state: StateService, private location: Location, private snackBar: MatSnackBar, public chat: ChatService) {
    this.origShop = this.route.snapshot.data.shop
    this.shop = JSON.parse(JSON.stringify(this.origShop))
    this.timezones = moment.tz.names()
    if (this.shop.address && this.shop.address.formatted) this.place = { formatted_address: this.shop.address.formatted }
    // if (this.shop.companyHouseNumber) this.validCompanyNumber = true
  }

  async lookupCompany() {
    // this.validCompanyNumber = false
    if (this.shop.companyHouseNumber.length !== 8) return
    let resp = await this.shopService.getShopCompanyHouse(this.shop.companyHouseNumber)
    if (!resp || !resp.company || !resp.company.registered_office_address) return this.snackBar.open('Company not found', 'close', { duration: 2000 })
    this.shop.name = resp.company.company_name
    // this.validCompanyNumber = true
  }

  onSelect(place) {
    this.place = place
  }

  async submitForm(form: NgForm) {
    if (!form.valid || this.loading) return

    // if (!this.validCompanyNumber) return this.snackBar.open('Invalid CRN', 'close', {duration: 2000})
    let params = JSON.parse(JSON.stringify(this.shop))

    if (!this.place) return this.snackBar.open('Please find your shop address first')

    params.address = {
      formatted: this.place.formatted_address
    }
    if (this.place.lng) params.location = {
      type: 'Point',
      coordinates: [this.place.lng, this.place.lat]
    }
    this.loading = true
    let resp = await this.shopService.updateShop(this.shop._id, params)
    
    if (resp && resp.status) {
      this.origShop = JSON.parse(JSON.stringify(this.shop))
      this.location.back()
    } else {
      if (resp.error === 'CRN_ALREADY_EXISTS') resp.error = 'A Sprink shop with that company house number already exists'
      this.snackBar.open(resp.error, 'close', { duration: 4000 })
    }
  }

  canDeactivate() {
    if (!this.state.user) return true
    if (JSON.stringify(this.origShop) !== JSON.stringify(this.shop)) return confirm('Are you sure you want to leave without saving?')
    return true
  }

  openChat() {
    this.chat.maximize()
  }

}
