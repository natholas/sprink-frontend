import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantChargeExtraDialogComponent } from './cant-charge-extra-dialog.component';

describe('CantChargeExtraDialogComponent', () => {
  let component: CantChargeExtraDialogComponent;
  let fixture: ComponentFixture<CantChargeExtraDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantChargeExtraDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantChargeExtraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
