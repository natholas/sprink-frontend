import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fileToBase64 } from '../../libs/file-to-b64';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { environment } from 'src/environments/environment';
import { paddTo } from '../../libs/padd-to';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { getPickupEndDate } from 'src/app/libs/get-pickup-end-date';

@Component({
  selector: 'app-deliver-order',
  templateUrl: './deliver-order.component.html',
  styleUrls: ['./deliver-order.component.scss']
})
export class DeliverOrderComponent {

  imageB64
  order
  apiEndpoint = environment.apiEndpoint
  mapLink
  loading = false

  @ViewChild('imageel', { static: false }) imageEl: ElementRef

  constructor(private route: ActivatedRoute, private orders: OrdersService, private router: Router, private snackBar: MatSnackBar) {
    this.order = this.route.snapshot.data.order
    let address = this.order.address.formatted
    this.mapLink = 'https://www.google.ch/maps/dir//' + encodeURIComponent(address)
  }

  async processImage() {
    let b64 = <string>await fileToBase64(this.imageEl.nativeElement.files[0])
    let img = new Image()
    img.onload = () => {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      canvas.width = 400
      canvas.height = 400 / (img.naturalWidth / img.naturalHeight)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      this.imageB64 = canvas.toDataURL('image/jpeg', 0.5)
    }
    img.src = b64
  }

  async confirmDelivery() {
    this.loading = true
    await this.orders.updateOrderStatus(this.order._id, 'delivered', this.imageB64)
    this.order = await this.orders.getOrder(this.order._id)
    this.router.navigate(['shop-order', this.order._id])
    this.snackBar.open('Delivery confirmed', 'close', { duration: 5000 })
  }

  async customerIsNotHome() {
    if (!confirm('Are you sure?')) return
    this.loading = true
    await this.orders.updateOrderStatus(this.order._id, 'atshop')
    this.order = await this.orders.getOrder(this.order._id)
    this.router.navigate(['shop-order', this.order._id])
    this.snackBar.open('Confirmed', 'close', { duration: 5000 })
  }

  getRunEndTime(time: string) {
    let date = moment(time)
    date.tz(moment.tz.guess())
    return getPickupEndDate(paddTo(date.get('hours').toString(), 2) + '-' + paddTo(date.get('minutes').toString(), 2), this.order.sprinkRunDuration)
  }

}
