import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPayoutSettingsComponent } from './shop-payout-settings.component';

describe('ShopPayoutSettingsComponent', () => {
  let component: ShopPayoutSettingsComponent;
  let fixture: ComponentFixture<ShopPayoutSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPayoutSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPayoutSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
