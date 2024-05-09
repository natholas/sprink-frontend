import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminUsersComponent } from './super-admin-users.component';

describe('SuperAdminUsersComponent', () => {
  let component: SuperAdminUsersComponent;
  let fixture: ComponentFixture<SuperAdminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
