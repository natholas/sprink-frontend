import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectionDialogComponent } from './product-selection-dialog.component';

describe('ProductSelectionDialogComponent', () => {
  let component: ProductSelectionDialogComponent;
  let fixture: ComponentFixture<ProductSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
