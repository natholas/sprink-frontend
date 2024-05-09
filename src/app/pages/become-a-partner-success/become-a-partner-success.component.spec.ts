import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAPartnerSuccessComponent } from './become-a-partner-success.component';

describe('BecomeAPartnerSuccessComponent', () => {
  let component: BecomeAPartnerSuccessComponent;
  let fixture: ComponentFixture<BecomeAPartnerSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeAPartnerSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeAPartnerSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
