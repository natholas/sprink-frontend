import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutDetailsDialogComponent } from './payout-details-dialog.component';

describe('PayoutDetailsDialogComponent', () => {
  let component: PayoutDetailsDialogComponent;
  let fixture: ComponentFixture<PayoutDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
