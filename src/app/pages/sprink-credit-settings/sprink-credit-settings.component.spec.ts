import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprinkCreditSettingsComponent } from './sprink-credit-settings.component';

describe('SprinkCreditSettingsComponent', () => {
  let component: SprinkCreditSettingsComponent;
  let fixture: ComponentFixture<SprinkCreditSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprinkCreditSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprinkCreditSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
