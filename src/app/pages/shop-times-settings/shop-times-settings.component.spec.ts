import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTimesSettingsComponent } from './shop-times-settings.component';

describe('ShopTimesSettingsComponent', () => {
  let component: ShopTimesSettingsComponent;
  let fixture: ComponentFixture<ShopTimesSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopTimesSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopTimesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
