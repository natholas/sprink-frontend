import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent {

  showCookieBanner = true
  showCookieBannerInitial = true

  constructor(private storage: StorageService) {
    if (this.storage.getLocal('acceptedCookies')) {
      this.showCookieBanner = false
      this.showCookieBannerInitial = false
    }
    else {
      document.addEventListener('touchstart', this.accept.bind(this))
      document.addEventListener('mousedown', this.accept.bind(this))
      document.addEventListener('wheel', this.accept.bind(this))
    }
  }

  accept() {
    this.storage.setLocal('acceptedCookies', 'true')
    this.showCookieBanner = false
  }
}
