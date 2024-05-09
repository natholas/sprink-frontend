import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminCampaignsComponent } from './super-admin-campaigns.component';

describe('SuperAdminCampaignsComponent', () => {
  let component: SuperAdminCampaignsComponent;
  let fixture: ComponentFixture<SuperAdminCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
