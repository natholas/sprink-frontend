import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopUsersSettingsComponent } from './shop-users-settings.component';

describe('ShopUsersSettingsComponent', () => {
  let component: ShopUsersSettingsComponent;
  let fixture: ComponentFixture<ShopUsersSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopUsersSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopUsersSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
