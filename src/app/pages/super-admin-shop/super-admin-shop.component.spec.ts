import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminShopComponent } from './super-admin-shop.component';

describe('SuperAdminShopComponent', () => {
  let component: SuperAdminShopComponent;
  let fixture: ComponentFixture<SuperAdminShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
