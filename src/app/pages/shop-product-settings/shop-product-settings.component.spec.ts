import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductSettingsComponent } from './shop-product-settings.component';

describe('ShopProductSettingsComponent', () => {
  let component: ShopProductSettingsComponent;
  let fixture: ComponentFixture<ShopProductSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopProductSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopProductSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
