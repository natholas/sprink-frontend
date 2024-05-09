import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { fileToBase64 } from '../../libs/file-to-b64';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateService } from '../../services/state.service';
import { resizeB64Image } from '../../libs/resize-b64-image';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-verification-documents',
  templateUrl: './shop-verification-documents.component.html',
  styleUrls: ['./shop-verification-documents.component.scss']
})
export class ShopVerificationDocumentsComponent {

  shop: any
  @ViewChild('imageel', { static: false }) imageEl: ElementRef
  type: string
  uploads: any = {}
  submitting = false
  verificationRequests: any[]
  latestVerificationRequest: any
  iUnderstand1 = false
  iUnderstand2 = false

  constructor(private route: ActivatedRoute, public chat: ChatService, private http: HttpClient, private state: StateService, private router: Router, private snackBar: MatSnackBar) {
    this.shop = this.route.snapshot.data.shop
    this.verificationRequests = this.route.snapshot.data.verificationRequests
    this.latestVerificationRequest = this.verificationRequests.slice().pop()
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
    let resp = <any>await this.http.post(environment.apiEndpoint + '/shop/verify/' + this.shop._id, this.uploads , { headers: { Authorization: this.state.token } }).toPromise()
    this.submitting = false
    if (resp && !resp.error) {
      this.snackBar.open('Documents submitted', 'close', { duration: 5000 })
      this.router.navigate(['shop-setup'])
    }
  }

}
