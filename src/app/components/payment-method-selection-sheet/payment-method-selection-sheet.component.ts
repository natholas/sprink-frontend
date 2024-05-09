import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PaymentMethodsService } from '../../services/payment-methods.service';

@Component({
  selector: 'app-payment-method-selection-sheet',
  templateUrl: './payment-method-selection-sheet.component.html',
  styleUrls: ['./payment-method-selection-sheet.component.scss']
})
export class PaymentMethodSelectionSheetComponent implements OnInit {

  paymentMethods: any[]
  selectedPaymentMethod: any

  constructor(private bottomSheetRef: MatBottomSheetRef<PaymentMethodSelectionSheetComponent>, private paymentMethodsService: PaymentMethodsService) {
    this.paymentMethods = this.bottomSheetRef.containerInstance.bottomSheetConfig.data.paymentMethods
    this.selectedPaymentMethod = this.bottomSheetRef.containerInstance.bottomSheetConfig.data.selectedPaymentMethod
  }

  ngOnInit() {
  }

  select(paymentMethod) {
    this.selectedPaymentMethod = paymentMethod
    this.bottomSheetRef.containerInstance.bottomSheetConfig.data.selectedPaymentMethod = paymentMethod
    this.bottomSheetRef.dismiss()
  }

  addPaymentMethod() {
    this.paymentMethodsService.addPaymentMethod('overview')
  }

}
