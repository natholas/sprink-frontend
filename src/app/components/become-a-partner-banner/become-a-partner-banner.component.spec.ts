import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAPartnerBannerComponent } from './become-a-partner-banner.component';

describe('BecomeAPartnerBannerComponent', () => {
  let component: BecomeAPartnerBannerComponent;
  let fixture: ComponentFixture<BecomeAPartnerBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeAPartnerBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeAPartnerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
