import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductParentSelectionDialogComponent } from './product-parent-selection-dialog.component';

describe('ProductParentSelectionDialogComponent', () => {
  let component: ProductParentSelectionDialogComponent;
  let fixture: ComponentFixture<ProductParentSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductParentSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductParentSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
