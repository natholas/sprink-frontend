import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductGroupDialogComponent } from './edit-product-group-dialog.component';

describe('EditProductGroupDialogComponent', () => {
  let component: EditProductGroupDialogComponent;
  let fixture: ComponentFixture<EditProductGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
