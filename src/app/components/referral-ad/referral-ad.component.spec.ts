import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralAdComponent } from './referral-ad.component';

describe('ReferralAdComponent', () => {
  let component: ReferralAdComponent;
  let fixture: ComponentFixture<ReferralAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
