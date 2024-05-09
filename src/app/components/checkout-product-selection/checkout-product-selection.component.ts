import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import { ProductAmountSelectionDialogComponent } from '../product-amount-selection-dialog/product-amount-selection-dialog.component';
import { ProductParentSelectionDialogComponent } from '../product-parent-selection-dialog/product-parent-selection-dialog.component';

@Component({
  selector: 'app-checkout-product-selection',
  templateUrl: './checkout-product-selection.component.html',
  styleUrls: ['./checkout-product-selection.component.scss']
})
export class CheckoutProductSelectionComponent implements OnInit, AfterViewInit, OnDestroy {

  productGroups = []
  @Input('shop') shop
  @Input('cart') cart
  @Input('promotion') promotion
  percentageDiscount
  disableAnimation = true
  parent1Dialog: MatDialogRef<any>
  @Output() onAddToCart: EventEmitter<any> = new EventEmitter()

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    let items = this.productsService.getProductListForShop(this.shop)

    items.forEach(item => {
      if (item.groupName) {
        let group = this.productGroups.find(group => group.name === item.groupName)
        if (!group) this.productGroups.push({ name: item.groupName, products: [item] })
        else group.products.push(item)
      }
    })

    this.percentageDiscount = this.promotion && this.promotion.percentageDiscount
  }

  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => this.disableAnimation = false);
  }

  async addToCart(product) {
    if (product.type === 'parent1') {
      history.pushState('popup', '')
      let resp = this.parent1Dialog = this.dialog.open(ProductParentSelectionDialogComponent, {
        width: '560px',
        data: { product, percentageDiscount: this.percentageDiscount, addToCart: this.addToCart.bind(this) }
      })
      await resp.afterClosed().toPromise()
      if (history.state === 'popup') history.back()
    } else {
      let amount
      if (product.unitType) {
        history.pushState('popup', '')
        let dialog = this.dialog.open(ProductAmountSelectionDialogComponent, {
          width: '560px',
          data: { product, percentageDiscount: this.percentageDiscount }
        })
        amount = await dialog.afterClosed().toPromise()
        if (history.state === 'popup') history.back()
        if (!amount) return
      }
      if (!amount) amount = 1
      let item = this.cart.find(p => p.product._id === product._id && p.amount === amount)
      if (item) item.count += 1
      else this.cart.push({ product, count: 1, amount })
      this.onAddToCart.emit({ product, count: 1, amount })
    }
  }

  ngOnDestroy() {
    this.parent1Dialog && this.parent1Dialog.close()
  }


}
