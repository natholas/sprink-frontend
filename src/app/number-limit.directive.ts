import { Directive, Output, EventEmitter, Input, OnChanges, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appNumberLimit]'
})
export class NumberLimitDirective {

  @Input('minVal') minVal
  @Input('maxVal') maxVal
  @Input('blockDecimals') blockDecimals: boolean = false
  
  @HostListener('input') onInput() {
    setTimeout(() => {
      if (this.model.value === null) return
      if (this.minVal !== undefined && this.model.value < this.minVal) this.model.update.emit(this.minVal);
      else if (this.maxVal !== undefined && this.model.value > this.maxVal) this.model.update.emit(this.maxVal);
      if (this.blockDecimals && this.model.value % 1 !== 0) this.model.update.emit(Math.round(this.model.value))
    })
  }

  constructor(public model: NgModel) { }


}
