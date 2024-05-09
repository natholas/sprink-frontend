import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPayoutsComponent } from './shop-payouts.component';

describe('ShopPayoutsComponent', () => {
  let component: ShopPayoutsComponent;
  let fixture: ComponentFixture<ShopPayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
