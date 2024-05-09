import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { dateToUtcString } from '../libs/date-to-utc-string';

@Injectable({
  providedIn: 'root'
})
export class PickupTimesService {

  constructor() { }

  canPickupOnDate(d: moment.Moment, shop, isDelivery = false) {
    let cD = moment().tz(shop.timeZone)
    let date = d.clone()
    date.set('hours', cD.get('hours'))
    date.set('minutes', cD.get('minutes'))
    date = date.tz(shop.timeZone)
    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    let dateString = dateToUtcString(date)
    let specialDay = shop.pickupTimes.specialDays.find(_date => _date.date === dateString)
    let time = specialDay ? specialDay.time : shop.pickupTimes[days[date.day()]]

    // if the shop is not open on the requested pickup day
    if (!time) return false

    // Checking if its not too late
    if (date.diff(cD, 'minutes') < shop.minTimeBeforeClose + 30) return false

    date = date.startOf('day')
    date = date.add(time, 'minutes')

    // if the date is more than 5 days in the future
    if (date.diff(cD.startOf('day'), 'days') > (isDelivery ? 36 : 9)) return false

    // if the requested pickup day is in the past
    if (date.diff(cD.startOf('day'), 'days') < 0) return false

    return date
  }

  nextPickupTime(shop, date = moment(), isDelivery = false) {
    for (let i = 0; i < 60; i++) {
      let _date = date.clone().add(i, 'days')
      if (this.canPickupOnDate(_date, shop, isDelivery)) return _date
    }

    if (isDelivery) alert('No delivery time available')
    else alert('No pickup time available')
  }

  nextDeliveryTime(cart, shop, pickupTime) {
    let sortedByProcessingTime = cart.slice().sort((a, b) => a.product.processingTime < b.product.processingTime ? 1 : -1)
    let maxProcessingTime = sortedByProcessingTime.length ? Math.ceil(sortedByProcessingTime[0].product.processingTime / 60 / 24) : 0
    let date = pickupTime.clone().add(maxProcessingTime, 'days')
    return this.nextPickupTime(shop, date, true)
  }

  canDeliverOnDate(date: moment.Moment, pickupTime, cart, shop) {
    let diff = date.clone().startOf('day').diff(pickupTime.clone().startOf('day'), 'days')
    let sortedByProcessingTime = cart.slice().sort((a, b) => a.product.processingTime < b.product.processingTime ? 1 : -1)
    let maxProcessingTime = sortedByProcessingTime.length ? Math.ceil(sortedByProcessingTime[0].product.processingTime / 60 / 24) : 0

    if (diff < maxProcessingTime) return false
    return this.canPickupOnDate(date, shop, true)
  }
}
