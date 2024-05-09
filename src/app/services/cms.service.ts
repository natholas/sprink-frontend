import { Injectable, NgZone } from '@angular/core';
import * as Prismic from 'prismic-javascript';
import { NavigationEnd, Router } from '@angular/router';
import ResolvedApi from 'prismic-javascript/types/ResolvedApi';
import { Document } from 'prismic-javascript/types/documents';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  api: ResolvedApi
  routes: Document[]
  currentRoute = ''
  metaData: { title: string, description: string, image: string }

  constructor(private router: Router, private zone: NgZone) {
    // this.init()

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (this.currentRoute === event.url) return
        if (event.url) {
          this.currentRoute = event.url
          this.getMeta()
        }
      }
    })
  }

  async init() {
    this.api = await Prismic.default.getApi('https://sprink.prismic.io/api/v2')
    await this.loadMetaTags()
    this.getMeta()
  }

  async loadMetaTags() {
    this.routes = (await this.api.query(Prismic.default.Predicates.any('document.type', ['page_meta']), { pageSize: 100})).results
  }

  async getMeta() {
    // if (!this.routes) return
    // let route = this.currentRoute.substring(1).split('?')[0].split('/').shift() || 'home'
    // let data = this.routes.find(r => r.uid === route)?.data || {}
    
    let path = this.currentRoute.substring(1).split('?')[0].split('/').filter(s => s.length < 24).join(' | ') || 'home'

    // this.metaData = {
    //   title: data.title || 'Sprink | ' + path,
    //   description: data.description || 'The contactless laundry app',
    //   image: (data.image && data.image.url) || 'https://sprinkclean.com/assets/sprink-banner.jpg'
    // }
    this.metaData = {
      title: 'Sprink | ' + path,
      description: 'The contactless laundry app',
      image: 'https://sprinkclean.com/assets/sprink-banner.jpg'
    }
    this.setMeta()
  }

  setMeta() {
    document.querySelector('title').innerHTML = this.metaData.title
    document.querySelector('meta[property="og:title"').setAttribute('content', this.metaData.title)
    document.querySelector('meta[property="og:description"').setAttribute('content', this.metaData.description)
    document.querySelector('meta[name="description"').setAttribute('content', this.metaData.description)
    // document.querySelector('meta[property="og:image"').setAttribute('content', imgUrl)
  }
}
