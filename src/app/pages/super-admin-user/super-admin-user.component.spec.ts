import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminUserComponent } from './super-admin-user.component';

describe('SuperAdminUserComponent', () => {
  let component: SuperAdminUserComponent;
  let fixture: ComponentFixture<SuperAdminUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
