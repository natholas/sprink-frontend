import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminOrdersComponent } from './super-admin-orders.component';

describe('SuperAdminOrdersComponent', () => {
  let component: SuperAdminOrdersComponent;
  let fixture: ComponentFixture<SuperAdminOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
