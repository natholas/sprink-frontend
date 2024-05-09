import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutProductSelectionComponent } from './checkout-product-selection.component';

describe('CheckoutProductSelectionComponent', () => {
  let component: CheckoutProductSelectionComponent;
  let fixture: ComponentFixture<CheckoutProductSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutProductSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutProductSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
