import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorCodeEntryComponent } from './two-factor-code-entry.component';

describe('TwoFactorCodeEntryComponent', () => {
  let component: TwoFactorCodeEntryComponent;
  let fixture: ComponentFixture<TwoFactorCodeEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFactorCodeEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorCodeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
