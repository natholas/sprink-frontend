import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsImportPreviewDialogComponent } from './products-import-preview-dialog.component';

describe('ProductsImportPreviewDialogComponent', () => {
  let component: ProductsImportPreviewDialogComponent;
  let fixture: ComponentFixture<ProductsImportPreviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsImportPreviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsImportPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
