import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminPromotionsComponent } from './super-admin-promotions.component';

describe('SuperAdminPromotionsComponent', () => {
  let component: SuperAdminPromotionsComponent;
  let fixture: ComponentFixture<SuperAdminPromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminPromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
