import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminDoShopPayoutComponent } from './super-admin-do-shop-payout.component';

describe('SuperAdminShopPayoutComponent', () => {
  let component: SuperAdminDoShopPayoutComponent;
  let fixture: ComponentFixture<SuperAdminDoShopPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminDoShopPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminDoShopPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
