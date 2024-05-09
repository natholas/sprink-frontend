import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShopsService } from '../../services/shops.service';
import { ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IconSelectionComponent } from '../../components/icon-selection/icon-selection.component';
import { Location } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from 'src/app/components/edit-product-dialog/edit-product-dialog.component';
import { EditProductGroupDialogComponent } from 'src/app/components/edit-product-group-dialog/edit-product-group-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StateService } from 'src/app/services/state.service';
import { ChatService } from 'src/app/services/chat.service';
import { ProductsImportPreviewDialogComponent } from 'src/app/components/products-import-preview-dialog/products-import-preview-dialog.component';
import { parseCsv } from 'src/app/libs/parse-csv';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-shop-product-settings',
  templateUrl: './shop-product-settings.component.html',
  styleUrls: ['./shop-product-settings.component.scss']
})
export class ShopProductSettingsComponent {

  shop: any
  origShop: any
  productGroups = []
  origProductGroups = []
  importPreview: any
  saved = false
  loading = false
  deliveryFee: number
  minOrderValue: number
  defaultGroups = [
    'Dry Cleaning',
    'Wash & Dry',
    'Household',
    'Bedding',
    'Alterations',
    'Services',
    'Offers'
  ]
  @ViewChild('uploadel', { static: false }) uploadel: ElementRef

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopsService,
    private bottomSheet: MatBottomSheet,
    private location: Location,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public state: StateService,
    public chat: ChatService,
    private productsService: ProductsService
  ) {
    this.init()
  }

  init() {
    this.origShop = JSON.parse(JSON.stringify(this.route.snapshot.data.shop))
    this.shop = JSON.parse(JSON.stringify(this.origShop))
    let deliveryFeeItem = this.shop.extraProducts.find(extra => extra.name === 'deliveryFee')
    this.deliveryFee = (deliveryFeeItem.price / 100) || 0
    this.minOrderValue = this.shop.minOrderValue / 100
    this.afterInit()
  }

  async afterInit() {
    this.productGroups = []

    this.shop.products.forEach(product => {
      product.price *= (1 - 0.23076923076923)
      product.price /= 100
      product.price = (Math.round(product.price * 100) / 100)
      product.processingTime /= 60 * 24
    })

    this.shop.products.forEach(product => {
      if (product.groupName) {
        let group = this.productGroups.find(group => group.name === product.groupName)
        if (!group) {
          this.productGroups.push({ name: product.groupName, products: [product], processingTime: product.processingTime, id: product._id })
        }
        else group.products.push(product)
      }
    })

    this.defaultGroups.forEach(defaultGroup => {
      if (!this.productGroups.find(group => group.name === defaultGroup)) {
        this.productGroups.push({ name: defaultGroup, products: [], processingTime: 2 })
      }
    })

    this.origProductGroups = JSON.parse(JSON.stringify(this.productGroups))

    // updating the shops products, incase we have changed stuff in the google sheet
    await this.productsService.loadProducts()
    let productsToBeDeleted = []
    this.shop.products.forEach(prod => {
      let refProd = this.productsService.products.find(p => p.name === prod.name && p.unitType === prod.unitType)
      if (!refProd) return productsToBeDeleted.push(prod)
      prod.description = refProd.description
      prod.icon = refProd.icon
      prod.parent1 = refProd.parent1
      prod.parent2 = refProd.parent2
      prod.unitType = refProd.unitType
    })
    if (productsToBeDeleted.length) console.warn('Should delete', productsToBeDeleted);
  }

  editProduct(product: any) {
    history.pushState('popup', '')
    let ref = this.dialog.open(EditProductDialogComponent, {
      width: '560px',
      data: { product: JSON.parse(JSON.stringify(product)), shop: this.shop }
    })

    ref.afterClosed().toPromise().then(async e => {
      if (history.state === 'popup') history.back()
      if (e === 'delete' || (!e && !product.name)) return this.deleteProduct(product)
      if (!e) return
      Object.assign(product, e)
    })
  }

  editGroup(group: any) {
    history.pushState('popup', '')
    let ref = this.dialog.open(EditProductGroupDialogComponent, {
      width: '560px',
      data: { group: JSON.parse(JSON.stringify(group)), shop: this.shop }
    })

    ref.afterClosed().toPromise().then(async e => {
      if (history.state === 'popup') history.back()
      if (e === 'delete' || (!e && !group.name)) return this.deleteGroup(group)
      if (!e) return
      group.name = e.name
      group.processingTime = e.processingTime
      group.products.forEach(product => product.processingTime = group.processingTime)
      group.products.forEach(product => product.groupName = group.name)
    })
  }

  addProductToGroup(group: any) {
    let product = { name: '', price: undefined, icon: undefined, groupName: group.name }
    this.shop.products.push(product)
    group.products.push(product)
    this.editProduct(product)
  }

  addGroup() {
    let group = { name: '', products: [], processingTime: 2 }
    this.productGroups.push(group)
    this.editGroup(group)
  }

  deleteGroup(group) {
    group.products.forEach(this.deleteProduct.bind(this))
    this.productGroups.splice(this.productGroups.indexOf(group), 1)
  }

  deleteProduct(product: any) {
    this.shop.products.splice(this.shop.products.indexOf(product), 1)
    let group = this.productGroups.find(g => g.name === product.groupName)
    if (group) group.products.splice(group.products.indexOf(product), 1)
  }

  getGroupIds(suffix = '') {
    return this.productGroups.map(g => g.name + suffix)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let item = <any>event.previousContainer.data[event.previousIndex]
      let alreadyExists = event.container.data.find((i: any) => i.name === item.name)

      if (alreadyExists) {
        this.snackBar.open('Product already exists in group', 'close', { duration: 2500 })
      } else {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      }
    }
  }

  getParams() {
    this.productGroups.forEach((group, i) => group.products.forEach((prod, j) => prod.priority = (j + 1) + ((i + 1) * 1000)))
    this.productGroups.forEach(group => group.products.forEach(prod => {
      prod.groupName = group.name
      prod.processingTime = group.processingTime
    }))
    this.shop.products.sort((p1, p2) => p1.priority > p2.priority ? 1 : -1)

    let params = JSON.parse(JSON.stringify(this.shop))
    params.minOrderValue = Math.round(this.minOrderValue * 100)

    if (!params.extraProducts.find(p => p.name === 'deliveryFee')) {
      params.extraProducts.push({ name: 'deliveryFee', price: this.deliveryFee })
    } else {
      params.extraProducts.find(p => p.name === 'deliveryFee').price = this.deliveryFee
    }

    params.products.forEach(product => {
      product.price = Math.round(product.price * 1.3 * 100)
      product.processingTime = Math.round(product.processingTime * 60 * 24)
    })
    params.extraProducts.forEach(product => product.price = Math.round(product.price * 100))

    console.log(this.productGroups);
    console.log(this.shop.products);
    

    return params
  }

  async save() {
    if (this.loading) return
    let params = this.getParams()
    if (params.products.length && params.products.length < 5) return this.snackBar.open('You need at least 5 products', 'close', { duration: 2000 })
    for (let product of params.products) {
      if (params.products.find(p => p !== product && p.name === product.name && p.groupName === product.groupName)) {
        return this.snackBar.open('Duplicate product name found: ' + product.name, 'close', { duration: 2000 })
      }
    }
    let invalidGroups = this.productGroups.filter(group => !group.name || !group.processingTime)
    if (invalidGroups.length > 0) return this.snackBar.open(invalidGroups.length + ' invalid groups found', 'close', { duration: 2000 })

    let filteredProducts = params.products.filter(product => product.name && product.price >= 0 && product.processingTime)
    let diff = params.products.length - filteredProducts.length
    if (diff !== 0) return this.snackBar.open(diff + ' invalid products found', 'close', { duration: 2000 })

    this.loading = true
    await this.shopService.updateShop(this.shop._id, params)
    this.saved = true
    this.location.back()
    this.snackBar.open('Saved', 'close', { duration: 2000 })
  }

  async openIconPicker(product) {
    history.pushState('popup', '')
    let resp = this.bottomSheet.open(IconSelectionComponent, { data: product })
    await resp.afterDismissed().toPromise()
    if (history.state === 'popup') history.back()
  }

  importProductInit() {
    document.getElementById('csv-upload').click()
  }

  private processCsvData(string: any) {
    let rows: any = parseCsv(string)
    let headers = rows.shift()

    if (headers[0].toLowerCase() !== 'product name') return this.snackBar.open('Column A1 should be "product name"', 'close', { duration: 5000 })
    if (headers[1].toLowerCase() !== 'group name') return this.snackBar.open('Column B1 should be "group name"', 'close', { duration: 5000 })
    if (headers[2].toLowerCase() !== 'product description') return this.snackBar.open('Column C1 should be "product description"', 'close', { duration: 5000 })
    if (headers[3].toLowerCase() !== 'product price') return this.snackBar.open('Column D1 should be "product price"', 'close', { duration: 5000 })

    let results = { products: [], rejected: [] }

    rows = rows.filter(row => row.length && row[0])

    rows.forEach(row => {
      if (!row.length) return
      if (row.length < 4) return results.rejected.push({row, reason: 'Incorrect column amount'})
      
      let name = row[0]
      let groupName = row[1]
      let description = row[2]
      let price = parseFloat(row[3]) * 100

      
      if (isNaN(price)) return results.rejected.push({ row, reason: 'Product price is not a valid number' })
      if (!name) return results.rejected.push({ row, reason: 'Product name is required' })
      if (!groupName) return results.rejected.push({ row, reason: 'Group name is required' })

      results.products.push({ name, description, groupName, price, processingTime: 2880, icon: 'fabric'})
    })

    this.importPreview = results
    history.pushState('popup', '')
    let ref = this.dialog.open(ProductsImportPreviewDialogComponent, {
      width: '560px',
      data: { results }
    })

    ref.afterClosed().toPromise().then(async e => {
      if (history.state === 'popup') history.back()
      if (e) {
        this.shop.products = results.products;
        this.afterInit()
        this.snackBar.open('Import successful. Press save to confirm changes.', 'close', { duration: 5000 })
      }
    })
  }

  async processCsv() {
    let file = this.uploadel.nativeElement.files[0]
    if (!file) return
    const reader = new FileReader();
    reader.onload = () => this.processCsvData(<string>reader.result);
    reader.onerror = error => console.error(error);
    reader.readAsText(file);
  }

  exportProducts() {
    let products = this.getParams().products
    let outString = 'product name,group name,product description,product price\n'
    products.forEach(product => {
      outString += product.name + ',' + product.groupName + ',' + product.description + ',' + (product.price / 100) + '\n'
    })
    let link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([outString], {
      type: 'text/csv;encoding:utf-8'
    }))
    link.setAttribute("download", 'my_products.csv');
    document.body.appendChild(link);
    link.click(); 
    document.body.removeChild(link);
  }

  // getShopUrl() {
  //   return this.shop.name.split(' ')[.join('-').toLowerCase()]
  // }

  canDeactivate() {
    if (!this.state.user) return true
    if (this.saved) return true
    let changed = JSON.stringify(this.origProductGroups) !== JSON.stringify(this.productGroups)
    if (this.shop.minOrderValue !== this.minOrderValue * 100) changed = true
    let deliveryFeeItem = this.origShop.extraProducts.find(extra => extra.name === 'deliveryFee')
    let deliveryFee = (deliveryFeeItem.price / 100) || 0
    if (deliveryFee !== this.deliveryFee) changed = true
    if (changed) return confirm('Are you sure you want to leave without saving?')
    return true
  }

}
