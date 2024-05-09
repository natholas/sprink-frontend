import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PromotionsService } from './promotions.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: any
  groups: { groupName: string, subGroups: { subGroupName: string, products: { name: string, description: string, icon: string }[] }[] }[]

  constructor(private http: HttpClient, private promotionService: PromotionsService) { }

  async loadProducts() {
    this.products = await this.http.get(environment.apiEndpoint + '/products.json').toPromise()
    this.sortProducts()
    return this.groups
  }

  sortProducts() {
    this.groups = []
    // Adding groups
    this.products.forEach((product) => {
      let group = this.groups.find(group => group.groupName === product.group)
      if (!group) this.groups.push({ groupName: product.group, subGroups: [] })
    })
    // Adding sub groups with products in them
    this.groups.forEach(group => {
      this.products.forEach(product => {
        if (product.group !== group.groupName) return
        let subGroup = group.subGroups.find(subGroup => subGroup.subGroupName === product.subGroup)
        if (!subGroup) group.subGroups.push({ subGroupName: product.subGroup, products: [product] })
        else subGroup.products.push(product)
      })
    })
  }

  getProductListForShop(shop: any) {
    let items = shop.products
    let parent1s = []
    items.forEach((prod, i) => {
      prod.prio = i
      if (!prod.parent1) return
      let parent1 = parent1s.find(p => p.name === prod.parent1 && p.groupName === prod.groupName)
      if (parent1) parent1.products.push(prod)
      else parent1s.push({
        type: 'parent1',
        name: prod.parent1,
        prio: prod.prio,
        icon: prod.icon,
        groupName: prod.groupName,
        parent2s: [],
        products: [prod],
        price: Infinity
      })
    })

    parent1s.forEach(parent1 => {
      parent1.products.forEach(prod => {
        if (!prod.parent2) prod.parent2 = 'Other'
        let parent2 = parent1.parent2s.find(p => p.name === prod.parent2)
        if (parent2) parent2.products.push(prod)
        else parent1.parent2s.push({
          type: 'parent2',
          name: prod.parent2,
          icon: prod.icon,
          groupName: prod.groupName,
          products: [prod],
          price: Infinity
        })
      })
    })

    parent1s.forEach(parent1 => {
      parent1.parent2s.forEach(parent2 => {
        parent2.products.forEach(prod => {
          if (prod.price < parent2.price) parent2.price = prod.price
        })
        if (parent2.price < parent1.price) parent1.price = parent2.price
      })

      parent1.products.forEach(prod => {
        if (prod.price < parent1.price) parent1.price = prod.price
      })
    })

    parent1s = parent1s.filter(p => {
      if (p.products.length > 1) return true
      delete p.products[0].parent1
    })

    items = items.filter(i => !i.parent1)
    items = [...items, ...parent1s]

    items = items.sort((a, b) => a.prio > b.prio ? 1 : -1)

    return items
  }

  calcPrices(cart, deliveryFee, promotion) {
    let total = 0
    cart.forEach(item => total += item.product.price * item.count * (item.amount || 1))

    let subTotal = total

    // calculating discount
    let discountAmount = promotion ? this.promotionService.calcDiscountAmount(promotion, total) : 0
    total -= discountAmount

    // Adding delivery fee
    total += deliveryFee

    return { total, subTotal, discountAmount }
  }
}
