import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { StateService } from './services/state.service';
import { UserService } from './services/user.service';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatService } from './services/chat.service';
import { CmsService } from './services/cms.service';
import { AnalyticsService } from './services/analytics.service';
import { environment } from 'src/environments/environment';
import { StorageService } from './services/storage.service';
import { PromotionsService } from './services/promotions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showRouter = false
  opened: boolean
  deferredPrompt
  waitingForUpdates: boolean

  constructor(
    private router: Router,
    public state: StateService,
    private user: UserService,
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar,
    private storage: StorageService,
    private promotionsService: PromotionsService, // just here to load it
    private chat: ChatService, // just here to load it
    private analytics: AnalyticsService, // just here to load it
    private cms: CmsService, // just here to load it
  ) {
    // if (environment.production) this.promptPassword()
    if (!environment.production) this.promptPassword()
    this.state.acquisitionSource = sessionStorage.getItem('acquisitionSource')
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.state.nextUrl = event.url
        this.showRouter = false
        this.utmCheck(event.url)
        this.referralCheck(event.url)
        this.promoCheck(event.url)
      }
      if (event instanceof NavigationEnd) {
        this.showRouter = true
        this.utmCheck(event.urlAfterRedirects)
        this.referralCheck(event.urlAfterRedirects)
        this.promoCheck(event.urlAfterRedirects)
      }
      if (event instanceof NavigationCancel) this.showRouter = true
      if (event instanceof NavigationError) this.showRouter = true
    })

    this.user.checkLoggedIn().then(resp => {
      if (resp) this.user.initSession()
    })

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload()
      })
      this.swUpdate.checkForUpdate()
    }

    if (navigator['standalone'] || matchMedia('(display-mode: standalone)').matches) {
      if (location.pathname === '/') this.router.navigate(['dashboard'])
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  }

  async referralCheck(url: string) {
    let referralCode = url.split('?ref=')[1]
    if (referralCode) referralCode = referralCode.split('&')[0].split('#')[0]
    if (referralCode) {
      this.state.referralCode = referralCode
      this.storage.setSession('referralCode', referralCode)
    } else {
      this.state.referralCode = this.storage.getSession('referralCode')
    }
  }

  async promoCheck(url: string) {
    let promoCode = url.split('?promo=')[1]
    if (promoCode) promoCode = promoCode.split('&')[0].split('#')[0]
    if (promoCode) this.state.setPromoCode(promoCode)
  }

  utmCheck(url: string) {
    let source = url.split('?')[1]
    if (source) {
      let utmSource = (source.split('utm_source=')[1] || '').split('&')[0] || ''
      let utmMedium = (source.split('utm_medium=')[1] || '').split('&')[0] || ''
      let utmCampaign = (source.split('utm_campaign=')[1] || '').split('&')[0] || ''
      if (utmSource || utmMedium || utmCampaign) {
        this.state.acquisitionSource = decodeURIComponent(utmSource) + ' | ' + decodeURIComponent(utmMedium) + ' | ' + decodeURIComponent(utmCampaign)
        sessionStorage.setItem('acquisitionSource', this.state.acquisitionSource)
      }

      if (utmMedium === 'shop-website') this.state.shopId = utmSource
    }
  }

  promptPassword() {
    if (location.port) return
    if (sessionStorage.getItem('get-out-of-jail-free')) return
    if (prompt('Password') !== 'sprinky') this.promptPassword()
    else {
      sessionStorage.setItem('get-out-of-jail-free', 'true')
    }
  }

  logout() {
    this.user.logout()
  }
}
