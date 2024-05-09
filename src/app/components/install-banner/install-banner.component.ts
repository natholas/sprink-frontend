import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-install-banner',
  templateUrl: './install-banner.component.html',
  styleUrls: ['./install-banner.component.scss']
})
export class InstallBannerComponent {

  @Input('deferredPrompt') deferredPrompt
  showPrompt = false
  dontShow = false
  whiteListedPages = ['/dashboard', 'shop-admin', 'confirmation']

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && !this.dontShow) {
        if (this.whiteListedPages.includes(event.urlAfterRedirects)) {
          this.showPrompt = true
        }
      }
    })
  }

  hide() {
    this.showPrompt = false
    this.dontShow = true
  }

  install() {
    this.hide()
    this.deferredPrompt.prompt()
  }


}
