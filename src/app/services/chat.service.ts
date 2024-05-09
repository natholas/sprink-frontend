import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { loadScript } from '../libs/load-script';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  urls = ['/become-a-partner', '/become-a-partner/invited', 'payouts-explained']

  constructor(private router: Router, private state: StateService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.urls.includes(event.urlAfterRedirects)) this.showChat()
        else if (window['Tawk_API'] && !window['Tawk_API'].isChatOngoing()) this.hideChat()
      }
    })
  }

  async init() {
    window['Tawk_API'] = window['Tawk_API'] || {}
    if (this.state.user) window['Tawk_API'].visitor = { name: this.state.user.firstName + ' ' + this.state.user.lastName }
    window['Tawk_LoadStart'] = new Date();
    await loadScript('https://embed.tawk.to/5ecc20618ee2956d73a47768/default')
  }

  async showChat() {
    if (!window['Tawk_API']) await this.init()
    else window['Tawk_API'].showWidget()
  }

  hideChat() {
    window['Tawk_API'] && window['Tawk_API'].hideWidget()
  }

  async maximize() {
    if (!window['Tawk_API']) await this.init()
    else window['Tawk_API'].showWidget()
    setTimeout(() => window['Tawk_API'].maximize(), 500)
    setTimeout(() => window['Tawk_API'].maximize(), 1500)
  }
}
