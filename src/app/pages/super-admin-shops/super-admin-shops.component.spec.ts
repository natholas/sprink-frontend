import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminShopsComponent } from './super-admin-shops.component';

describe('SuperAdminShopsComponent', () => {
  let component: SuperAdminShopsComponent;
  let fixture: ComponentFixture<SuperAdminShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
