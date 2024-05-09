import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstShopOpeningComponent } from './first-shop-opening.component';

describe('FirstShopOpeningComponent', () => {
  let component: FirstShopOpeningComponent;
  let fixture: ComponentFixture<FirstShopOpeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstShopOpeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstShopOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
