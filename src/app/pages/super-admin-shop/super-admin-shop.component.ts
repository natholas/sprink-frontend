import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopsService } from 'src/app/services/shops.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { fileToBase64 } from 'src/app/libs/file-to-b64';
import { resizeB64Image } from 'src/app/libs/resize-b64-image';
import { HttpClient } from '@angular/common/http';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-super-admin-shop',
  templateUrl: './super-admin-shop.component.html',
  styleUrls: ['./super-admin-shop.component.scss']
})
export class SuperAdminShopComponent {

  shop: any
  users: any
  orders: any
  endpoint: any
  verifications: any
  payouts: any
  density: string
  densities = ['low', 'medium', 'high']
  rejectionReason: string
  uploads: any = {}
  type: string
  @ViewChild('imageel', { static: false }) imageEl: ElementRef
  submitting = false

  constructor(private route: ActivatedRoute, private shops: ShopsService, private snackbar: MatSnackBar, private http: HttpClient, private snackBar: MatSnackBar, private state: StateService) {
    this.endpoint = environment.apiEndpoint
    this.shop = this.route.snapshot.data.data.shop
    this.users = this.route.snapshot.data.data.users
    this.orders = this.route.snapshot.data.data.orders
    this.verifications = this.route.snapshot.data.data.verifications
    this.payouts = this.route.snapshot.data.data.payouts
  }

  async approveShop() {
    if (!this.density) return this.snackbar.open('Select density', 'close', { duration: 2000 })
    if (!confirm('Are you sure you want to approve this shop?')) return
    await this.shops.superAdminApproveShop(this.shop._id, this.density)
    this.snackbar.open('Shop approved', 'close', { duration: 2000 })
    location.reload()
  }
  
  async rejectShop() {
    if (!this.rejectionReason) return this.snackbar.open('Enter rejection reason', 'close', {duration: 2000})
    if (!confirm('Are you sure you want to reject this shop?')) return
    await this.shops.superAdminRejectShop(this.shop._id, this.rejectionReason)
    this.snackbar.open('Shop rejected', 'close', { duration: 2000 })
    location.reload()
  }



  triggerInput(type: string) {
    this.type = type
    document.getElementById('image-upload').click()
  }

  async processImage() {
    let file = this.imageEl.nativeElement.files[0]
    if (!file) return
    let extension = file.name.split('.').pop().toLowerCase()
    let b64 = <string>await fileToBase64(file)
    if (extension !== 'pdf') {
      b64 = <string>await resizeB64Image(b64, 1024)
      extension = 'jpg'
    }
    this.uploads[this.type] = { b64, extension }
  }

  async submit() {
    if (!this.uploads['picture-id']) return
    if (!this.uploads['proof-of-ownership']) return
    if (this.submitting) return
    this.submitting = true
    let resp = <any>await this.http.post(environment.apiEndpoint + '/shop/verify/' + this.shop._id, this.uploads, { headers: { Authorization: this.state.token } }).toPromise()
    this.submitting = false
    if (resp && !resp.error) {
      this.snackBar.open('Documents submitted', 'close', { duration: 5000 })
      window.location.reload()
    }
  }

  saveShopHidden() {
    this.shops.updateShop(this.shop._id, { hidden: this.shop.hidden })
  }

}
