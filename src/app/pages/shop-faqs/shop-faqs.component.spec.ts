import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFaqsComponent } from './shop-faqs.component';

describe('ShopFaqsComponent', () => {
  let component: ShopFaqsComponent;
  let fixture: ComponentFixture<ShopFaqsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopFaqsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
