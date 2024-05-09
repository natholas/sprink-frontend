import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { loadScript } from 'src/app/libs/load-script';

declare let google: any

@Component({
  selector: 'app-shops-map',
  templateUrl: './shops-map.component.html',
  styleUrls: ['./shops-map.component.scss']
})
export class ShopsMapComponent implements OnInit, OnChanges {

  @Input() shops: any[]
  @Input() center: number[] = [-3.6830735, 54.759138]
  @Input() zoomLevel = 5.7
  @Input() singleShopMode = false
  shopCircles = []
  map: any
  infoWindow: any
  infoWindowContent = `<div><b>{shopName}</b><br>{shopAddress}<br><a class="link" href="{shopLink}">VIEW</a></div>`

  constructor() { }
  
  async ngOnInit() {
    await loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDwv4EaLmvWxhpn6aC27neOkdRyOerRCnI&libraries=geometry')
    this.initMap()
    if (this.singleShopMode) this.calcShapes()
    this.shops.forEach(shop => this.addShop(shop))
  }

  ngOnChanges() {
    if (!window['google']) return
    this.shopCircles.forEach(data => {
      if (data.inner) data.inner.setMap(null)
      data.outer.setMap(null)
      data.shopCircle.setMap(null)
    })
    this.shopCircles = []

    this.shops.forEach(shop => {
      // add shop
      this.addShop(shop)
    })
  }

  initMap() {
    this.infoWindow = new google.maps.InfoWindow({ content: this.infoWindowContent, maxWidth: 500 })

    // Create the map.
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: this.zoomLevel,
      center: { lat: this.center[1], lng: this.center[0] },
      mapTypeId: 'terrain',
      disableDefaultUI: true,
      gestureHandling: 'greedy'
    })
  }

  addShop(shop) {
    let shopCircleData: any = { shop }
    if (!this.singleShopMode) {
      shopCircleData.outer = new google.maps.Circle({
        strokeColor: '#a756cc', strokeOpacity: 1, strokeWeight: 1,
        fillColor: '#a756cc', fillOpacity: 0.4, map: this.map,
        center: { lat: shop.location.coordinates[1], lng: shop.location.coordinates[0] },
        radius: shop.maxDistanceFromShop * 1000
      })
  
      if (shop.exclusivityDistance) {
        shopCircleData.inner = new google.maps.Circle({
          strokeColor: '#000000', strokeOpacity: 1, strokeWeight: 1,
          fillColor: '#fdd651', fillOpacity: 0.4, map: this.map,
          center: { lat: shop.location.coordinates[1], lng: shop.location.coordinates[0] },
          radius: shop.exclusivityDistance * 1000
        })
      }
    }

    shopCircleData.shopCircle = new google.maps.Circle({
      strokeColor: '#000000', strokeOpacity: 1, strokeWeight: 2,
      fillColor: '#000000', fillOpacity: 1, map: this.map,
      center: { lat: shop.location.coordinates[1], lng: shop.location.coordinates[0] },
      radius: 50
    })

    google.maps.event.addListener(shopCircleData.shopCircle, 'click', (ev: any) => {
      let string = this.infoWindowContent
      string = string.split('{shopName}').join(shop.name)
      string = string.split('{shopAddress}').join(shop.address.formatted)
      string = string.split('{shopLink}').join('/super-admin-shop/' + shop._id)
      this.infoWindow.setContent(string)
      this.infoWindow.setPosition(ev.latLng)
      this.infoWindow.open(this.map)
    })

    this.shopCircles.push(shopCircleData)
  }

  calcShapes() {
    this.shops.forEach(shop => shop.coords = new google.maps.LatLng(shop.location.coordinates[1], shop.location.coordinates[0]))
    let shop = this.shops[this.shops.length - 1]
    let coords = shop.location.coordinates
    let latStep = 0.00264
    let lngStep = 0.0036
    let count = 200
    let latOffset = -(count * latStep) / 2
    let lngOffset = -(count * lngStep) / 2

    for (let i = 0; i < count; i++) {

      for (let j = 0; j < count; j++) {
        let squareCoords = [
          { lat: coords[1] + latOffset, lng: coords[0] + lngOffset }, // top left
          { lat: coords[1] + latOffset, lng: coords[0] + lngOffset + lngStep }, // top right
          { lat: coords[1] + latOffset + latStep, lng: coords[0] + lngOffset + lngStep }, // bottom right
          { lat: coords[1] + latOffset + latStep, lng: coords[0] + lngOffset } // bottom left
        ]

        // Construct the polygon, including both paths.
        let centerCoords = new google.maps.LatLng(squareCoords[0].lat + latStep / 2, squareCoords[0].lng + lngStep / 2)
        let shopDists = []
        this.shops.forEach(s => shopDists.push({ dist: google.maps.geometry.spherical.computeDistanceBetween(centerCoords, s.coords), shop: s}))
        shopDists = shopDists.filter(s => s.shop.maxDistanceFromShop * (1000 * 1.60934) > s.dist)
        shopDists.sort((a, b) => a.dist > b.dist ? 1 : -1)
        let closest = shopDists[0]

        latOffset += latStep

        if (!closest || closest.shop !== shop) continue
        let color = '#a756cc'

        let block = new google.maps.Polygon({
          paths: [squareCoords],
          strokeColor: color,
          strokeOpacity: 0,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.5
        })
        block.setMap(this.map);
      }

      latOffset -= latStep * count

      lngOffset += lngStep
    }
  }
}
