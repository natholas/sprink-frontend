import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-selection-dialog',
  templateUrl: './product-selection-dialog.component.html',
  styleUrls: ['./product-selection-dialog.component.scss']
})
export class ProductSelectionDialogComponent {


  @Input('parent2') parent2
  @Input('percentageDiscount') percentageDiscount
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  constructor() { }

  addToCart(product) {
    this.onSelect.emit(product)
  }

}
