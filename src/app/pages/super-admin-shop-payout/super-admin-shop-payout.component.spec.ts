import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminShopPayoutComponent } from './super-admin-shop-payout.component';

describe('SuperAdminShopPayoutComponent', () => {
  let component: SuperAdminShopPayoutComponent;
  let fixture: ComponentFixture<SuperAdminShopPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminShopPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminShopPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
