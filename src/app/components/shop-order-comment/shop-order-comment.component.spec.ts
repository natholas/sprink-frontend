import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOrderCommentComponent } from './shop-order-comment.component';

describe('ShopOrderCommentComponent', () => {
  let component: ShopOrderCommentComponent;
  let fixture: ComponentFixture<ShopOrderCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopOrderCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopOrderCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
