import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodSelectionSheetComponent } from './payment-method-selection-sheet.component';

describe('PaymentMethodSelectionSheetComponent', () => {
  let component: PaymentMethodSelectionSheetComponent;
  let fixture: ComponentFixture<PaymentMethodSelectionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentMethodSelectionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodSelectionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
