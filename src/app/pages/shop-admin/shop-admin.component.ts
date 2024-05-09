import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { distance } from '../../libs/distance';
import * as moment from 'moment-timezone';
import { StateService } from 'src/app/services/state.service';
import { getPickupEndDate } from 'src/app/libs/get-pickup-end-date';
import { paddTo } from 'src/app/libs/padd-to';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-shop-admin',
  templateUrl: './shop-admin.component.html',
  styleUrls: ['./shop-admin.component.scss']
})
export class ShopAdminComponent {

  shop: any
  orders: any
  todayOrders: any
  futureOrders: any
  collectionOrders: any
  mapLink: string
  apiEndpoint: string
  today: moment.Moment
  currentLocation: number[]

  constructor(private route: ActivatedRoute, public state: StateService, public chat: ChatService) {
    this.shop = this.route.snapshot.data.shop[0]
    this.orders = this.route.snapshot.data.shop[1]
    this.today = moment().tz(this.shop.timeZone)

    navigator.geolocation.getCurrentPosition(position => {
      this.currentLocation = [position.coords.latitude, position.coords.longitude]
      this.orders.forEach(order => {
        order.distance = distance(this.currentLocation[0], this.currentLocation[1], order.address.coordinates[0], order.address.coordinates[1])
      })
      this.todayOrders.sort((a, b) => a.distance > b.distance ? 1 : -1)
      this.futureOrders.sort((a, b) => a.distance > b.distance ? 1 : -1)
    })

    this.orders.forEach(order => {
      if (order.status === 'pickedup') order.dueDate = moment(order.deliveryTime)
      else if (order.status === 'ready') order.dueDate = moment(order.pickupTime)
      if (order.dueDate && order.dueDate.clone().startOf('day').diff(this.today.clone().startOf('day'), 'days') < 0) order.overDue = true
    })

    this.todayOrders = this.orders.filter(order => order.dueDate && order.dueDate.format('YYYYMMDD') <= this.today.format('YYYYMMDD'))
    this.futureOrders = this.orders.filter(order => order.dueDate && order.dueDate.format('YYYYMMDD') > this.today.format('YYYYMMDD'))
    this.collectionOrders = this.orders.filter(order => order.status === 'atshop')
    this.apiEndpoint = environment.apiEndpoint
  }

  getRunEndTime(time: string) {
    let date = moment(time)
    date.tz(moment.tz.guess())
    return getPickupEndDate(paddTo(date.get('hours').toString(), 2) + '-' + paddTo(date.get('minutes').toString(), 2), this.shop.sprinkRunDuration)
  }

}
