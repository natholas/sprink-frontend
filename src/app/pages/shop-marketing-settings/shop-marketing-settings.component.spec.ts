import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMarketingSettingsComponent } from './shop-marketing-settings.component';

describe('ShopMarketingSettingsComponent', () => {
  let component: ShopMarketingSettingsComponent;
  let fixture: ComponentFixture<ShopMarketingSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopMarketingSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopMarketingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
