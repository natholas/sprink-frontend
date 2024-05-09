import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopsService } from '../../services/shops.service';
import { paddTo } from '../../libs/padd-to';
import { StringToDate } from '../../libs/string-to-date';
import { DateToString } from '../../libs/date-to-string';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ShopNeighboursMapDialogComponent } from 'src/app/components/shop-neighbours-map-dialog/shop-neighbours-map-dialog.component';
import { getPickupEndDate } from 'src/app/libs/get-pickup-end-date';
import { Location } from '@angular/common';
import { StateService } from 'src/app/services/state.service';
import { ChatService } from 'src/app/services/chat.service';
import { PostcodesService } from 'src/app/services/postcodes.service';

@Component({
  selector: 'app-shop-times-settings',
  templateUrl: './shop-times-settings.component.html',
  styleUrls: ['./shop-times-settings.component.scss']
})
export class ShopTimesSettingsComponent {

  shop: any
  pickupTimes: any
  specialDays: any
  loading = false
  data: any
  neighbours: any[]
  saved = false
  popCoverage
  popCoverageLoading = true

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public location: Location,
    private state: StateService,
    public chat: ChatService,
    private postCodes: PostcodesService
  ) {
    this.shop = this.route.snapshot.data.shop
    this.data = JSON.parse(JSON.stringify(this.shop))
    this.data.maxDistanceFromShop = Math.round((this.data.maxDistanceFromShop / 1.60934) * 10) / 10
    this.pickupTimes = []
    this.neighbours = this.route.snapshot.data.neighbouringShops

    for (let i in this.shop.pickupTimes) {
      if (i === 'specialDays') {
        this.specialDays = this.shop.pickupTimes[i]
      } else {
        this.pickupTimes.push({day: i, time: this.shop.pickupTimes[i]})
      }
    }

    this.pickupTimes.forEach(this.serverObjToString.bind(this))

    this.specialDays.forEach(data => {
      this.serverObjToString(data)
      data.date = StringToDate(data.date)
    })

    this.init()
  }

  async init() {
    await this.postCodes.getPostCodeData()
    this.popCoverage = this.postCodes.evaluateCoverage(this.shop.location.coordinates, this.data.maxDistanceFromShop * 1.60934)
    this.popCoverage = this.popCoverage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.popCoverageLoading = false
  }

  changeRange() {
    this.popCoverage = this.postCodes.evaluateCoverage(this.shop.location.coordinates, this.data.maxDistanceFromShop * 1.60934)
    this.popCoverage = this.popCoverage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  serverObjToString(data: any) {
    data.doPickup = false
    if (data.time === 0) return data.time = '17:30'
    data.doPickup = true
    data.time = this.serverToString(data.time)
  }

  deleteSpecialDay(day: any) {
    this.specialDays.splice(this.specialDays.indexOf(day), 1)
  }

  addSpecialDay() {
    this.specialDays.push({ doPickup: false })
  }

  async viewOnMap() {
    history.pushState('popup', '')
    let resp = this.dialog.open(ShopNeighboursMapDialogComponent, {
      width: '100%',
      data: { shop: this.data, shops: this.neighbours },
      panelClass: 'custom-modalbox'
    });
    await resp.afterClosed().toPromise()
    if (history.state === 'popup') history.back()
  }

  get numberOfPickupDays() {
    return this.pickupTimes.filter(data => data.doPickup).length
  }

  handleRunDuration() {
    if (!this.data.sprinkRunDuration || this.data.sprinkRunDuration < 30) this.data.sprinkRunDuration = 30
  }

  getParams() {
    let params = {
      pickupTimes: { specialDays: [] },
      minTimeBeforeClose: this.data.minTimeBeforeClose,
      maxDistanceFromShop: this.data.maxDistanceFromShop * 1.60934,
      sprinkRunDuration: this.data.sprinkRunDuration
    }

    this.pickupTimes.forEach(data => params.pickupTimes[data.day] = data.doPickup ? this.stringToServer(data.time) : 0)
    this.specialDays.forEach(data => {
      if (!data.date) return
      let day = JSON.parse(JSON.stringify(data))
      day.time = data.doPickup ? this.stringToServer(data.time) : 0
      day.date = DateToString(new Date(day.date))
      params.pickupTimes.specialDays.push({ date: day.date, time: day.time })
    })
    return params
  }

  async save(form: NgForm) {
    if (!form.valid || this.loading) return
    if (this.numberOfPickupDays < 3) return this.snackBar.open('You need to do pickups at least 3 days per week', 'close', { duration: 2000 })
    
    let params = this.getParams()

    let tooShortTime = false
    for (let i in params.pickupTimes) {
      if (i === 'specialDays') {
        if (params.pickupTimes[i].find(t => t.time > 1410)) tooShortTime = true
      } else {
        if (params.pickupTimes[i] > 1410) tooShortTime = true
      }
    }
    if (tooShortTime) return alert('At least one of your pickup slots is less than 30 minutes long')

    if (!params.minTimeBeforeClose) return alert('Invalid min time before close')
    if (!params.maxDistanceFromShop) return alert('Invalid max driving distance')

    this.loading = true
    let resp = await this.shopService.updateShop(this.shop._id, params)
    if (resp.status) {
      this.saved = true
      this.snackBar.open('Saved', 'close', { duration: 2000 })
      this.router.navigate(['shop-settings', this.shop._id])
    } else {
      this.snackBar.open(resp.error, 'close', { duration: 2000 })
    }
  }

  canDeactivate() {
    if (!this.state.user) return true
    if (this.saved) return true
    let newShop = JSON.parse(JSON.stringify(this.shop))
    Object.assign(newShop, this.getParams())
    let changed = JSON.stringify(newShop) !== JSON.stringify(this.shop);
    if (changed) return confirm('Are you sure you want to leave without saving?')
    return true
  }

  serverToString(min: number) {
    let hours = Math.floor(min / 60)
    let minutes = (min % 60)
    return `${paddTo(hours.toString(), 2)}:${paddTo(minutes.toString(), 2)}`
  }

  stringToServer(time: string): number {
    let hours = parseInt(time.substring(0, 2))
    let minutes = parseInt(time.substring(3, 5))
    return hours * 60 + minutes
  }

  getPickupEndDate(time: string) {
    return getPickupEndDate(time, this.data.sprinkRunDuration)
  }

}
