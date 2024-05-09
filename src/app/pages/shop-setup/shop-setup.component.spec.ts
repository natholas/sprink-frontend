import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSetupComponent } from './shop-setup.component';

describe('ShopSetupComponent', () => {
  let component: ShopSetupComponent;
  let fixture: ComponentFixture<ShopSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
