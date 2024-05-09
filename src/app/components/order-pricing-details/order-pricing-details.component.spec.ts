import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPricingDetailsComponent } from './order-pricing-details.component';

describe('OrderPricingDetailsComponent', () => {
  let component: OrderPricingDetailsComponent;
  let fixture: ComponentFixture<OrderPricingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPricingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPricingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
