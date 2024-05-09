import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAmountSelectionDialogComponent } from './product-amount-selection-dialog.component';

describe('ProductAmountSelectionDialogComponent', () => {
  let component: ProductAmountSelectionDialogComponent;
  let fixture: ComponentFixture<ProductAmountSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAmountSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAmountSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
