import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminShopPayoutsComponent } from './super-admin-shop-payouts.component';

describe('SuperAdminShopPayoutsComponent', () => {
  let component: SuperAdminShopPayoutsComponent;
  let fixture: ComponentFixture<SuperAdminShopPayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminShopPayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminShopPayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
